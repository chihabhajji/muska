/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { type User } from '@prisma/client';
import { DownloadIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? ( */}
      {/*   <DeleteTasksDialog */}
      {/*     tasks={table */}
      {/*       .getFilteredSelectedRowModel() */}
      {/*       .rows.map((row) => row.original)} */}
      {/*     onSuccess={() => table.toggleAllRowsSelected(false)} */}
      {/*   /> */}
      {/* ) : null} */}
      {/* <CreateTaskDialog /> */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // exportTableToCSV(table, {
          //   filename: 'tasks',
          //   excludeColumns: ['select', 'actions'],
          // })
        }}
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
