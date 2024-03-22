<script>
	import Alerts from '../components/Alerts.svelte';
	import Todos from '../components/Todos.svelte';

	import { todos } from '../stores';
</script>

<Alerts />
<Todos bind:todos={$todos} />
