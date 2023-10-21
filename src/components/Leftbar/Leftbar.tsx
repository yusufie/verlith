"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import SkeletonLeftbar from '@/components/Skeleton/SkeletonLeftbar';
import Lefttop from "@/components/Lefttop/Lefttop";
import styles from './leftbar.module.scss';

type idsProps = {
  user_id:any;
};

const headlinesEndpoint = '/api/headlines';
const usersEndpoint = '/api/users';
const entriesEndpoint = '/api/entries';

const fetcher = (url:any) => fetch(url).then((res) => res.json());

const getUserTierClassName = (userId: string | undefined, users: any[]) => {
  const user = users.find((user: any) => user._id === userId);
  if (user) {
    switch (user.tier) {
      case 'enterprise':
        return styles.enterprise;
      case 'gold':
        return styles.gold;
      case 'silver':
        return styles.silver;
      case 'bronze':
        return styles.bronze;
      default:
        return '';
    }
  }
  return '';
};

const Leftbar: React.FC<idsProps> = ({user_id}) => {

  const { data: headlinesData, error: headlinesError } = useSWR(headlinesEndpoint, fetcher);
  const { data: usersData, error: usersError } = useSWR(usersEndpoint, fetcher);
  const { data: entriesData, error: entriesError } = useSWR(entriesEndpoint, fetcher);
  const pathname = usePathname();
  const [sortByReplies, setSortByReplies] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [isEnterpriseSorting, setIsEnterpriseSorting] = useState(false);
  const [visibleHeadlines, setVisibleHeadlines] = useState(0); // Number of visible headlines

  // to handle loading more headlines
  const handleLoadMore = () => {
    setVisibleHeadlines((prev) => prev + 1);
  };

  // to handle sorting of only enterprise headlines
  const handleSortEnterprise = () => {
    // if click the button again,
    if (isEnterpriseSorting) {
      setIsEnterpriseSorting(false);
      return;
    }
    // click the button to set it true
    setIsEnterpriseSorting(true);
  };
  
  // to toggle sorting by date
  const toggleSortingByDate = () => {
    setSortByDate(!sortByDate);
  };
  
  // to toggle sorting by replies
  const toggleSorting = () => {
    setSortByReplies(!sortByReplies);
  };

  if (headlinesError || usersError || entriesError) {
    return (
      <section className={styles.leftbar}>
        <p>Error: {headlinesError || usersError || entriesError}</p>
      </section>
    );
  }

  if (!headlinesData || !usersData || !entriesData) {
    return <SkeletonLeftbar />;
  }

  // Filter and sort enterprise headlines by the number of entries in descending order
  const enterpriseHeadlines = headlinesData.headlines
    .filter((headline: any) => 
      usersData.users.find((user: any) => user._id === headline.created_by_user_id)?.tier === 'enterprise')
    .sort((a: any, b: any) => {
      const aEntries = entriesData.entries.filter((entry: any) => entry.headline_id === a._id);
      const bEntries = entriesData.entries.filter((entry: any) => entry.headline_id === b._id);

      return bEntries.length - aEntries.length;
    });

  // Take the first four enterprise headlines
  const firstFourEnterpriseHeadlines = enterpriseHeadlines.slice(0, 4);

  // Display the first four "Enterprise" headlines in a specific order
  const firstFourEnterpriseHeadline= [
    firstFourEnterpriseHeadlines[1],
    firstFourEnterpriseHeadlines[3],
    firstFourEnterpriseHeadlines[0],
    firstFourEnterpriseHeadlines[2],
  ]

  // Filter non-enterprise headlines
  const nonEnterpriseHeadlines = headlinesData.headlines
    .filter((headline: any) =>
        !usersData.users.find((user: any) => user._id === headline.created_by_user_id) ||
        usersData.users.find((user: any) => user._id === headline.created_by_user_id)?.tier !== 'enterprise')
    .sort((a: any, b: any) => {
      const aEntries = entriesData.entries.filter((entry: any) => entry.headline_id === a._id);
      const bEntries = entriesData.entries.filter((entry: any) => entry.headline_id === b._id);

      return bEntries.length - aEntries.length;
    });

  // Take the top 10 non-enterprise headlines
  const topTenNonEnterpriseHeadlines = nonEnterpriseHeadlines.slice(0, 9);

  // Display the top ten non-Enterprise headlines in a specific order
  const topTenNonEnterpriseHeadline = [
    topTenNonEnterpriseHeadlines[3],
    topTenNonEnterpriseHeadlines[5],
    topTenNonEnterpriseHeadlines[1],
    topTenNonEnterpriseHeadlines[7],
    topTenNonEnterpriseHeadlines[0],
    topTenNonEnterpriseHeadlines[2],
    topTenNonEnterpriseHeadlines[8],
    topTenNonEnterpriseHeadlines[4],
    topTenNonEnterpriseHeadlines[6],
  ]

  // rest of the headlines
  const restOfHeadlines = headlinesData.headlines.filter((headline: any) =>
  !firstFourEnterpriseHeadline.includes(headline) && !topTenNonEnterpriseHeadline.includes(headline));
  
    // Sort the firstFourEnterpriseEntries in descending order based on replies
    if (sortByReplies) {
      firstFourEnterpriseHeadline.sort(
        (a:any, b:any) => {
          const aEntries = entriesData.entries.filter((entry: any) => entry.headline_id === a._id);
          const bEntries = entriesData.entries.filter((entry: any) => entry.headline_id === b._id);
    
          return bEntries.length - aEntries.length;
    })}
  
    // Sort the nonEnterpriseEntries in descending order based on replies
    if (sortByReplies) {
      topTenNonEnterpriseHeadline.sort((a:any, b:any) => {
        const aEntries = entriesData.entries.filter((entry: any) => entry.headline_id === a._id);
        const bEntries = entriesData.entries.filter((entry: any) => entry.headline_id === b._id);
  
        return bEntries.length - aEntries.length;
    })}

    // Sort the restOfHeadlines in descending order based on replies
    if (sortByReplies) {
      restOfHeadlines.sort((a:any, b:any) => {
        const aEntries = entriesData.entries.filter((entry: any) => entry.headline_id === a._id);
        const bEntries = entriesData.entries.filter((entry: any) => entry.headline_id === b._id);
    
        return bEntries.length - aEntries.length;
    })}

    // Sort the firstFourEnterpriseEntries in descending order based on date
    if (sortByDate) {
      firstFourEnterpriseHeadline.sort((a:any, b:any) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
  
        return bDate - aDate;
    })}

    // Sort the nonEnterpriseEntries in descending order based on date
    if (sortByDate) {
      topTenNonEnterpriseHeadline.sort((a:any, b:any) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
  
        return bDate - aDate;
    })}

    // Sort the restOfHeadlines in descending order based on date
    if (sortByDate) {
      restOfHeadlines.sort((a:any, b:any) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
  
        return bDate - aDate;
    })}

  return (
    <>
    <section className={styles.leftbar}>
      <Lefttop 
        user_id={user_id}
        onToggleSorting={toggleSorting} 
        onToggleSortingByDate={toggleSortingByDate} 
        handleSortEnterprise={handleSortEnterprise}
        isEnterpriseSorting={isEnterpriseSorting}
        sortByReplies={sortByReplies}
        sortByDate={sortByDate}
      />

      {/* check if enterprise headlines, or display other headlines mappings */}
      {isEnterpriseSorting ? (
      <>
        {enterpriseHeadlines.map((headline: any) => (
          <Link href={`/headline/${headline._id}`} key={headline._id} >
            <button className={`${styles.leftbarButton} 
              ${getUserTierClassName(headline.created_by_user_id, usersData.users)}
              ${pathname === `/headline/${headline._id}` ? styles.active : ''}`}>
              <span>{headline.title}</span>
              <span className={styles.number}>
                {entriesData.entries.filter((entry: any) => entry.headline_id === headline._id).length}
              </span>
            </button>
          </Link>
        ))}
      </>
      
      ) : (

      <>
        {/* first four enterprise headlines */}
        {firstFourEnterpriseHeadline.map((headline: any) => (
          <Link href={`/headline/${headline._id}`} key={headline._id} >
            <button className={`${styles.leftbarButton} 
              ${getUserTierClassName(headline.created_by_user_id, usersData.users)}
              ${pathname === `/headline/${headline._id}` ? styles.active : ''}`}>
              <span>{headline.title}</span>
              <span className={styles.number}>
                {entriesData.entries.filter((entry: any) => entry.headline_id === headline._id).length}
              </span>
            </button>
          </Link>
        ))}

        {/* the rest of the non-enterprise headlines */}
        {topTenNonEnterpriseHeadline.map((headline: any) => (
          <Link href={`/headline/${headline._id}`} key={headline._id} >
            <button className={`${styles.leftbarButton} 
              ${getUserTierClassName(headline.created_by_user_id, usersData.users)} 
              ${pathname === `/headline/${headline._id}` ? styles.active : ''}`}>
              <span>{headline.title}</span>
              <span className={styles.number}>
                {entriesData.entries.filter((entry: any) => entry.headline_id === headline._id).length}
              </span>
            </button>
          </Link>
        ))}

        {/* the rest of the all headlines */}
        {restOfHeadlines.slice(0, visibleHeadlines).map((headline: any) => (
          <Link href={`/headline/${headline._id}`} key={headline._id}>
            <button
              className={`${styles.leftbarButton} 
              ${getUserTierClassName(headline.created_by_user_id, usersData.users)} 
              ${pathname === `/headline/${headline._id}` ? styles.active : ''}`}
            >
              <span>{headline.title}</span>
              <span className={styles.number}>
                {entriesData.entries.filter((entry: any) => entry.headline_id === headline._id).length}
              </span>
            </button>
          </Link>
        ))}
      </>

      )}

        {visibleHeadlines < restOfHeadlines.length && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}

    </section>
    </>
  )
}

export default Leftbar