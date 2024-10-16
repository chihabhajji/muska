'use server';

import { SearchParams } from '@/types/data-table';

export const getUsersAndCount = async (searchParams: SearchParams) => {
  const skip = searchParams.skip
    ? Number.parseInt(searchParams.skip.toString())
    : 0;
  const take = searchParams.take
    ? Number.parseInt(searchParams.take.toString())
    : 10;
  const name = searchParams.name ? searchParams.name.toString() : undefined;
  const users = prisma!.user.findMany({
    skip,
    take,
    orderBy: { joinedAt: 'desc' },
    where: {
      role: 'USER',
      name: name ? { contains: name } : undefined,
    },
  });
  const count = prisma!.user.count({
    skip,
    take,
    orderBy: { joinedAt: 'desc' },
    where: {
      role: 'USER',
      name: name ? { contains: name } : undefined,
    },
  });
  return await Promise.all([users, count]);
};
