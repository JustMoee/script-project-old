import type { NextApiRequest, NextApiResponse } from 'next'
import * as post from './post/index';
type Data = {
    name: string
  }
  const arr: any = [];
  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if(req.method == 'POST') {
       return post.default.post(req, res)
    }
    else res.status(200).json({ name: 'John Doe' })

  }
  

