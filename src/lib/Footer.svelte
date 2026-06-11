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

<footer class="border-t border-stroke mt-16">
  <div class="max-w-5xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
      <nav aria-label="Footer navigation">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Explore</h2>
        <ul class="space-y-2">
          {#each exploreLinks as { href, label }}
            <li>
              <a {href} class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <nav aria-label="Case studies">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Case Studies</h2>
        <ul class="space-y-2">
          {#each caseStudyLinks as { href, label }}
            <li>
              <a {href} class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <nav aria-label="Social profiles">
        <h2 class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Connect</h2>
        <ul class="space-y-2">
          {#each connectLinks as { href, label }}
            <li>
              <a {href} target="_blank" rel="me noopener noreferrer" class="text-sm font-sans text-muted hover:text-accent transition-colors duration-200">{label}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    <div class="border-t border-stroke pt-6 text-center">
      <p class="text-sm font-sans text-muted mb-1">
        Custom websites, apps &amp; software — one-time payment, you own the code.
      </p>
      <p class="text-sm font-sans text-muted">&copy; 2026 Ayush Jhunjhunwala. All Rights Reserved.</p>
    </div>
  </div>
</footer>
