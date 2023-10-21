"use client"
import React, { useState } from 'react';
import styles from './expandable.module.scss';

interface ExpandableProps {
  content: string | undefined;
  descriptionLength: number;
}

const Expandable: React.FC<ExpandableProps> = ({ content, descriptionLength }) => {
  const fullText = content || '';
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.expandable}>
      <p className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}>
        {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
      </p>
      {content && content.length > descriptionLength && (
        <span onClick={toggleText} className={styles.toggleButton}>
          {isExpanded ? ' Show less' : ' Show more'}
        </span>
      )}
    </div>
  );
};

export default Expandable;
