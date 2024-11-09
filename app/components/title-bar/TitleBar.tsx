import { FC } from 'react';
import Logo from './Logo';
import Title from './Title'; 
import UserInfo from './UserInfo';

const TitleBar: FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center gap-4">
        <Logo />
        <Title />
      </div>
      <UserInfo />
    </header>
  );
};

export default TitleBar;