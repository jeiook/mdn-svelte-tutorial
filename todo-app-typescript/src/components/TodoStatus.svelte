<script lang="ts">
	import type { TodoType } from '../types/todo.types';

	export let todos: TodoType[];

	$: totalTodos = todos.length;
	$: completedTodos = todos.filter((t) => t.completed).length;
	$: percentage = Math.round((completedTodos / totalTodos) * 100);

	let progressBarBoxWidth: number;
	let headingEl: HTMLElement;

	export function focus() {
		headingEl.focus();
	}
</script>

{#if completedTodos > 0}
	<div class="progress-bar">
		<div
			bind:clientWidth={progressBarBoxWidth}
			class={'box' + (completedTodos === totalTodos ? ' complete' : '')}
			style="--percentage:{percentage}"
		>
			<p>
				{#if progressBarBoxWidth >= 40}
					{percentage}%
				{/if}
				{#if progressBarBoxWidth >= 125}
					<span>Completed</span>
				{/if}
			</p>
		</div>
	</div>
{/if}
<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completedTodos} out of {totalTodos} items completed
</h2>

<style>
	.progress-bar .box {
		width: calc(var(--percentage) * 1%);
	}

	.progress-bar .complete {
		background-color: gold;
		color: black;
	}
</style>
