'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div>
      <p>已登录用户信息：</p>
      {session && session.user && <>
        {session.user.image && <Image src={session.user.image} alt="User Avatar" />}
        {session.user.name && <p>{session.user.name}</p>}
        {session.user.email && <p>{session.user.email}</p>}</>
      }
    </div>
  );
}