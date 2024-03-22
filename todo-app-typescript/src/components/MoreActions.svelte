<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let todos: any[]; // todo: apply todo type

	const dispatch = createEventDispatcher();

	let completed = true;

	const checkAll = () => {
		dispatch('checkAll', completed);
		completed = !completed;
	};

	const removeCompleted = () => dispatch('removeCompleted');

	$: completedTodos = todos.filter((t) => t.completed).length;
</script>

<div class="btn-group">
	<button type="button" class="btn btn__primary" on:click={checkAll} disabled={todos.length === 0}
		>{completed ? 'Check' : 'Uncheck'} all</button
	>
	<button
		type="button"
		class="btn btn__primary"
		on:click={removeCompleted}
		disabled={completedTodos === 0}>Remove completed</button
	>
</div>
