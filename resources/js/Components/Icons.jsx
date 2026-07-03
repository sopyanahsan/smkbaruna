import React from 'react';

export const Icon = ({ name, className = 'w-6 h-6', ...props }) => {
  const icons = {
    menu: (
      <svg viewBox="0 0 100 80" fill="currentColor" className={className} {...props}>
        <rect width="100" height="15"></rect>
        <rect y="30" width="100" height="15"></rect>
        <rect y="60" width="100" height="15"></rect>
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M12 2a5 5 0 00-5 5v3H5a1 1 0 00-.894 1.447L7 16v4a1 1 0 001 1h8a1 1 0 001-1v-4l2.894-4.553A1 1 0 0019 10h-2V7a5 5 0 00-5-5zM9 7a3 3 0 116 0v3H9V7z" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2h1a1 1 0 011 1v13a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h1zm2-2v2h12V5H6zm12 9v5H6v-5h12z" />
      </svg>
    ),
    car: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M3 13l1.5-4.5h15L21 13v5a1 1 0 01-1 1h-1a2 2 0 11-4 0h-6a2 2 0 11-4 0H4a1 1 0 01-1-1v-5zM5 16a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM7 9l-1 3h12l-1-3H7z" />
      </svg>
    ),
    computer: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm-2 14h16v2H4v-2z" />
      </svg>
    ),
    mappin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M22 16.92V21a1 1 0 01-1.09 1c-4.39-.5-8.69-2.54-12-5.85s-5.35-7.61-5.85-12A1 1 0 013 3h4.09a1 1 0 011 .75c.21.78.55 1.5.96 2.17a1 1 0 01-.23 1.32l-2.2 2.2a16.05 16.05 0 006.58 6.58l2.2-2.2a1 1 0 011.32-.23c.67.41 1.39.75 2.17.96a1 1 0 01.75 1z" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M4 4h16v16H4V4z" />
        <polyline points="22,4 12,13 2,4" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default Icon;