import Image from 'next/image'
import styles from './banner.module.scss'

const Banner = () => {
  return (
    <section className={styles.sticky}>
      <div className={styles.banner}>
          <Image src={'/images/banner.png'} alt="Banner" width={832} height={184} className={styles.bannerImage}/>

          <div className={styles.adsInput}>
            <Image src={'/icons/target.svg'} alt="target" width={24} height={24} />
            <span>This space is available to apply your banner or interactive-ads for your brand</span>
          </div>
      </div>
    </section>
  )
}

export default Banner