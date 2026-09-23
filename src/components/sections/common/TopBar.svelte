<script lang="ts">
	import { KanbanSquare, Plus } from 'lucide-svelte';
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	interface Props {
		onNewTask: () => void;
	}

	const { onNewTask }: Props = $props();
</script>

<header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div class="flex items-center justify-between gap-3 sm:justify-start">
		<div class="flex items-center gap-3">
			<span class="bg-brand text-brand-contrast grid size-11 place-items-center rounded-xl">
				<KanbanSquare class="size-6" />
			</span>
			<div>
				<h1 class="title-sm text-content">Kanban de Tarefas</h1>
				<p class="paragraph-sm text-content-muted">{boardModule.total} tarefa(s) no quadro</p>
			</div>
		</div>
		<div class="sm:hidden">
			<ThemeToggle />
		</div>
	</div>

	<div class="flex items-center gap-3">
		<button
			type="button"
			onclick={onNewTask}
			class="label-lg bg-brand text-brand-contrast glow-brand flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 transition-opacity hover:opacity-90 sm:w-auto sm:justify-start"
		>
			<Plus class="size-4" /> Nova tarefa
		</button>
		<div class="hidden sm:block">
			<ThemeToggle />
		</div>
	</div>
</header>
