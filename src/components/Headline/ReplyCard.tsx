"use client";
import React, { useState } from "react";
import { mutate } from 'swr';
import Litinput, { LitValues } from "@/components/Litinput/Litinput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { litDataSchema } from "@/utils/formSchema";
import CommonModal from "@/components/Modals/Common/CommonModal";

interface ReplyCardProps {
  headline: { _id: string; title: string };
  user_id?: any;
  allEntries: {
    _id: string;
    content: string;
    reply_to: string;
  }[];
  entryId: string;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ allEntries, entryId, headline, user_id  }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LitValues>({
    resolver: zodResolver(litDataSchema),
  });

  // send data to the "/api/entries" endpoint
  const onSubmit = async (data: LitValues) => {
    try {
      setIsSubmitting(true);

      const entryData = {
        content: data.content,
        type: "reply",
        headline_id: headline._id,
        posted_by_user_id: user_id,
        reply_to: entryId,
      };
      // console.log(entryData);

      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(entryData),
      });
      console.log('entryData:', entryData)

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
      // console.log("Entry submission attempt complete.");
    }
  };

  const filteredReplies = allEntries.filter((e) => e.reply_to === entryId);

  return (
    <>
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

      {isModalOpen && (
        <CommonModal 
          message={modalMessage} 
          onClose={() => setIsModalOpen(false)} />
      )}

      {filteredReplies.map((reply) => (
        <section key={reply._id} >
          <p>{reply.content}</p>
        </section>
      ))}
    </>
  );
};

export default ReplyCard;
