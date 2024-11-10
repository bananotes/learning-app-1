'use client';

import { FC } from 'react';
import Logo from './Logo';
import Title from './Title'; 
import UserInfo from './UserInfo';
import { usePathname } from 'next/navigation';

const TitleBar: FC = () => {
  const pathname = usePathname();
  const isInTopicPage = pathname.includes('/topic/');
  return (
    <header className={`${!isInTopicPage && 'sticky top-0'} flex items-center justify-between px-4 py-2 bg-white border-b z-50`}>
      <div className="flex items-center gap-4">
        <Logo />
        <Title />
      </div>
      <UserInfo />
    </header>
  );
};

export default TitleBar;