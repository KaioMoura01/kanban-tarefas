<script lang="ts">
	interface Props {
		message: string;
	}

	const { message }: Props = $props();
</script>

<p
	class="paragraph-sm border-border-subtle text-content-muted rounded-xl border border-dashed px-3 py-6 text-center"
>
	{message}
</p>
