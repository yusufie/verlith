"use client";
import { useTheme } from 'next-themes'
import Image from 'next/image'

import styles from './themeswitcher.module.scss'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.themeswitcher}>

      {theme === 'light' ? 
        ( <button onClick={() => setTheme('dark')} >
            <Image src="/icons/moon.svg" alt="moon" width="24" height="24" />
          </button>
        ) : 
        
        (
          <button onClick={() => setTheme('light')} >
            <Image src="/icons/sun.svg" alt="sun" width="24" height="24" />
          </button>
        )
      }

    </div>
  )
}
