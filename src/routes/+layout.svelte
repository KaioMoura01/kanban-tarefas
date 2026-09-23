<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import ToastViewport from '$components/sections/common/ToastViewport.svelte';
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import { themeModule } from '$packages/theme/module/theme.module.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	onMount(() => {
		themeModule.hydrate();
		boardModule.hydrate();
	});
</script>

<ToastViewport />

<div class="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-8 px-4 py-6">
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="flex flex-col items-center gap-4">
		<p class="paragraph-sm text-content-muted text-center">
			Arraste os cartões entre as colunas — tudo é salvo no seu navegador.
		</p>
		<div class="ultimatriz-credit">
			<img src="/ultimatriz-icon.svg" alt="" aria-hidden="true" />
			<span class="ultimatriz-credit-text">
				<span class="ultimatriz-credit-word">ULTIMATRIZ</span>
				<span class="ultimatriz-credit-tag">Software Studio</span>
			</span>
		</div>
	</footer>
</div>
