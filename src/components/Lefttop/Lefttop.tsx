"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { useSession, signIn } from "next-auth/react";
import LoginModal from '@/components/Modals/Login/LoginModal';
import Searchbox from '@/components/Searchbox/Searchbox'
import HeadlineModal from '@/components/Modals/Headline/HeadlineModal'
import styles from './lefttop.module.scss'

interface sortingProps {
  user_id: any;
  onToggleSorting: () => void;
  onToggleSortingByDate: () => void;
  handleSortEnterprise?: () => void;
  isEnterpriseSorting?: boolean;
  sortByReplies?: boolean;
  sortByDate?: boolean;
}

const Lefttop: React.FC<sortingProps> = ({
  user_id,
  onToggleSorting, 
  onToggleSortingByDate,
  handleSortEnterprise,
  isEnterpriseSorting,
  sortByReplies,
  sortByDate,
}) => {

  const { data: session } = useSession();

  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (session) {
    setOpenModal(true);
    } else {
      setLoginModalVisible(true);
    }
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  }

  return (
    <section className={styles.lefttop}>

      <div className={styles.lefttopButtons}>

        <button><span>TODAY</span></button>

        <div className={styles.lefttopIcons}>
          <button onClick={handleSortEnterprise}>
            {/* Conditionally render the stack icon */}
            {isEnterpriseSorting ? (
                <Image src="/icons/stack-pink.svg" alt="stack" width={20} height={20} />
              ) : (            
                <Image src="/icons/stack-gray.svg" alt="stack" width={20} height={20} />
            )}
          </button>

          <button onClick={onToggleSortingByDate}>
            {/* Conditionally render the new icon */}
            {sortByDate ? (
                <Image src="/icons/new-pink.svg" alt="new" width={32} height={32} />
              ) : (            
                <Image src="/icons/new-gray.svg" alt="new" width={32} height={32} />
            )}
          </button>

          <button onClick={onToggleSorting}>
            {/* Conditionally render the trend icon */}
            {sortByReplies ? (
              <Image src="/icons/trend-pink.svg" alt="arrow" width={18} height={18} />
            ) : (
              <Image src="/icons/trend-gray.svg" alt="arrow" width={18} height={18} />
            )}
          </button>

          <button onClick={handleOpenModal}>
            {/* Conditionally render the write icon */}
            {openModal ? (
              <Image src="/icons/write-pink.svg" alt="write" width={24} height={24} />
            ) : (
              <Image src="/icons/write-gray.svg" alt="write" width={24} height={24} />
            )}
          </button>
        </div>

      </div>
        
      {/* Conditionally render the HeadlineModal */}
      {openModal && (
        <HeadlineModal onClose={() => setOpenModal(false)} user_id={user_id}/>
      )}
      
      {/* Conditionally render the LoginModal */}
      {isLoginModalVisible && (
        <LoginModal signIn={() => signIn()} closeLoginModal={closeLoginModal} />
      )}
        
      <Searchbox />
    </section>
  )
}

export default Lefttop