import { BOARD_STORAGE_KEY } from '../constants/config';
import type { Task } from '../types/task';
import { tasksSchema } from '../validators/schemas';

/** Persistence boundary: reads/writes the task collection to LocalStorage. */
export const storageGateway = {
	read(): Task[] {
		if (typeof localStorage === 'undefined') {
			return [];
		}

		const raw = localStorage.getItem(BOARD_STORAGE_KEY);
		return raw ? parse(raw) : [];
	},

	write(tasks: Task[]): void {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(tasks));
	}
};

function parse(raw: string): Task[] {
	const parsed = tasksSchema.safeParse(safeJson(raw));
	return parsed.success ? parsed.data : [];
}

function safeJson(raw: string): unknown {
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
