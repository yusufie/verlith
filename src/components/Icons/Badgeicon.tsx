import React from 'react';

interface BadgeIconProps {
  userTier: string | undefined;
}

const BadgeIcon = ({ userTier }: BadgeIconProps) => {
  let fillColor = '';

  // Determine the fill color based on the nftType
  switch (userTier) {
    case 'enterprise':
      fillColor = 'rgb(255, 165, 230)';
      break;
    case 'gold':
      fillColor = 'rgb(249, 238, 82)';
      break;
    case 'silver':
      fillColor = 'rgb(120, 249, 246)';
      break;
    case 'bronze':
      fillColor = 'rgb(224, 136, 93)';
      break;
    default:
      // Default to a fallback color if nftType is unknown
      fillColor = 'black';
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fillColor}>
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM15.08 16L12 14.15L8.93 16L9.74 12.5L7.03 10.16L10.61 9.85L12 6.55L13.39 9.84L16.97 10.15L14.26 12.5L15.08 16Z" />
    </svg>
  );
};

export default BadgeIcon;
