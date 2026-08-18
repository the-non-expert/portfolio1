<script>
  import { page } from "$app/stores";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import "../app.css";

  $: isCrm = $page.url.pathname.startsWith("/crm");
</script>

<div>
  {#if !isCrm}
    <Header />
  {/if}
  <slot />
  {#if !isCrm}
    <Footer />
  {/if}
</div>
