<script lang="ts" context="module">
	export enum Filter {
		ALL = 'all',
		ACTIVE = 'active',
		COMPLETED = 'completed'
	}
</script>

<script lang="ts">
	import type { TodoType } from '../types/todo.types';
	import { alert } from '../stores';
	import FilterButton from './FilterButton.svelte';
	import MoreActions from './MoreActions.svelte';
	import NewTodo from './NewTodo.svelte';
	import Todo from './Todo.svelte';
	import TodoStatus from './TodoStatus.svelte';

	export let todos: TodoType[] = [];

	let todoStatus: TodoStatus; // reference to TodoStatus component instance

	$: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

	function addTodo(name: string) {
		todos = [...todos, { id: newTodoId, name, completed: false }];
		$alert = `Todo '${name}' has been added`;
	}

	function removeTodo(todo: TodoType) {
		todos = todos.filter((t) => t.id !== todo.id);
		todoStatus.focus();
		$alert = `Todo '${todo.name}' has been deleted`;
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

	let filter: Filter = Filter.ALL;
	const filterTodos = (filter: Filter, todos: TodoType[]) =>
		filter === Filter.ACTIVE
			? todos.filter((todo) => !todo.completed)
			: filter === Filter.COMPLETED
				? todos.filter((t) => t.completed)
				: todos;
	$: {
		if (filter === Filter.ALL) {
			$alert = 'Browsing all to-dos';
		} else if (filter === Filter.ACTIVE) {
			$alert = 'Browsing active to-dos';
		} else if (filter === Filter.COMPLETED) {
			$alert = 'Browsing completed to-dos';
		}
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
