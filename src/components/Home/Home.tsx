"use client";
import useSWR from "swr";
import HomeCard from "@/components/Home/HomeCard";
import styles from "./home.module.scss";
import React from "react";

type idsProps = {
  user_id: any;
};

const headlinesEndpoint = "/api/headlines";
const usersEndpoint = "/api/users";
const entriesEndpoint = "/api/entries";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Home: React.FC<idsProps> = ({ user_id }) => {
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
      <section className={styles.home}>
        <p>Error: {headlinesError || usersError || entriesError}</p>
      </section>
    );
  }

  if (!headlinesData || !usersData || !entriesData) {
    return (
      <section className={styles.home}>
        <p>Loading...</p>
      </section>
    );
  }

  // Filter headlines with corresponding entries and count the number of entries for each headline
  const headlinesWithEntryCounts = headlinesData.headlines
    .filter((headline: any) =>
      entriesData.entries.some(
        (entry: any) => entry.headline_id === headline._id
      )
    )
    .map((headline: any) => {
      const entryCount = entriesData.entries.filter(
        (entry: any) => entry.headline_id === headline._id).length;
      const enterpriseEntryCount = entriesData.entries.filter(
        (entry: any) => entry.headline_id === headline._id && usersData.users.find(
        (user: any) => user._id === entry.posted_by_user_id)?.tier === "enterprise").length;
      const firstEntry = entriesData.entries.find(
        (entry: any) => entry._id === headline.first_entry_id);
      const user = usersData.users.find(
        (user: any) => user._id === headline.created_by_user_id);
      return { headline, entryCount, enterpriseEntryCount, firstEntry, user };
    });

  // Sort all headlines with their first entries in descending order
  headlinesWithEntryCounts.sort((a: any, b: any) => b.entryCount - a.entryCount);

  // Separate headlines by user tier (enterprise or non-enterprise)
  const enterpriseHeadlines = headlinesWithEntryCounts.filter(
    (headline: any) => headline.user?.tier === "enterprise" );
  const nonEnterpriseHeadlines = headlinesWithEntryCounts.filter(
    (headline: any) => headline.user?.tier !== "enterprise" );

  // Get the first non-enterprise headline with the most entries
  const firstNonEnterpriseHeadline =
    nonEnterpriseHeadlines.length > 0 ? [nonEnterpriseHeadlines[0]] : [];

  // Get the first enterprise headline with the most entries
  const firstEnterpriseHeadline =
    enterpriseHeadlines.length > 0 ? [enterpriseHeadlines[0]] : [];

  // Get the rest of the headlines, including enterprise headlines, sorted in descending order
  const restofHeadlines = headlinesWithEntryCounts.slice(1);

  return (
    <section className={styles.home}>
      {/* the first card with non-enterprise headline that has the most entries */}
      {firstNonEnterpriseHeadline.map(
        (
          { headline, entryCount, enterpriseEntryCount, firstEntry, user },
          index: number
        ) => (
          <HomeCard
            key={headline._id}
            headline={headline}
            entryCount={entryCount}
            firstEntry={firstEntry}
            enterpriseEntryCount={enterpriseEntryCount}
            user={user}
            user_id={user_id}
            isFirstHeadline={index === 0}
            allEntries={entriesData.entries}
          />
        )
      )}

      {/* the second card with enterprise headline that has the most entries */}
      {firstEnterpriseHeadline.map(
        ({ headline, entryCount, enterpriseEntryCount, firstEntry, user }) => (
          <HomeCard
            key={headline._id}
            headline={headline}
            entryCount={entryCount}
            firstEntry={firstEntry}
            enterpriseEntryCount={enterpriseEntryCount}
            user={user}
            user_id={user_id}
            isFirstHeadline={false}
            allEntries={entriesData.entries}
          />
        )
      )}

      {/* the rest of the headlines, including enterprise headlines, sorted in descending order */}
      {restofHeadlines.map(
        ({
          headline,
          entryCount,
          enterpriseEntryCount,
          firstEntry,
          user,
        }: any) => (
          <HomeCard
            key={headline._id}
            headline={headline}
            entryCount={entryCount}
            enterpriseEntryCount={enterpriseEntryCount}
            firstEntry={firstEntry}
            user={user}
            user_id={user_id}
            isFirstHeadline={false}
            allEntries={entriesData.entries}
          />
        )
      )}
    </section>
  );
};

export default Home;
