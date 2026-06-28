<script lang="ts">
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import { filterModule } from '$packages/board/module/filter.module.svelte';
	import type { ColumnDef } from '$packages/board/types/task';
	import TaskCard from '$components/composes/TaskCard.svelte';
	import EmptyState from '$components/composes/EmptyState.svelte';

	interface Props {
		column: ColumnDef;
	}

	const { column }: Props = $props();

	let isOver = $state(false);

	const tasks = $derived(filterModule.visible(boardModule.inColumn(column.id)));

	function handleDrop(event: DragEvent): void {
		event.preventDefault();
		isOver = false;
		boardModule.dropOn(column.id);
	}

	function allowDrop(event: DragEvent): void {
		event.preventDefault();
		isOver = true;
	}
</script>

<section
	ondragover={allowDrop}
	ondragleave={() => (isOver = false)}
	ondrop={handleDrop}
	role="group"
	aria-label={column.title}
	class="bg-surface-sunken flex flex-col gap-3 rounded-2xl border p-3 transition-colors {isOver
		? 'border-brand'
		: 'border-border-subtle'}"
>
	<header class="flex items-center justify-between px-1">
		<h2 class="label-lg text-content">{column.title}</h2>
		<span class="label-sm bg-surface-elevated text-content-muted rounded-full px-2 py-0.5">
			{tasks.length}
		</span>
	</header>

	<div class="flex min-h-24 flex-col gap-2">
		{#each tasks as task (task.id)}
			<TaskCard
				{task}
				dragging={boardModule.activeDragId === task.id}
				onOpen={() => boardModule.openDetail(task.id)}
				onDelete={() => boardModule.requestRemove(task.id)}
				onDragStart={() => boardModule.beginDrag(task.id)}
				onDragEnd={() => boardModule.endDrag()}
			/>
		{:else}
			<EmptyState message="Nenhuma tarefa aqui" />
		{/each}
	</div>
</section>
