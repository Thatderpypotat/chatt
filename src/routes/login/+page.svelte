<script lang="ts">
    import { enhance } from "$app/forms";

    export let form;
    /export let data;/
</script>

<div class= "background">  </div>

<div class="text-background">
          <h1>Welcome to this webbsite</h1>
</div>

<form method="post" action="?/login" use:enhance>
    <lable for="name">namn</lable>
    <input type="text" name="username" id="name">
    <lable for="password">password</lable>
    <input type="password" name="password" id="password">
    <button>Login</button>
    {#if form?.pasSWord}
        <span style="color: red;">{form.pasSWord}</span>
    {/if}
</form>

<style>
.background{
    background-repeat: no-repeat;
    background-image: url("/wet-street-road-rainy-night.avif");
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
    height: 100%;
    width: 100%;
    position: absolute;  
    filter: blur(4px); 
}
.text-background{
    top: 18%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    position: relative;
    width: fit-content;
}
h1{
    font-size: 50px;
    color: #C5AA36;
    text-shadow: 3px 3px #1d2407;
    width: fit-content;
}
</style>