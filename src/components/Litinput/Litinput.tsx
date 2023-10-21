import React from "react";
import styles from "./litinput.module.scss";

export type LitValues = {
  content: string;
};

interface LitinputProps {
  onSubmit?: (data: LitValues) => void;
  isSubmitting?: boolean;
  register?: any;
  handleSubmit?: any;
  errors?: any;
  reset?: any;
  headline?: { _id: string; title: string };
  user_id?: any;
}

const Litinput: React.FC<LitinputProps> = ({ onSubmit, isSubmitting, register, handleSubmit, errors, reset, headline, user_id }) => {

  return (
    <section className={styles.litInput}>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.litForm}>
        <textarea
          {...register('content')}
          id="content"
          name="content"
          placeholder="| What are your thoughts on this? Lit your reply"
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = '| What are your thoughts on this? Lit your reply'}
        />
        {errors.content && <p>{errors.content.message}</p>}

        <button type="submit" value="submit" disabled={isSubmitting}
          className={`${styles.litButton} ${isSubmitting ? styles.loading : ''}`}>

          {isSubmitting ? (
              <>
              <span className={styles.spinner} /> {/* spinner */}
              <span></span> {/* while submitting */}
              </>
          ) : (
              <span>LIT</span>
          )}
        </button>

      </form>
      
    </section>
  );
};

export default Litinput;
