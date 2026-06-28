<script lang="ts">
	import { CalendarClock } from 'lucide-svelte';
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import Modal from '$components/composes/Modal.svelte';
	import PriorityBadge from '$components/composes/PriorityBadge.svelte';
	import { formatDateTime } from '$components/composes/format';

	const task = $derived(boardModule.selectedTask);
</script>

<Modal open={task !== null} title="Detalhes da tarefa" onClose={() => boardModule.closeDetail()}>
	{#if task}
		<div class="flex flex-col gap-4">
			<div class="flex items-start justify-between gap-3">
				<h3 class="title-sm text-content flex-1">{task.title}</h3>
				<PriorityBadge priority={task.priority} />
			</div>

			{#if task.description}
				<p class="paragraph-md text-content whitespace-pre-line">{task.description}</p>
			{:else}
				<p class="paragraph-sm text-content-muted italic">Sem descrição.</p>
			{/if}

			<p class="label-md text-content-muted flex items-center gap-2">
				<CalendarClock class="size-4" />
				Criada em {formatDateTime(task.createdAt)}
			</p>
		</div>
	{/if}
</Modal>
