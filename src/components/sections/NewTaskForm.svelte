<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import { COLUMNS, PRIORITIES } from '$packages/board/constants/config';
	import type { ColumnId, Priority } from '$packages/board/types/task';
	import Select from '$components/composes/Select.svelte';

	interface Props {
		onCreated?: () => void;
	}

	const { onCreated }: Props = $props();

	let title = $state('');
	let description = $state('');
	let priority = $state<Priority>('medium');
	let columnId = $state<ColumnId>('todo');

	const field =
		'rounded-lg border border-border-subtle bg-surface px-3 py-2 text-content outline-none focus:border-brand';

	function submit(event: SubmitEvent): void {
		event.preventDefault();
		const created = boardModule.create({ title, description, priority, columnId });
		if (!created) {
			return;
		}

		reset();
		onCreated?.();
	}

	function reset(): void {
		title = '';
		description = '';
		priority = 'medium';
		columnId = 'todo';
	}
</script>

<form onsubmit={submit} class="flex flex-col gap-3">
	<input
		bind:value={title}
		type="text"
		placeholder="Título da tarefa"
		aria-label="Título da tarefa"
		class={field}
	/>
	<textarea
		bind:value={description}
		placeholder="Descrição (opcional)"
		aria-label="Descrição da tarefa"
		rows="3"
		class="{field} resize-none"
	></textarea>

	<div class="flex gap-3">
		<label class="flex flex-1 flex-col gap-1">
			<span class="label-sm text-content-muted">Prioridade</span>
			<Select
				value={priority}
				onChange={(value) => (priority = value as Priority)}
				ariaLabel="Prioridade"
			>
				{#each PRIORITIES as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</Select>
		</label>
		<label class="flex flex-1 flex-col gap-1">
			<span class="label-sm text-content-muted">Status</span>
			<Select
				value={columnId}
				onChange={(value) => (columnId = value as ColumnId)}
				ariaLabel="Status"
			>
				{#each COLUMNS as column (column.id)}
					<option value={column.id}>{column.title}</option>
				{/each}
			</Select>
		</label>
	</div>

	<button
		type="submit"
		class="label-lg bg-brand text-brand-contrast flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-opacity hover:opacity-90"
	>
		<Plus class="size-4" /> Adicionar tarefa
	</button>
</form>
