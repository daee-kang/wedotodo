<script lang="ts">
  export let data;

  const { session } = data;
</script>

<form method="POST" action="?/signout">
  <button>
    logout
  </button>
</form>

<h1>
  hello now you are home
</h1>

