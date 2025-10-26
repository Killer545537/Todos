export const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
} as const;

export const statusColors = {
    pending: 'text-muted-foreground',
    in_progress: 'text-blue-600',
    completed: 'text-green-600 line-through',
    archived: 'text-gray-400 dark:text-gray-500',
} as const;
