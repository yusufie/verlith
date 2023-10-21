import { getServerSession } from "next-auth";
import authOptions from "../../../app/api/auth/[...nextauth]/options";
import React from 'react'
import Layout from "@/components/Layout/Layout";
import Headline from "@/components/Headline/Headline";
import Banner from '@/components/Banner/Banner';

async function Dynamic() {

  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;

  return (
    <Layout>
    <Banner />
    <Headline user_id={user_id}/>
  </Layout>
  )
}

export default Dynamic