<script lang="ts">
	import { GripVertical, Trash2 } from 'lucide-svelte';
	import type { Task } from '$packages/board/types/task';
	import PriorityBadge from './PriorityBadge.svelte';

	interface Props {
		task: Task;
		dragging: boolean;
		onOpen: () => void;
		onDelete: () => void;
		onDragStart: () => void;
		onDragEnd: () => void;
	}

	const { task, dragging, onOpen, onDelete, onDragStart, onDragEnd }: Props = $props();

	function handleDragStart(event: DragEvent): void {
		event.dataTransfer?.setData('text/plain', task.id);
		onDragStart();
	}

	function handleKey(event: KeyboardEvent): void {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		event.preventDefault();
		onOpen();
	}

	function handleDelete(event: MouseEvent): void {
		event.stopPropagation();
		onDelete();
	}
</script>

<div
	role="button"
	tabindex={0}
	draggable="true"
	aria-label={`Abrir tarefa ${task.title}`}
	ondragstart={handleDragStart}
	ondragend={onDragEnd}
	onclick={onOpen}
	onkeydown={handleKey}
	class="group border-border-subtle bg-surface focus-visible:border-brand flex flex-col gap-2 rounded-xl border p-3 shadow-sm transition-opacity outline-none {dragging
		? 'opacity-40'
		: 'opacity-100'}"
>
	<header class="flex items-start gap-2">
		<GripVertical
			class="text-content-muted mt-0.5 size-4 shrink-0 cursor-grab active:cursor-grabbing"
		/>
		<h3 class="label-lg text-content line-clamp-1 flex-1">{task.title}</h3>
		<button
			type="button"
			onclick={handleDelete}
			aria-label="Remover tarefa"
			class="text-content-muted hover:text-priority-high transition-colors"
		>
			<Trash2 class="size-4" />
		</button>
	</header>

	{#if task.description}
		<p class="paragraph-sm text-content-muted line-clamp-1 pl-6">{task.description}</p>
	{/if}

	<div class="pl-6">
		<PriorityBadge priority={task.priority} />
	</div>
</div>
