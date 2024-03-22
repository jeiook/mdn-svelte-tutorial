<script lang="ts">
	import type { TodoType } from '../types/todo.types';

	export let todos: TodoType[];

	$: totalTodos = todos.length;
	$: completedTodos = todos.filter((t) => t.completed).length;

	let headingEl: HTMLHeadingElement;

	export function focus() {
		headingEl.focus();
	}
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completedTodos} out of {totalTodos} items completed
</h2>
