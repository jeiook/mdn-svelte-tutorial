<script lang="ts" context="module">
	export type Filter = 'all' | 'active' | 'completed';
</script>

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { TodoType } from '../types/todo.types';
	import { alert } from '../stores';
	import FilterButton from './FilterButton.svelte';
	import MoreActions from './MoreActions.svelte';
	import NewTodo from './NewTodo.svelte';
	import Todo from './Todo.svelte';
	import TodoStatus from './TodoStatus.svelte';

	export let todos: TodoType[] = [];

	let todoStatus: SvelteComponent; // reference to TodoStatus component instance

	function removeTodo(todo: TodoType) {
		todos = todos.filter((t) => t.id !== todo.id);
		todoStatus.focus();
		$alert = `Todo '${todo.name}' has been deleted`;
	}

	$: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

	function addTodo(name: string) {
		todos = [...todos, { id: newTodoId, name, completed: false }];
		$alert = `Todo '${name}' has been added`;
	}

	let filter: Filter = 'all';
	const filterTodos = (filter: Filter, todos: TodoType[]) =>
		filter === 'active'
			? todos.filter((todo) => !todo.completed)
			: filter === 'completed'
				? todos.filter((t) => t.completed)
				: todos;
	$: {
		if (filter === 'all') {
			$alert = 'Browsing all to-dos';
		} else if (filter === 'active') {
			$alert = 'Browsing active to-dos';
		} else if (filter === 'completed') {
			$alert = 'Browsing completed to-dos';
		}
	}

	function updateTodo(todo: TodoType) {
		const i = todos.findIndex((t) => t.id === todo.id);
		if (todos[i].name !== todo.name) {
			$alert = `Todo '${todos[i].name}' has been renamed to '${todo.name}'`;
		}
		if (todos[i].completed !== todo.completed) {
			$alert = `Todo '${todos[i].name}' marked as ${todo.completed ? 'completed' : 'active'}`;
		}
		todos[i] = { ...todos[i], ...todo };
	}

	const checkAllTodos = (completed: boolean) => {
		todos = todos.map((t) => ({ ...t, completed }));
		$alert = `${completed ? 'Checked' : 'Unchecked'} ${todos.length} to-dos`;
	};

	const removeCompletedTodos = () => {
		const newTodos = todos.filter((t) => !t.completed);
		$alert = `Removed ${todos.length - newTodos.length} to-dos`;
		todos = newTodos;
	};
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<!-- NewTodo -->
	<NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

	<!-- Filter -->
	<FilterButton bind:filter />

	<!-- TodosStatus -->
	<TodoStatus bind:this={todoStatus} {todos} />

	<!-- Todos -->
	<ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
		{#each filterTodos(filter, todos) as todo (todo.id)}
			<li class="todo">
				<Todo
					{todo}
					on:update={(e) => updateTodo(e.detail)}
					on:remove={(e) => removeTodo(e.detail)}
				/>
			</li>
		{:else}
			<li>Nothing to do here!</li>
		{/each}
	</ul>

	<hr />

	<!-- MoreActions -->
	<MoreActions
		{todos}
		on:checkAll={(e) => checkAllTodos(e.detail)}
		on:removeCompleted={removeCompletedTodos}
	/>
</div>
