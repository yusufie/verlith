"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import HeadlineCard from "@/components/Headline/HeadlineCard";
import styles from "./title.module.scss";
import EntryCard from "@/components/Headline/EntryCard";

type idsProps = {
  user_id: any;
};

// Define the API endpoints
const headlinesEndpoint = "/api/headlines";
const usersEndpoint = "/api/users";
const entriesEndpoint = "/api/entries";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Headline: React.FC<idsProps> = ({ user_id }) => {
  const { id } = useParams();
  // Fetch data using SWR for headlines, users, and entries
  const { data: headlinesData, error: headlinesError } = useSWR(
    headlinesEndpoint,
    fetcher
  );
  const { data: usersData, error: usersError } = useSWR(usersEndpoint, fetcher);
  const { data: entriesData, error: entriesError } = useSWR(
    entriesEndpoint,
    fetcher
  );

  if (headlinesError || usersError || entriesError) {
    return (
      <section className={styles.title}>
        <p>Error: {headlinesError || usersError || entriesError}</p>
      </section>
    );
  }

  if (!headlinesData || !usersData || !entriesData) {
    return (
      <section className={styles.title}>
        <p>Loading...</p>
      </section>
    );
  }

  // Find the headline with the given id in headlinesData
  const headline = headlinesData.headlines.find((h: any) => h._id === id);

  // Find the user associated with the headline's creator
  const user = usersData.users.find(
    (u: any) => u._id === headline.created_by_user_id
  );

  // Find the first entry associated with the headline
  const firstEntry = entriesData.entries.find(
    (entry: any) => entry._id === headline.first_entry_id
  );

  // Find all entries associated with the headline
  const headlineEntries = entriesData.entries.filter(
    (entry: any) => entry.headline_id === id
  );

  // Find the users associated with the entries
  const users = usersData.users.reduce(
    (acc: { [key: string]: any }, user: any) => {
      acc[user._id] = user;
      return acc;
    },
    {}
  );

  // all entries length associated with the headline
  const entryCount = headlineEntries.length;

  const enterpriseEntryCount = entriesData.entries.filter(
    (entry: any) =>
      entry.headline_id === headline._id &&
      usersData.users.find((user: any) => user._id === entry.posted_by_user_id)
        ?.tier === "enterprise").length;

  return (
    <section className={styles.title}>
      <HeadlineCard
        headline={headline}
        user={user}
        user_id={user_id}
        firstEntry={firstEntry}
        entryCount={entryCount}
        enterpriseEntryCount={enterpriseEntryCount}
        allEntries={entriesData.entries}
      />

      <ul>
        {headlineEntries?.map((entry: any) => (
          <EntryCard
            key={entry._id}
            users={users}
            user_id={user_id}
            // firstEntry={firstEntry}
            entry={entry}
            enterpriseEntryCount={enterpriseEntryCount}
            allEntries={entriesData.entries}
            headline={headline}
          />
        ))}
      </ul>
    </section>
  );
};

export default Headline;