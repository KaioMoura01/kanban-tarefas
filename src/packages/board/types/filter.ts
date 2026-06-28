import type { Priority } from './task';

export type PriorityFilter = Priority | 'all';

export interface Filter {
	query: string;
	priority: PriorityFilter;
}
