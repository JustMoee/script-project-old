import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
//post
type Profile = {
  name: string;
  email: string;
  phone_number: string;
};
const endpoints: { post: Function, get: Function } = {
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as Profile;
    if(body) {
        const { data, error } = await supabase
        .from("Profile")
        .insert<Profile>([
            { name: body['name'], email: body['email'], phone_number: body["phone_number"],},
      ])
      .select();
      if (data) return res.status(200).json(data);
      return res.status(400).json(error);
    }
    return res.status(404).send('not found')
  },
  get: () => {
  }
};

export default endpoints;
