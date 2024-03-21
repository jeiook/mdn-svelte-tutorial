<script>
  import FilterButton from "./FilterButton.svelte";
  import MoreActions from "./MoreActions.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Todo from "./Todo.svelte";
  import TodoStatus from "./TodoStatus.svelte";

  export let todos = [];

  let todoStatus; // reference to TodoStatus component instance

  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id);
    todoStatus.focus();
  }

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
  }

  let filter = "all";
  const filterTodos = (filter, todos) =>
    filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "completed"
        ? todos.filter((t) => t.completed)
        : todos;

  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    todos[i] = { ...todos[i], ...todo };
  }

  const checkAllTodos = (completed) => {
    todos = todos.map((t) => ({ ...t, completed }));
  };

  const removeCompletedTodos = () =>
    (todos = todos.filter((t) => !t.completed));
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
