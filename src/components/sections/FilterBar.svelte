<script lang="ts">
	import { Search, X } from 'lucide-svelte';
	import { filterModule } from '$packages/board/module/filter.module.svelte';
	import { PRIORITIES } from '$packages/board/constants/config';
	import type { PriorityFilter } from '$packages/board/types/filter';
	import Select from '$components/composes/Select.svelte';

	const field =
		'rounded-lg border border-border-subtle bg-surface px-3 py-2 text-content outline-none focus:border-brand';
</script>

<div class="flex flex-wrap items-center gap-3">
	<div class="relative flex-1 sm:min-w-64">
		<Search class="text-content-muted absolute top-1/2 left-3 size-4 -translate-y-1/2" />
		<input
			value={filterModule.query}
			oninput={(event) => filterModule.setQuery(event.currentTarget.value)}
			type="search"
			placeholder="Buscar tarefas…"
			aria-label="Buscar tarefas"
			class="{field} w-full pl-9"
		/>
	</div>

	<Select
		value={filterModule.priority}
		onChange={(value) => filterModule.setPriority(value as PriorityFilter)}
		ariaLabel="Filtrar por prioridade"
		class="w-full sm:w-auto"
	>
		<option value="all">Todas as prioridades</option>
		{#each PRIORITIES as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</Select>

	{#if filterModule.isActive}
		<button
			type="button"
			onclick={() => filterModule.reset()}
			class="label-md border-border-subtle text-content-muted hover:text-content flex items-center gap-1 rounded-lg border px-3 py-2 transition-colors"
		>
			<X class="size-4" /> Limpar
		</button>
	{/if}
</div>
