export type ColumnId = 'todo' | 'doing' | 'done';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: Priority;
	columnId: ColumnId;
	createdAt: number;
}

export interface ColumnDef {
	id: ColumnId;
	title: string;
}

export interface PriorityOption {
	value: Priority;
	label: string;
}
