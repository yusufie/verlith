"use client";
import Link from 'next/link';
import styles from './navleft.module.scss'
import dynamic from "next/dynamic"; // for client-side rendering

const DynamicThemeSwitcher = dynamic(
    () => import("@/components/ThemeSwitcher/ThemeSwitcher"),
    { ssr: false } // to skip server-side rendering for this component
);

const Navleft = () => {
  return (
    <nav className={styles.navLeft}>

        <Link href="/">
          <div className={styles.logo}>
            <h1>VERLITH</h1>
          </div>
        </Link>

        <DynamicThemeSwitcher /> {/* Render the ThemeSwitcher dynamically */}

    </nav>
  )
}

export default Navleft