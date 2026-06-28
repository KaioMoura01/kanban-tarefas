<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		value: string;
		ariaLabel?: string;
		class?: string;
		children: Snippet;
		onChange?: (value: string) => void;
	}

	let {
		value = $bindable(),
		ariaLabel,
		class: className = '',
		children,
		onChange
	}: Props = $props();

	function handle(event: Event): void {
		const target = event.currentTarget as HTMLSelectElement;
		value = target.value;
		onChange?.(target.value);
	}
</script>

<div class="relative {className}">
	<select
		{value}
		onchange={handle}
		aria-label={ariaLabel}
		class="border-border-subtle bg-surface text-content focus:border-brand w-full appearance-none rounded-lg border py-2 pr-9 pl-3 outline-none"
	>
		{@render children()}
	</select>
	<ChevronDown
		class="text-content-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
	/>
</div>
