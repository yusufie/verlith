import React from "react";
import styles from "./skeletonleftbar.module.scss";

const SkeletonLeftbar = () => {
  return (
    <section className={`${styles.leftbar} ${styles.leftbarSkeleton}`}>

      {/* Display loading skeleton */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ].map((_, index) => (
        <div key={index} className={styles.skeletonButton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonNumber}></div>
        </div>
      ))}

    </section>
  );
};

export default SkeletonLeftbar;
