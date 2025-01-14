import { getEvents } from '@/backend';
import { getToken } from 'next-auth/jwt';


export async function GET(req, res) {
    let userToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
    const data = await getEvents(parseInt(userToken.id));
    return new Response(JSON.stringify(data));
}
