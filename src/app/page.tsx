import { getServerSession } from "next-auth";
import authOptions from "../app/api/auth/[...nextauth]/options";
import Layout from '@/components/Layout/Layout';
import Homex from '@/components/Home/Home';
import Banner from '@/components/Banner/Banner';

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;

  return (
    <Layout>
      <Banner />
      <Homex user_id={user_id}/>
    </Layout>
  );
}
