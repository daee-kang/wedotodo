<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { groups } = data;
</script>

<h1>hello now you are home</h1>

<h2>owned todos</h2>

{#each groups.owned as group}
	<li>
		<a href={`./todos/${group.id}`}>
			{group.name}
		</a>
	</li>
{/each}

<h2>todos im a part of</h2>

{#each groups.member as group}
	<li>
		<a href="./todos/{group.id}">
			{group.name}
		</a>
	</li>
{/each}

<form method="GET" action="todos/create">
	<button> create todo </button>
</form>
