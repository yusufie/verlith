import React from 'react'
/* import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options"; */
import Layout from '@/components/Layout/Layout'
import Banner from '@/components/Banner/Banner'


async function ProfilesPage() {

  // const session = await getServerSession(authOptions);

  return (
    <Layout>
        <Banner />
        ProfilesPage
    </Layout>
  )
}

export default ProfilesPage