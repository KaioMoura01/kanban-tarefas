import type { ColumnId, Priority } from './task';

/** Shape submitted by the UI to create a task. */
export interface TaskDraft {
	title: string;
	description: string;
	priority: Priority;
	columnId: ColumnId;
}
