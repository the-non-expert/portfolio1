<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  const logo = "/images/Ayushjhunjhunwala.png";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/myworks', label: 'Works' },
    { href: '/reading', label: 'Reading' },
    { href: '/writing', label: 'Writing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  let menuOpen = false;
  let isDark = false;

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<header class="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-ink/8">
  <div class="max-w-5xl mx-auto px-6 md:px-0 py-4 flex items-center justify-between">

    <a href="/" class="shrink-0">
      <img src={logo} alt="Ayush Jhunjhunwala" class="w-36 h-auto" />
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Main navigation" class="hidden md:flex items-center gap-6">
      {#each navLinks as { href, label }}
        {@const isActive = $page.url.pathname === href}
        <a
          {href}
          aria-current={isActive ? 'page' : undefined}
          class="text-sm transition-colors duration-200 {isActive ? 'text-accent font-medium' : 'text-muted hover:text-accent'}"
        >
          {label}
        </a>
      {/each}

      <!-- Theme toggle (desktop) -->
      <button
        on:click={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        class="text-muted hover:text-ink transition-colors duration-200 ml-1"
      >
        {#if isDark}
          <!-- Sun -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="2" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <!-- Moon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>
    </nav>

    <!-- Right side on mobile: theme toggle + hamburger -->
    <div class="md:hidden flex items-center gap-3">
      <button
        on:click={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        class="text-muted hover:text-ink transition-colors duration-200"
      >
        {#if isDark}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="2" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>

      <button
        class="flex flex-col justify-center items-center gap-1.5 w-8 h-8 text-ink"
        on:click={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {#if menuOpen}
          <span class="block w-5 h-px bg-ink rotate-45 translate-y-[7px] transition-transform duration-200"></span>
          <span class="block w-5 h-px bg-ink opacity-0 transition-opacity duration-200"></span>
          <span class="block w-5 h-px bg-ink -rotate-45 -translate-y-[7px] transition-transform duration-200"></span>
        {:else}
          <span class="block w-5 h-px bg-ink transition-transform duration-200"></span>
          <span class="block w-5 h-px bg-ink transition-opacity duration-200"></span>
          <span class="block w-5 h-px bg-ink transition-transform duration-200"></span>
        {/if}
      </button>
    </div>

  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <nav aria-label="Mobile navigation" class="md:hidden border-t border-stroke bg-bg">
      <ul class="flex flex-col px-6 py-4 gap-4">
        {#each navLinks as { href, label }}
          {@const isActive = $page.url.pathname === href}
          <li>
            <a
              {href}
              aria-current={isActive ? 'page' : undefined}
              on:click={closeMenu}
              class="text-sm transition-colors duration-200 {isActive ? 'text-accent font-medium' : 'text-muted hover:text-accent'}"
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>
