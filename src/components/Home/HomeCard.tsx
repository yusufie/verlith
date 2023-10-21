"use client";
import React, { useState } from 'react';
import { mutate } from 'swr';
import Link from "next/link";
import Feedback from "@/components/Feedback/Feedback";
import Signature from "@/components/Signature/Signature";
import Expandable from "@/components/Expandable/Expandable";
import Litinput, { LitValues } from "@/components/Litinput/Litinput";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { litDataSchema } from "@/utils/formSchema";
import CommonModal from "@/components/Modals/Common/CommonModal";
import styles from "./home.module.scss";

interface HomeCardProps {
  headline: { _id: string; title: string; };
  firstEntry: { _id: string; content: string; likes?: any[] } | null;
  user: { tier: string; username: string; _id: string;} | null;
  entryCount: number;
  enterpriseEntryCount: number;
  user_id?: any;
  isFirstHeadline: boolean;
  allEntries?: any[];
}

const HomeCard: React.FC<HomeCardProps> = ({ headline, entryCount, enterpriseEntryCount, firstEntry, user, user_id, isFirstHeadline, allEntries, }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [liked, setLiked] = useState(false);

  const entryId = firstEntry?._id as string;

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }), // Assuming userId is the user's ObjectId
      });
  
      if (response.ok) {
        console.log('Entry successfully liked/unliked!');
        setLiked(!liked); // Toggle the liked state on successful like
      } else {
        console.log('Error liking/unliking the entry!');
      }
      mutate(`/api/entries/${entryId}`);
    } catch (error) {
      console.log('Error liking/unliking the entry:', error);
    }
  };

  // Check if the user has already liked the entry
  const checkLikedStatus = () => {
    if (allEntries) {
      const entry = allEntries.find((entry) => entry._id === entryId);
      if (entry && entry.likes) {
        return entry.likes.some((like:any) => like.user_id === user_id);
      }
    }
    return false;
  };
    
  const userHasLikedEntry = checkLikedStatus();
  // console.log(userHasLikedEntry); 

  // likes count for the first entry of the headline
  const likesCount = firstEntry?.likes?.length || 0;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LitValues>({
    resolver: zodResolver(litDataSchema),
  });

  // send data to the "/api/entries" endpoint
  const onSubmit = async (data: LitValues) => {
    try {
      setIsSubmitting(true);

      const entryData = {
        content: data.content,
        type: "entry",
        headline_id: headline._id,
        posted_by_user_id: user_id,
      };
      // console.log(entryData);

      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        reset();
        setModalMessage('Entry successfully submitted!');
        setIsModalOpen(true);
        // console.log('Entry successfully submitted!');
      } else {
        setModalMessage('Error submitting the entry!');
        setIsModalOpen(true);
        // console.log('Error submitting the entry!');
      }
      mutate('/api/entries');
    } catch (error) {      
      setIsModalOpen(true);
      setModalMessage('An unexpected error occurred');
      // console.log('Error submitting the entry:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
      // console.log('Entry submission attempt complete.');
    }
  };

  return (
    <>
      <div className={`${styles.homeCard} ${user?.tier === "enterprise" ? styles.enterpriseCard : ""}`}>

        <Link href={`/headline/${headline._id}`} >
          <h2>{headline.title}</h2>
        </Link>

        {firstEntry && firstEntry?.content.length > 370 ? (
          <Expandable content={firstEntry?.content} descriptionLength={370} />
        ) : (
          <p className={styles.fullText}>{firstEntry?.content}</p>
        )}

        <Feedback 
          entryCount={entryCount} 
          likesCount={likesCount} 
          enterpriseEntryCount={enterpriseEntryCount}
          entryId={firstEntry?._id}
          firstEntry={firstEntry}
          user_id={user_id}
          allEntries={allEntries}
          liked={liked}
          handleLikeClick={handleLikeClick}
          userHasLikedEntry={userHasLikedEntry}
        />

        <Signature 
          userTier={user?.tier} 
          userName={user?.username} 
          user={user}
        />
      </div>

      {isFirstHeadline && (
        <Litinput 
          headline={headline} 
          user_id={user_id} 
          register={register} 
          handleSubmit={handleSubmit} 
          errors={errors} 
          reset={reset} 
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {isModalOpen && (
        <CommonModal 
          message={modalMessage} 
          onClose={() => setIsModalOpen(false)} />
      )}
      <hr />
    </>
  );
};

export default HomeCard;
