'use client';

import { signIn } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
        Sign in with Google to view topics
    </button>
  );
};