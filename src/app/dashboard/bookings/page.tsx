import { SearchParams } from '@/types/data-table';

type ManageBookinsProps = {
  params: object;
  searchParams: SearchParams;
};
export default function ManageBookins({ searchParams }: ManageBookinsProps) {
  console.log(searchParams);
  return <div>Manage Bookings</div>;
}
