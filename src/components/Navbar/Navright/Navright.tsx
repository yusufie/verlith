"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from './navright.module.scss'

const Navright = () => {
    const { data: session } = useSession();

    return (
        <nav className={styles.navRight}>

            <Link href="/">
                <button>
                    <Image src="/icons/home.svg" alt="home" width={24} height={24} />
                    <span>Home</span>
                </button>
            </Link>

            {session ? (
                <>
                <Link href="/following">
                    <button>
                        <Image src="/icons/following.svg" alt="following" width={24} height={24} />
                        <span>Following</span>
                    </button>
                </Link>

                <Link href="/profile">
                    <button>
                        <Image src="/icons/user.svg" alt="user" width={24} height={24} />
                        <span>Profile</span>
                    </button>
                </Link>
                </> 
            ) : (   
                <button onClick={() => signIn()}>
                    <Image src="/icons/sign-in.svg" alt="user" width={24} height={24} />
                    <span>Sign in</span>
                </button> )
            }

            <button className={styles.connect}>
                <Image src="/icons/connect.svg" alt="connect" width={24} height={24} />
                <span>Connect</span>
            </button>

        </nav>
    )
}

export default Navright