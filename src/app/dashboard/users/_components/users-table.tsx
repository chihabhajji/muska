'use client';
import { use, useMemo } from 'react';
import { type User } from '@prisma/client';

import { getColumns } from './users-table-columns';
import { UsersTableFloatingBar } from './users-table-floating-bar';
import { useUsersTable } from './users-table-provider';
import { UsersTableToolbarActions } from './users-table-toolbar-actions';

import { getUsersAndCount } from '@/actions/get-users-and-count';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { type DataTableFilterField } from '@/types/data-table';

interface TasksTableProps {
  usersAndCountPromise: ReturnType<typeof getUsersAndCount>;
}

export function UsersTable({ usersAndCountPromise }: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useUsersTable();

  const [data, pageCount] = use(usersAndCountPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<User>[] = [
    {
      label: 'Nom',
      value: 'name',
      placeholder: 'Filter names...',
    },
  ];
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: featureFlags.includes('advancedFilter'),
    initialState: {
      sorting: [{ id: 'joinedAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });

  const Toolbar = featureFlags.includes('advancedFilter')
    ? DataTableAdvancedToolbar
    : DataTableToolbar;

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes('floatingBar') ? (
          <UsersTableFloatingBar table={table} />
        ) : null
      }
    >
      <Toolbar table={table} filterFields={filterFields}>
        <UsersTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
  );
}
