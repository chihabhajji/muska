/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import { type User } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';

import { getStatusIcon } from '../_lib/utils';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/lib/utils';

export function getColumns(): ColumnDef<User>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'image',
      cell: ({ cell }) => (
        <Avatar>
          <AvatarImage src={cell.getValue() as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'email',
    },
    { accessorKey: 'name' },

    { accessorKey: 'isActive' },
    { accessorKey: 'role' },

    // {
    //   accessorKey: 'code',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Task" />
    //   ),
    //   cell: ({ row }) => <div className="w-20">{row.getValue('code')}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: 'title',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Title" />
    //   ),
    //   cell: ({ row }) => {
    //     // const label = tasks.label.enumValues.find(
    //     //   (label) => label === row.original.label
    //     // );
    //     //
    //     return (
    //       <div className="flex space-x-2">
    //         {/* {label && <Badge variant="outline">{label}</Badge>} */}
    //         <span className="max-w-[31.25rem] truncate font-medium">
    //           {row.getValue('title')}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: 'status',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     // const status = tasks.status.enumValues.find(
    //     //   (status) => status === row.original.status
    //     // );
    //     //
    //     // if (!status) return null;
    //     //
    //     // const Icon = getStatusIcon(status);
    //     //
    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         {/* <Icon */}
    //         {/*   className="text-muted-foreground mr-2 size-4" */}
    //         {/*   aria-hidden="true" */}
    //         {/* /> */}
    //         {/* <span className="capitalize">{status}</span> */}
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    // {
    //   accessorKey: 'priority',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Priority" />
    //   ),
    //   cell: ({ row }) => {
    //     // const priority = tasks.priority.enumValues.find(
    //     //   (priority) => priority === row.original.priority
    //     // );
    //     //
    //     // if (!priority) return null;
    //     //
    //     // const Icon = getPriorityIcon(priority);
    //
    //     return (
    //       <div className="flex items-center">
    //         {/* <Icon */}
    //         {/*   className="text-muted-foreground mr-2 size-4" */}
    //         {/*   aria-hidden="true" */}
    //         {/* /> */}
    //         {/* <span className="capitalize">{priority}</span> */}
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    {
      accessorKey: 'joinedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const { toast } = useToast();
        const [isUpdatePending, startUpdateTransition] = React.useTransition();
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
          React.useState(false);
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false);

        return (
          <>
            {/* <UpdateTaskSheet */}
            {/*   open={showUpdateTaskSheet} */}
            {/*   onOpenChange={setShowUpdateTaskSheet} */}
            {/*   task={row.original} */}
            {/* /> */}
            {/* <DeleteTasksDialog */}
            {/*   open={showDeleteTaskDialog} */}
            {/*   onOpenChange={setShowDeleteTaskDialog} */}
            {/*   tasks={[row.original]} */}
            {/*   showTrigger={false} */}
            {/*   onSuccess={() => row.toggleSelected(false)} */}
            {/* /> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="data-[state=open]:bg-muted flex size-8 p-0"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.role}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast({
                            value: 'Label updated',
                          });
                          // toast.promise(
                          //   updateTask({
                          //     id: row.original.id,
                          //     label: value as Task['label'],
                          //   }),
                          //   {
                          //     loading: 'Updating...',
                          //     success: 'Label updated',
                          //     error: (err) => getErrorMessage(err),
                          //   }
                          // );
                        });
                      }}
                    >
                      {/* {tasks.label.enumValues.map((label) => ( */}
                      {/*   <DropdownMenuRadioItem */}
                      {/*     key={label} */}
                      {/*     value={label} */}
                      {/*     className="capitalize" */}
                      {/*     disabled={isUpdatePending} */}
                      {/*   > */}
                      {/*     {label} */}
                      {/*   </DropdownMenuRadioItem> */}
                      {/* ))} */}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteTaskDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
      size: 40,
    },
  ];
}
