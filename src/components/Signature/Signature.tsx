import Image from 'next/image'
import Link from 'next/link';
import BadgeIcon from '@/components/Icons/Badgeicon'
import styles from './signature.module.scss'

interface SignatureProps {
    userTier: string | undefined;
    userName: string | undefined;
    user: any;
}

const Signature = ({userTier, userName, user}: SignatureProps) => {

  // give classname based on user tier
  const getClassName = (userTier: string | undefined) => {
    switch(userTier) {
        case 'enterprise':
            return styles.enterprise
        case 'gold':
            return styles.gold
        case 'silver':
            return styles.silver
        case 'bronze':
            return styles.bronze
        default:
            return ""
    }
  }

  const className = getClassName(userTier)

  return (
    <section className={styles.signature}>

        <Link href={`/profile/${user._id} `}>
            <span className={className}>{userTier} / {userName}</span>
        </Link>

        <BadgeIcon userTier={userTier}/>

        <button>
            <Image src={'/icons/user-tick.svg'} width={24} height={24} alt="user" />
        </button>

        <button>
            <Image src={'/icons/blabla.svg'} width={24} height={24} alt="blabla" />
        </button>

    </section>
  )
}

export default Signature