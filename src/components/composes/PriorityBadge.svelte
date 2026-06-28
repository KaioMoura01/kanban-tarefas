<script lang="ts">
	import { PRIORITIES } from '$packages/board/constants/config';
	import type { Priority } from '$packages/board/types/task';

	interface Props {
		priority: Priority;
	}

	const { priority }: Props = $props();

	const labels: Record<Priority, string> = Object.fromEntries(
		PRIORITIES.map((option) => [option.value, option.label])
	) as Record<Priority, string>;

	const tones: Record<Priority, string> = {
		low: 'bg-priority-low/15 text-priority-low',
		medium: 'bg-priority-medium/15 text-priority-medium',
		high: 'bg-priority-high/15 text-priority-high'
	};
</script>

<span class="label-sm inline-flex items-center rounded-full px-2 py-0.5 {tones[priority]}">
	{labels[priority]}
</span>
