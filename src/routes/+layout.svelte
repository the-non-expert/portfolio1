<script>
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import "../app.css";
</script>

<div>
  <Header />
  <slot />
  <Footer />
</div>
