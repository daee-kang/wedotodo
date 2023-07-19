<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData;
  
  console.log(data.todoGroup)
</script>

<h1>
  hello this is {data.todoGroup?.name}
</h1>