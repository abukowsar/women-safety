import React from 'react';

/** Shapla (water lily), Bangladesh's national flower: the site's mark. */
const Shapla: React.FC<{ className?: string; outline?: boolean; strokeWidth?: number }> = ({
  className,
  outline = false,
  strokeWidth = 1.5,
}) => {
  const paint = outline
    ? { fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinejoin: 'round' as const }
    : { fill: 'currentColor' };

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path {...paint} opacity={outline ? 1 : 0.55} d="M32 49C22 49 10 43 4 33C16 31 26 39 32 49Z" />
      <path {...paint} opacity={outline ? 1 : 0.55} d="M32 49C42 49 54 43 60 33C48 31 38 39 32 49Z" />
      <path {...paint} opacity={outline ? 1 : 0.8} d="M32 47C22 41 12 31 11 18C23 21 30 31 32 47Z" />
      <path {...paint} opacity={outline ? 1 : 0.8} d="M32 47C42 41 52 31 53 18C41 21 34 31 32 47Z" />
      <path {...paint} d="M32 7C41 19 41 35 32 47C23 35 23 19 32 7Z" />
      <path
        d="M16 56Q24 52.5 32 56T48 56"
        fill="none"
        stroke="currentColor"
        strokeWidth={outline ? strokeWidth : 2.5}
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
};

export default Shapla;
