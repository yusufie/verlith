"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDataSchema } from "@/utils/formSchema";
import styles from "./headlinemodal.module.scss";
import { mutate } from 'swr';

type FormValues = {
  title: string;
  content: string;
}

interface HeadlineModalProps {
  onClose: () => void;
  user_id: any;
}

const HeadlineModal: React.FC<HeadlineModalProps> = ({ onClose, user_id }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formDataSchema),
  });

  // send data to the "/api/headlines" route
  const onSubmit = async (data: FormValues) => {

    try {
      setIsSubmitting(true);

      const headlineData = {
        user_id,
        title: data.title,
        content: data.content,
      };
      // console.log(headlineData);
      const response = await fetch('/api/headlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(headlineData),
      });

      if (response.ok) {
        console.log('Headline created successfully!');
        mutate('/api/headlines');
        mutate('/api/entries');
        mutate('/api/users');
      } else {
        console.error('Failed to create headline.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };


  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalContent}>

        <label htmlFor="title">TITLE</label>
        <input {...register("title")} type="text" id="title" placeholder="Enter Your Title" />
        {errors.title && (
          <p className={styles.error}>{errors.title.message}</p>
        )}

        <label htmlFor="content">CONTENT</label>
        <textarea {...register("content")} id="content" placeholder="Here goes your amazing content."></textarea>
        {errors.content && (
          <p className={styles.error}>{errors.content.message}</p>
        )}

        <div className={styles.modalButtons}>

          <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.buyButton} ${isSubmitting ? styles.loading : ''}`}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> {/* spinner */}
                  <span>Creating...</span> {/* while submitting */}
                </>
              ) : (
                <span>Create Headline</span>
              )}
          </button>
          <button onClick={onClose}>Close</button>
          
        </div>

      </form>
    </div>
  );
};

export default HeadlineModal;
