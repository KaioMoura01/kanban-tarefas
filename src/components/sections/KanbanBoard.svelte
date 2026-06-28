<script lang="ts">
	import { COLUMNS } from '$packages/board/constants/config';
	import Card from '$components/composes/Card.svelte';
	import Modal from '$components/composes/Modal.svelte';
	import TopBar from '$components/sections/common/TopBar.svelte';
	import NewTaskForm from '$components/sections/NewTaskForm.svelte';
	import FilterBar from '$components/sections/FilterBar.svelte';
	import BoardColumn from '$components/sections/BoardColumn.svelte';
	import ConfirmRemoveDialog from '$components/sections/ConfirmRemoveDialog.svelte';
	import TaskDetailDialog from '$components/sections/TaskDetailDialog.svelte';

	let formOpen = $state(false);
</script>

<div class="flex flex-col gap-6">
	<TopBar onNewTask={() => (formOpen = true)} />

	<Card>
		<FilterBar />
	</Card>

	<div class="grid gap-4 md:grid-cols-3">
		{#each COLUMNS as column (column.id)}
			<BoardColumn {column} />
		{/each}
	</div>
</div>

<Modal open={formOpen} title="Nova tarefa" onClose={() => (formOpen = false)}>
	<NewTaskForm onCreated={() => (formOpen = false)} />
</Modal>

<ConfirmRemoveDialog />

<TaskDetailDialog />
