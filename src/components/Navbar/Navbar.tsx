import Navleft from "@/components/Navbar/Navleft/Navleft";
import Navright from "@/components/Navbar/Navright/Navright";
import styles from './navbar.module.scss'

const Navbar = () => {

  return (
    <section className={styles.navbar}>

        <Navleft />

        <Navright />
        
    </section>
  )
}

export default Navbar