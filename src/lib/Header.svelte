<script>
  import { page } from '$app/stores';

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

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-ink/8">
  <div class="max-w-5xl mx-auto px-6 md:px-0 py-4 flex items-center justify-between">

    <a href="/" class="shrink-0">
      <img src={logo} alt="Ayush Jhunjhunwala" class="w-36 h-auto" />
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Main navigation" class="hidden md:block">
      <ul class="flex items-center gap-6">
        {#each navLinks as { href, label }}
          {@const isActive = $page.url.pathname === href}
          <li>
            <a
              {href}
              aria-current={isActive ? 'page' : undefined}
              class="text-sm transition-colors duration-200 {isActive ? 'text-accent font-medium' : 'text-muted hover:text-accent'}"
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Hamburger button (mobile only) -->
    <button
      class="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 text-ink"
      on:click={toggleMenu}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
    >
      {#if menuOpen}
        <!-- X icon -->
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
