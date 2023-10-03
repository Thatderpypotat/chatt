<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    //export let form;
    export let data: PageData;
    //{#if form?.session}
    //    <p>{form.session}</p>
    //{/if}
</script>

<body class="body">
    <ul>
        {#each data.sessions as session}
            <li><a href="/sessions/{session.sessionName}">{session.sessionName} - {session.messages.length} Messages</a></li>
        {/each}
    </ul>


    <form method="post" action="?/create" use:enhance>
        <label for="sessionName">Create session</label>
        <input type="text" name="sessionname" id="sessionName">
        <button>Create a session</button>
        
    </form>

</body>

<style>
.body{
    background-color: #f5f5dc;
}

</style>