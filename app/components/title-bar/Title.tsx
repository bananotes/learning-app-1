'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Title: FC = () => {
  const params = useParams();
  // TODO: fix the topic id
  const topicName = params?.topicId || 'Welcome to Bananotes Learning';

  return (
    <Link 
      href={params?.topicId ? `/topics/${params.topicId}` : '/'}
      className="text-xl font-semibold hover:text-blue-600"
    >
      {topicName}
    </Link>
  );
};

export default Title;