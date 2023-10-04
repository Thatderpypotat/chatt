<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
import type { PageData } from './$types';
    
    export let data: PageData;
    browser? setInterval(invalidateAll,1000):null;
</script>

<body class="background">
    {#each data.messages as message}
        <div>
            <p>{message.user}</p>
            <p>{message.message}</p>
        </div> 
    {/each}
    <div>
        <form action="/login?/logout">
            <button>logout</button>
        </form>
        <a href="/sessions">Back</a>
    </div>

    <div class="chatDiv">
        <form method="post" action="?/text" use:enhance>
            <input type="text" name="message" id="input">
            <button>Send</button>
        </form> 
    </div>
     
</body>

<style>

.background{
    background-color: #183446;
}
.chatDiv{
    background-color: #022F40;
    height: 20%;
    width: 100%;
    position: absolute;
    bottom: 0px;
}
#input{
    position: relative;
    top: 110px;
    height: 50px;
    width: 90%;
    left: 10px;
    padding-left: 5px;
}
</style>