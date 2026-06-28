import type { Filter, PriorityFilter } from '../types/filter';
import type { Task } from '../types/task';

/** Pure rules for narrowing tasks by search term and priority. */
export const filterService = {
	apply(tasks: Task[], filter: Filter): Task[] {
		return tasks.filter((task) => matches(task, filter));
	}
};

function matches(task: Task, filter: Filter): boolean {
	return matchesQuery(task, filter.query) && matchesPriority(task, filter.priority);
}

function matchesQuery(task: Task, query: string): boolean {
	const term = query.trim().toLowerCase();
	if (term.length === 0) {
		return true;
	}

	return task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term);
}

function matchesPriority(task: Task, priority: PriorityFilter): boolean {
	return priority === 'all' || task.priority === priority;
}
