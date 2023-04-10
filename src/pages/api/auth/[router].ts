import { HttpStatusCode } from "@/shared/http-status-code.enum";
import { User } from "@/types/user.type";
import { supabase } from "lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {router} = req.query
    console.log(router)
    if (req["method"] === "POST") return post(req, res, router as 'login' | 'signup' | 'reset');
    else if (req["method"] === "GET") return get(req, res, router as 'login' | 'signup' | 'reset');
    // else if (req["method"] === "DELETE") return remove(req, res);
    // else if (req["method"] === "PUT" || req["method"] === "PATCH")
    //   return put(req, res);
    return res.status(HttpStatusCode.NotFound);
  }

export async function getUserData() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

async function get(req: NextApiRequest, res: NextApiResponse, router: 'login' | 'signup' | 'reset') {
  const {data}  = await supabase.auth.getUser()  
  return res.status(201).json(data)
}

async function post(req: NextApiRequest, res: NextApiResponse, router: 'login' | 'signup' | 'reset') {
    const {body} = req
    if(router == 'signup') {
      const data =  await signup({email: body.email, password: body.password})
      return res.status(201).json(data.data)
    }
    else if(router == 'login') {
      const data = await login({email: body.email, password: body.password})
      return res.status(201).json(data)
    }
    else if(router == 'reset') {
      
      const data = await resetPassword(body['email'], )
      return res.status(201).json(data.data)
    }
    
}
//
async function signup({email,password}: {email: string, password: string}) {
  const { data, error } = await supabase.auth.signUp({email,password})   
  if(data) {
    const user = data.user;
      const newUser = await supabase.from('profiles').insert([{
        id: user?.id,
        email: email,
        point: 0
      }]).select()
    return newUser
  }
  return {data, error}
}
//
async function login({email, password}: {email: string, password: string}) {

const {data, error} =  await supabase.auth.signInWithPassword({email, password})
if(data && data.user) {
  supabase.auth.setSession({access_token: data.session?.access_token!, refresh_token: data.session?.refresh_token! })
  const userReq = await supabase.from('profiles').select('*').eq('id', data.user?.id)
  return userReq.data
}
return {data, error}
}
//
async function resetPassword(email: string) {
  return  await supabase.auth.resetPasswordForEmail(email)
}