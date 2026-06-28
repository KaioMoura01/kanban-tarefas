import { filterService } from '../service/filter.service';
import type { Filter, PriorityFilter } from '../types/filter';
import type { Task } from '../types/task';

/** Reactive facade for the active filter. UI never touches the service. */
class FilterModule {
	private state = $state<Filter>({ query: '', priority: 'all' });

	get query(): string {
		return this.state.query;
	}

	get priority(): PriorityFilter {
		return this.state.priority;
	}

	get isActive(): boolean {
		return this.state.query.trim().length > 0 || this.state.priority !== 'all';
	}

	setQuery(query: string): void {
		this.state = { ...this.state, query };
	}

	setPriority(priority: PriorityFilter): void {
		this.state = { ...this.state, priority };
	}

	reset(): void {
		this.state = { query: '', priority: 'all' };
	}

	visible(tasks: Task[]): Task[] {
		return filterService.apply(tasks, this.state);
	}
}

export const filterModule = new FilterModule();
