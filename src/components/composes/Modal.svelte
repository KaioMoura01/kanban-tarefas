<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title: string;
		onClose: () => void;
		children: Snippet;
	}

	const { open, title, onClose, children }: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		sync(dialog, open);
	});

	function sync(element: HTMLDialogElement | undefined, isOpen: boolean): void {
		if (!element) {
			return;
		}

		if (isOpen) {
			element.showModal();
			return;
		}

		if (element.open) {
			element.close();
		}
	}

	function onBackdrop(event: MouseEvent): void {
		if (event.target === dialog) {
			onClose();
		}
	}
</script>

<dialog
	bind:this={dialog}
	onclose={onClose}
	onclick={onBackdrop}
	class="border-border-subtle bg-surface-elevated m-auto w-full max-w-lg rounded-2xl border p-0 shadow-xl backdrop:bg-black/40"
>
	<div class="flex flex-col gap-4 p-6">
		<header class="flex items-center justify-between">
			<h2 class="title-sm text-content">{title}</h2>
			<button
				type="button"
				onclick={onClose}
				aria-label="Fechar"
				class="text-content-muted hover:text-content transition-colors"
			>
				<X class="size-5" />
			</button>
		</header>
		{@render children()}
	</div>
</dialog>
