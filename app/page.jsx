import { getEvents } from "@/backend";
import ClientApp from "@/components/ClientApp";
import { decode } from 'next-auth/jwt';
import Nav from "@/components/Nav";
import { cookies } from "next/dist/client/components/headers";
export default async function Home() {
  const cookieStore = cookies();
  const sesionToken = cookieStore.get('next-auth.session-token');
  let events = [];
  if (sesionToken) {
    const decoded = await decode({
      token: sesionToken.value,
      secret: process.env.NEXTAUTH_SECRET,
    });
    events = await getEvents(decoded.id);
  }

  return (
    <>
      <div className="s w-full h-[50px]">
        <Nav />
      </div>
      <ClientApp events={events} />
    </>
  )
}