import type { ColumnDef, PriorityOption } from '../types/task';

export const BOARD_STORAGE_KEY = 'kanban:tasks';

export const TITLE_MAX_LENGTH = 80;
export const DESCRIPTION_MAX_LENGTH = 280;

export const COLUMNS: readonly ColumnDef[] = [
	{ id: 'todo', title: 'A Fazer' },
	{ id: 'doing', title: 'Em Progresso' },
	{ id: 'done', title: 'Concluído' }
];

export const PRIORITIES: readonly PriorityOption[] = [
	{ value: 'low', label: 'Baixa' },
	{ value: 'medium', label: 'Média' },
	{ value: 'high', label: 'Alta' }
];
