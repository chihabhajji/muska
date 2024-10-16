import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

import { ERole } from '@/types/user';

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: ERole) {
  const statusIcons = {
    [ERole.USER]: CrossCircledIcon,
    [ERole.ADMIN]: CheckCircledIcon,
    [ERole.manager]: QuestionMarkCircledIcon,
  };

  return statusIcons[status] || CircleIcon;
}
//
// /**
//  * Returns the appropriate priority icon based on the provided priority.
//  * @param priority - The priority of the task.
//  * @returns A React component representing the priority icon.
//  */
// export function getPriorityIcon(priority: Task['priority']) {
//   const priorityIcons = {
//     high: ArrowUpIcon,
//     low: ArrowDownIcon,
//     medium: ArrowRightIcon,
//   };
//
//   return priorityIcons[priority] || CircleIcon;
// }
