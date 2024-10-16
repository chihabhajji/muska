import React from 'react';

import { UsersTable } from './_components/users-table';
import { UsersTableProvider } from './_components/users-table-provider';

import { getUsersAndCount } from '@/actions/get-users-and-count';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DateRangePicker } from '@/components/date-range-picker';
import { Shell } from '@/components/shell';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchParams } from '@/types/data-table';

type UsersProps = {
  params: object;
  searchParams: {
    skip?: number;
    take?: number;
  };
};
export default async function Users({ searchParams }: UsersProps) {
  return (
    <Shell className="gap-2">
      {/**
       * The `TasksTableProvider` is use to enable some feature flags for the `TasksTable` component.
       * Feel free to remove this, as it's not required for the `TasksTable` component to work.
       */}
      <UsersTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the tasks based on the selected date range it was created at.
         * The business logic for filtering the tasks based on the selected date range is handled inside the component.
         */}
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
            shallow={false}
          />
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={10}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <UsersTable
            usersAndCountPromise={getUsersAndCount(
              searchParams as SearchParams
            )}
          />
        </React.Suspense>
      </UsersTableProvider>
    </Shell>
  );
}
