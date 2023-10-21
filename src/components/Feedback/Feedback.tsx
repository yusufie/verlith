import Image from "next/image";
import styles from "./feedback.module.scss";

interface FeedbackProps {
  entry?: | { _id: string; posted_by_user_id: string | undefined; content: string; type: string; reply_to?: string | undefined; likes?: any[] | undefined; } | null | undefined;
  entryId?: string | any;
  firstEntry?: { _id: string; content: string; likes?: any[] } | null;
  user_id?: any;
  allEntries?: any[] | undefined; // all entries to check user likes
  entryCount: number;
  likesCount?: number | any;
  enterpriseEntryCount?: number;
  liked: boolean;
  handleLikeClick: (entryId: string, userId: string) => void;
  userHasLikedEntry: boolean;
  showReplyCard?: boolean;
  setShowReplyCard?: boolean | any;
}

const Feedback: React.FC<FeedbackProps> = ({
  entry,
  entryId,
  firstEntry,
  user_id,
  entryCount,
  likesCount,
  enterpriseEntryCount,
  allEntries,
  liked,
  handleLikeClick,
  userHasLikedEntry,
  showReplyCard,
  setShowReplyCard,
}) => {

  const toggleReplyCard = () => {
    setShowReplyCard(!showReplyCard); // Toggle the visibility state
  };

  const repliesCount = allEntries?.filter(e => e.reply_to === entryId && e.type === 'reply').length;

  return (
    <section className={styles.feedback}>

      {firstEntry && (
          <>
          <button>
            <Image src={"/icons/stack.svg"} width={24} height={24} alt="stack" />
            <span>{enterpriseEntryCount}</span>
          </button>

          <button>
            <Image src={"/icons/message.svg"} width={24} height={24} alt="message" />
            <span>{entryCount}</span>
          </button>
          </>
        )
      }

      {entry && entry.type === "entry" && (
        <button onClick={toggleReplyCard}>
          <Image src={"/icons/reply.svg"} width={18} height={18} alt="reply" />
          <span>{repliesCount}</span>
        </button>
      )}

      {/* if user has liked entry background of the button should be red */}
      <button onClick={() => handleLikeClick(entryId, user_id)}>
        {userHasLikedEntry || liked ? (
          <Image src={"/icons/heart-filled.svg"} width={24} height={24} alt="heart" />
        ) : (
          <Image src={"/icons/heart.svg"} width={24} height={24} alt="heart" />
        )}
        <span> {liked ? likesCount +1 : likesCount} </span>
      </button>

      <button>
        <Image src={"/icons/repost.svg"} width={24} height={24} alt="repost" />
        <span>0</span>
      </button>

      <button>
        <Image src={"/icons/share.svg"} width={24} height={24} alt="share" />
        <span>0</span>
      </button>
    </section>
  );
};

export default Feedback;