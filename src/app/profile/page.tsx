import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import Layout from '@/components/Layout/Layout';
import Profile from '@/components/Profile/Profile';
import Banner from '@/components/Banner/Banner';

async function Profil() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = session?.user;
  const _id = (session?.user as any)?.id;
  // console.log(_id);

  return (
    <Layout>
      <Banner />
      <Profile _id={_id} user={user}/>
    </Layout>
  );
}

export default Profil;