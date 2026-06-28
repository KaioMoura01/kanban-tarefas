<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<div class="border-border-subtle bg-surface-elevated rounded-2xl border p-6 shadow-sm {className}">
	{@render children()}
</div>
