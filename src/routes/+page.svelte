<script>
    export let data;
</script>

<h1>welcome {data.username} </h1>

<a href="/sessions">go to sessions</a>

<form action="/login?/logout">
    <button>logout</button>
</form>