<script>
  // @ts-nocheck

  import { workExperience } from "$lib/data/workExperience.js";

  let selectedId = null;
  let viewMode = 'grid'; // 'grid' | 'list'

  function toggleDescription(id) {
    selectedId = selectedId === id ? null : id;
  }
</script>

<section class="w-full bg-bg border-t border-stroke py-16" aria-labelledby="work-experience-heading">
  <div class="max-w-5xl mx-auto px-4 md:px-6">

    <header class="mb-10 flex items-center justify-between">
      <div>
        <h2 id="work-experience-heading" class="font-display text-2xl font-bold text-ink mb-1">Work experience</h2>
        <p class="text-sm text-muted">Click any card to view details</p>
      </div>

      <!-- View toggle -->
      <div class="flex items-center border border-stroke rounded-lg overflow-hidden">
        <button
          aria-label="Grid view"
          class="p-2 transition-colors {viewMode === 'grid' ? 'bg-ink text-bg' : 'bg-bg text-muted hover:text-ink'}"
          on:click={() => viewMode = 'grid'}
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" rx="1"/>
            <rect x="9" y="1" width="6" height="6" rx="1"/>
            <rect x="1" y="9" width="6" height="6" rx="1"/>
            <rect x="9" y="9" width="6" height="6" rx="1"/>
          </svg>
        </button>
        <button
          aria-label="List view"
          class="p-2 transition-colors {viewMode === 'list' ? 'bg-ink text-bg' : 'bg-bg text-muted hover:text-ink'}"
          on:click={() => viewMode = 'list'}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 16 16">
            <line x1="2" y1="4" x2="14" y2="4"/>
            <line x1="2" y1="8" x2="14" y2="8"/>
            <line x1="2" y1="12" x2="14" y2="12"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- GRID VIEW -->
    {#if viewMode === 'grid'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {#each workExperience as experience (experience.id)}
          <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
          <article
            class="group bg-surface rounded-xl border border-stroke p-6 cursor-pointer transition-all duration-300 hover:border-ink/20 hover:-translate-y-0.5"
            on:click={() => toggleDescription(experience.id)}
            on:keydown={(e) => e.key === 'Enter' && toggleDescription(experience.id)}
            tabindex="0"
            role="button"
            aria-expanded={selectedId === experience.id}
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="shrink-0">
                <img src={experience.logo} alt="{experience.company} logo" class="w-12 h-12 object-contain p-2 bg-bg rounded-lg" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="text-base font-medium text-ink leading-tight">{experience.role}</h3>
                  {#if experience.url}
                    <a href={experience.url} target="_blank" rel="noopener noreferrer"
                      class="px-2 py-1 bg-bg text-accent border border-stroke rounded text-xs hover:border-accent transition-colors shrink-0 ml-2"
                      on:click|stopPropagation>
                      View ↗
                    </a>
                  {/if}
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <p class="text-sm font-semibold text-ink">{experience.company}</p>
                  <span class="text-base" title={experience.location}>{experience.countryFlag}</span>
                </div>
                <p class="text-xs text-muted">{experience.duration}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-4">
              {#each experience.technologies.slice(0, 3) as tech}
                <span class="px-2 py-0.5 text-xs bg-bg text-muted border border-stroke rounded">{tech}</span>
              {/each}
              {#if experience.technologies.length > 3}
                <span class="px-2 py-0.5 text-xs bg-bg text-muted border border-stroke rounded">+{experience.technologies.length - 3}</span>
              {/if}
            </div>

            {#if selectedId === experience.id}
              <div class="mt-4 pt-4 border-t border-stroke animate-slideIn">
                <div class="mb-4">
                  <h4 class="text-xs font-medium text-ink uppercase tracking-widest mb-2">Key achievements</h4>
                  <ul class="space-y-1">
                    {#each experience.achievements as achievement}
                      <li class="text-sm text-muted flex items-start gap-2">
                        <span class="inline-block w-1 h-1 bg-muted rounded-full mt-2 shrink-0"></span>
                        {achievement}
                      </li>
                    {/each}
                  </ul>
                </div>
                <div>
                  <h4 class="text-xs font-medium text-ink uppercase tracking-widest mb-2">Role description</h4>
                  <p class="text-sm text-muted leading-relaxed">{experience.description}</p>
                </div>
                <div class="mt-4">
                  <h4 class="text-xs font-medium text-ink uppercase tracking-widest mb-2">Technologies used</h4>
                  <div class="flex flex-wrap gap-1.5">
                    {#each experience.technologies as tech}
                      <span class="px-2 py-0.5 text-xs bg-bg text-accent border border-stroke rounded">{tech}</span>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}

            <div class="flex items-center justify-center mt-4 pt-3 border-t border-stroke">
              <span class="text-xs text-muted group-hover:text-ink transition-colors">
                {selectedId === experience.id ? 'Click to collapse ↑' : 'Click to expand ↓'}
              </span>
            </div>
          </article>
        {/each}
      </div>

    <!-- LIST VIEW -->
    {:else}
      <div class="divide-y divide-stroke">
        {#each workExperience as experience (experience.id)}
          <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
          <article
            class="group cursor-pointer py-4 hover:bg-surface -mx-4 px-4 rounded-lg transition-colors"
            on:click={() => toggleDescription(experience.id)}
            on:keydown={(e) => e.key === 'Enter' && toggleDescription(experience.id)}
            tabindex="0"
            role="button"
            aria-expanded={selectedId === experience.id}
          >
            <div class="flex items-center gap-4">
              <img src={experience.logo} alt="{experience.company} logo" class="w-10 h-10 object-contain p-1.5 bg-surface rounded-lg shrink-0 border border-stroke" />

              <div class="flex-1 min-w-0 md:flex md:items-center md:gap-6">
                <div class="min-w-0 md:w-56 shrink-0">
                  <p class="text-sm font-medium text-ink truncate">{experience.role}</p>
                  <p class="text-xs text-muted truncate">{experience.company} {experience.countryFlag}</p>
                </div>
                <p class="text-xs text-muted hidden md:block md:w-48 shrink-0">{experience.duration}</p>
                <div class="hidden md:flex flex-wrap gap-1.5 flex-1">
                  {#each experience.technologies.slice(0, 3) as tech}
                    <span class="px-2 py-0.5 text-xs bg-bg text-muted border border-stroke rounded">{tech}</span>
                  {/each}
                  {#if experience.technologies.length > 3}
                    <span class="px-2 py-0.5 text-xs text-muted">+{experience.technologies.length - 3}</span>
                  {/if}
                </div>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                {#if experience.url}
                  <a href={experience.url} target="_blank" rel="noopener noreferrer"
                    class="text-xs text-accent hover:text-accent-hover transition-colors hidden md:block"
                    on:click|stopPropagation>
                    View ↗
                  </a>
                {/if}
                <span class="text-xs text-muted">{selectedId === experience.id ? '↑' : '↓'}</span>
              </div>
            </div>

            {#if selectedId === experience.id}
              <div class="mt-4 pt-4 border-t border-stroke animate-slideIn md:pl-14">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="text-xs font-medium text-ink uppercase tracking-widest mb-2">Key achievements</h4>
                    <ul class="space-y-1">
                      {#each experience.achievements as achievement}
                        <li class="text-sm text-muted flex items-start gap-2">
                          <span class="inline-block w-1 h-1 bg-muted rounded-full mt-2 shrink-0"></span>
                          {achievement}
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <div>
                    <h4 class="text-xs font-medium text-ink uppercase tracking-widest mb-2">Role description</h4>
                    <p class="text-sm text-muted leading-relaxed">{experience.description}</p>
                  </div>
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    {/if}

  </div>
</section>

<style>
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-slideIn { animation: slideIn 0.25s ease-out; }
  article:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
</style>
