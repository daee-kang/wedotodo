<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<form method="post">
	<input name="email" value={form?.email ?? ''} />
	<input type="password" name="password" />
	<button>Sign up</button>
</form>
