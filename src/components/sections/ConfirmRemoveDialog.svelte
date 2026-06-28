<script lang="ts">
	import { boardModule } from '$packages/board/module/board.module.svelte';
	import Modal from '$components/composes/Modal.svelte';
</script>

<Modal
	open={boardModule.pendingRemovalId !== null}
	title="Remover tarefa"
	onClose={() => boardModule.cancelRemove()}
>
	<p class="paragraph-md text-content-muted">
		Tem certeza que deseja remover esta tarefa? Esta ação não pode ser desfeita.
	</p>

	<div class="flex justify-end gap-3">
		<button
			type="button"
			onclick={() => boardModule.cancelRemove()}
			class="label-lg border-border-subtle text-content hover:bg-surface rounded-lg border px-4 py-2 transition-colors"
		>
			Cancelar
		</button>
		<button
			type="button"
			onclick={() => boardModule.confirmRemove()}
			class="label-lg bg-priority-high rounded-lg px-4 py-2 text-white transition-opacity hover:opacity-90"
		>
			Remover
		</button>
	</div>
</Modal>
