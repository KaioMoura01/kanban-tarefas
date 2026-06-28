import type { TaskDraft } from '../types/draft';
import type { ColumnId, Task } from '../types/task';
import { createId } from './id';

/** Pure business rules for the task collection. No side effects. */
export const boardService = {
	create(tasks: Task[], draft: TaskDraft): Task[] {
		const task: Task = { id: createId(), createdAt: Date.now(), ...draft };
		return [...tasks, task];
	},

	remove(tasks: Task[], id: string): Task[] {
		return tasks.filter((task) => task.id !== id);
	},

	move(tasks: Task[], id: string, columnId: ColumnId): Task[] {
		return tasks.map((task) => (task.id === id ? { ...task, columnId } : task));
	},

	update(tasks: Task[], id: string, patch: Partial<TaskDraft>): Task[] {
		return tasks.map((task) => (task.id === id ? { ...task, ...patch } : task));
	},

	inColumn(tasks: Task[], columnId: ColumnId): Task[] {
		return tasks.filter((task) => task.columnId === columnId);
	}
};
