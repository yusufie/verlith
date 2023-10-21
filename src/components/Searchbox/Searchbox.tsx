import Image from 'next/image'
import styles from './searchbox.module.scss'

const Searchbox = () => {
  return (
    <section className={styles.searchbox}>

          <input type="text" />
          <button className={styles.searchButton}>
            <Image src="/icons/search.svg" alt="user" width={24} height={24} />
            <span>Search</span>
          </button>

    </section>
  )
}

export default Searchbox