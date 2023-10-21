import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";
import authOptions from "../../app/api/auth/[...nextauth]/options";
import styles from "./layout.module.scss";
import Leftbar from "@/components/Leftbar/Leftbar";

const Layout = async ({ children }: any) => {

  const session = await getServerSession(authOptions);
  
  const user_id = (session?.user as any)?.id;

  return (
    <section className={styles.layout}>

        <Navbar />

        <main className={styles.layoutMain}>

          <aside>
            <Leftbar user_id={user_id}/> 
          </aside>

          <section className={styles.children}>
            {children}
          </section>

        </main>

    </section>
  )
}

export default Layout