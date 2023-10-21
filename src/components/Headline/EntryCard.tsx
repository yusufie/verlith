"use client";
import React, { useState } from "react";
import Expandable from "@/components/Expandable/Expandable";
import Feedback from "@/components/Feedback/Feedback";
import Signature from "@/components/Signature/Signature";
import styles from "./title.module.scss";
import ReplyCard from "@/components/Headline/ReplyCard";

interface EntryCardProps {
  entry?:
    | {
        _id: string;
        posted_by_user_id: string | undefined;
        content: string;
        type: string;
        reply_to?: string | undefined;
        likes?: any[] | undefined;
      }
    | null
    | undefined;
  firstEntry?: { _id: string; content: string; likes?: any[] } | null;
  users: any;
  enterpriseEntryCount: number;
  user_id?: any;
  allEntries: {
    [x: string]: any;
    _id: string;
    content: string;
    reply_to: string;
    posted_by_user_id: string | undefined;
  }[]; // Array containing all entries
  headline: { _id: string; title: string };
}

const EntryCard: React.FC<EntryCardProps> = ({
  entry,
  users,
  user_id,
  enterpriseEntryCount,
  // firstEntry,
  allEntries,
  headline,
}) => {

  const [showReplyCard, setShowReplyCard] = useState(false); // for visibility 
  const [liked, setLiked] = useState(false);

  const entryId = entry?._id as string;

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`/api/entries/${entryId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json", },
        body: JSON.stringify({ user_id }), // Assuming userId is the user's ObjectId
      });

      if (response.ok) {
        console.log("Entry successfully liked/unliked!");
        setLiked(!liked); // Toggle the liked state on successful like
      } else {
        console.log("Error liking/unliking the entry!");
      }
    } catch (error) {
      console.log("Error liking/unliking the entry:", error);
    }
  };

  // Check if the user has already liked the entry
  const checkLikedStatus = () => {
    if (allEntries) {
      const entry = allEntries.find((entry) => entry._id === entryId);
      if (entry && entry.likes) {
        return entry.likes.some((like: any) => like.user_id === user_id);
      }
    }
    return false;
  };

  const userHasLikedEntry = checkLikedStatus();
  // console.log(userHasLikedEntry);

  if (entry?.type === "first") { return null; }
  if (entry?.type === "reply") {return null; }

  // Calculate the number of replies for this entry
  const entryCount = allEntries.filter((e) => e.reply_to === entry?._id).length;

  // likes count for this entry
  const likesCount = entry?.likes?.length || 0;

  const user = users[entry?.posted_by_user_id || ""] || null;

  return (
    <>
    <div className={`${styles.entriesCard} ${user?.tier === "enterprise" ? styles.enterpriseCard : "" }`}>
      {entry && entry?.content.length > 370 ? (
        <Expandable content={entry?.content} descriptionLength={370} />
      ) : (
        <p className={styles.fullText}>{entry?.content}</p>
      )}

      <Feedback
        entryCount={entryCount}
        likesCount={likesCount}
        enterpriseEntryCount={enterpriseEntryCount}
        // firstEntry={firstEntry}
        entry={entry}
        entryId={entry?._id}
        user_id={user_id}
        allEntries={allEntries}
        liked={liked}
        handleLikeClick={handleLikeClick}
        userHasLikedEntry={userHasLikedEntry}
        setShowReplyCard={setShowReplyCard}
        showReplyCard={showReplyCard}
      />
      <Signature userTier={user?.tier} userName={user?.username} user={user} />

      {/* Display Reply Cards if the entry has a reply entry */}
      {showReplyCard && 
        <ReplyCard 
          allEntries={allEntries} 
          entryId={entryId}
          user_id={user_id}
          headline={headline}
        />}

    </div>
    <hr/>
    </>
  );
};

export default EntryCard;
