import connectMongo from '../../utils/connectMongo';
import Invoice from '../../models/model';
import { NextApiRequest, NextApiResponse } from 'next';
// import { useUser } from '@auth0/nextjs-auth0/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo();
  // const { user, error, isLoading } = useUser();
  // if(user) console.log('userid is : ', user.sid);
  const { method } = req;

  // TODO: check if DELETE really needed
  switch (method) {
    case 'GET':
      console.log('GET request')
      try {
        const invoice = await Invoice.find({ userId: "google-oauth2|112866594045029268160"});
        console.log('hello / API GET request data:', invoice);
        return res.status(200).json(invoice);
      } catch (e) {
        res.status(400).json({ success: false });
        
      }
      break;
    case 'POST':
      try {
        const invoice = await Invoice.create(req.body);
        console.log('hello / API POST request data:', invoice);
        res.status(201).json(invoice);
      } catch (e) {
        console.log(e);
        return res.status(400).json(req.body);
      }
      break;
    // case 'DELETE':
    //   try {
    //     const invoice = await Invoice.findByIdAndDelete(req.query.id);
    //     console.log('hello / API DELETE request data:', invoice);
    //     return res.status(201).json(invoice);
    //   } catch (e) {
    //     console.log(e);
    //     return res.status(400).json(req.query);
    //   }
  }
}
