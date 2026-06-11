<script>
  const exploreLinks = [
    { href: '/', label: 'Home' },
    { href: '/myworks', label: 'Works' },
    { href: '/reading', label: 'Reading' },
    { href: '/writing', label: 'Writing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ];

  const caseStudyLinks = [
    { href: '/work/piipharma-loyalty', label: 'PiiPharma Loyalty' },
    { href: '/work/kiraya-app', label: 'Kiraya App' },
    { href: '/work/badasha-ticketing', label: 'Badasha Ticketing' },
    { href: '/work/humanaissance', label: 'Humanaissance' },
    { href: '/work/toondemy-preschool', label: 'Toondemy Preschool' },
    { href: '/work/aarti-jewellers', label: 'Aarti Jewellers' },
    { href: '/work/sikhaid-ngo', label: 'SikhAid NGO' },
    { href: '/work/roxford-healthcare', label: 'Roxford Healthcare' },
    { href: '/work/om-therapeutics', label: 'OM Therapeutics' }
  ];

  const connectLinks = [
    { href: 'https://github.com/the-non-expert', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/ayush-jhunjhunwala', label: 'LinkedIn' },
    { href: 'https://www.npmjs.com/~ayushjhunjhunwala', label: 'npm' },
    { href: 'https://pypi.org/user/AyushJJW/', label: 'PyPI' },
    { href: 'https://www.instagram.com/ayush_jhunjhunwala/', label: 'Instagram' }
  ];
</script>

<footer class="border-t border-stroke mt-20">
  <div class="max-w-5xl mx-auto px-6 py-14">
    <div class="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10">

      <!-- Brand -->
      <div class="col-span-2 md:col-span-4 md:pr-8">
        <p class="font-display text-xl text-ink mb-3">Ayush Jhunjhunwala</p>
        <p class="text-sm font-sans text-muted leading-relaxed">
          Custom websites, apps and software for small businesses — built once,
          priced upfront, and owned entirely by you.
        </p>
        <p class="text-sm font-sans text-muted mt-4">Cuttack, India · working worldwide</p>
      </div>

      <!-- Explore -->
      <nav aria-label="Footer navigation" class="md:col-span-2">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Explore</h2>
        <ul class="space-y-2.5">
          {#each exploreLinks as { href, label }}
            <li>
              <a {href} class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Case studies -->
      <nav aria-label="Case studies" class="col-span-2 md:col-span-4 order-last md:order-none">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Case Studies</h2>
        <ul class="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {#each caseStudyLinks as { href, label }}
            <li>
              <a {href} class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Connect -->
      <nav aria-label="Social profiles" class="md:col-span-2">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Connect</h2>
        <ul class="space-y-2.5">
          {#each connectLinks as { href, label }}
            <li>
              <a {href} target="_blank" rel="me noopener noreferrer" class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    <div class="border-t border-stroke mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-xs font-sans text-muted">&copy; 2026 Ayush Jhunjhunwala. All Rights Reserved.</p>
      <a href="/contact" class="text-xs font-sans text-muted hover:text-accent transition-colors duration-200">Start a project &rarr;</a>
    </div>
  </div>
</footer>
