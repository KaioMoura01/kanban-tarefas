import { z } from 'zod';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants/config';

export const prioritySchema = z.enum(['low', 'medium', 'high']);
export const columnIdSchema = z.enum(['todo', 'doing', 'done']);

export const taskSchema = z.object({
	id: z.string(),
	title: z.string().min(1).max(TITLE_MAX_LENGTH),
	description: z.string().max(DESCRIPTION_MAX_LENGTH),
	priority: prioritySchema,
	columnId: columnIdSchema,
	createdAt: z.number()
});

export const tasksSchema = z.array(taskSchema);

export const taskDraftSchema = z.object({
	title: z.string().trim().min(1, 'Informe um título').max(TITLE_MAX_LENGTH, 'Título muito longo'),
	description: z.string().trim().max(DESCRIPTION_MAX_LENGTH, 'Descrição muito longa'),
	priority: prioritySchema,
	columnId: columnIdSchema
});
