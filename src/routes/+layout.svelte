<script>
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import "../app.css";
  import { onMount } from 'svelte';

  onMount(() => {
    function handleKey(e) {
      if (e.key === 't' || e.key === 'T') {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
</script>

<div>
  <Header />
  <slot />
  <Footer />
</div>
