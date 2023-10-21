"use client";
import React from 'react'
import { signOut } from "next-auth/react";
import styles from './profile.module.scss'
import UserForm from '@/components/Forms/UserForm';

type idsProps = {
  _id:any;
  user:any;
};

const Profile: React.FC<idsProps> = ({_id, user}) => {
  return (
    <section className={styles.profile}>

        <button onClick={() => signOut()} className={styles.signout}>Sign Out</button>

        {user.role === 'admin' ? ( <UserForm _id={_id} user={user}/> ) : ( '' )}

    </section>
  )
}

export default Profile