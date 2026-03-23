<script lang="ts">
  import { serviceAreas, overallStats } from "$lib/data/services.js";
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  type ServiceId = 'frontend' | 'backend' | 'leadership';

  let openPanel: ServiceId = 'frontend';

  const services = Object.values(serviceAreas) as any[];

  const ordinals: Record<string, string> = {
    frontend: '01',
    backend: '02',
    leadership: '03',
  };

  const keyMetrics: Record<string, { value: string; label: string }> = {
    frontend: { value: '15+', label: 'projects' },
    backend: { value: '99.9%', label: 'uptime' },
    leadership: { value: '80', label: 'people led' },
  };

  const techTags: Record<string, string[]> = {
    frontend: ['SvelteKit', 'TypeScript', 'React'],
    backend: ['FastAPI', 'PostgreSQL', 'AWS'],
    leadership: ['Strategy', 'Architecture', 'Teams'],
  };

  function camelCaseToLabel(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (s) => s.toUpperCase());
  }

  function toggle(id: string) {
    openPanel = id as ServiceId;
  }
</script>

<section class="w-full bg-cream py-16 md:px-32 px-6">
  <div class="max-w-5xl mx-auto">

    {#each services as service, i}
      {@const id = service.id}
      {@const isOpen = openPanel === id}

      <div class="border-t border-ink/10">
        <!-- Row header — always visible -->
        <button
          class="w-full py-8 flex items-center gap-5 md:gap-8 group text-left cursor-pointer"
          on:click={() => toggle(id)}
          aria-expanded={isOpen}
          aria-controls="panel-{id}"
          id="heading-{id}"
        >
          <!-- Ordinal -->
          <span class="font-display text-4xl md:text-5xl font-bold w-14 md:w-16 shrink-0 transition-colors duration-300 select-none {isOpen ? 'text-accent' : 'text-ink/20'}">
            {ordinals[id]}
          </span>

          <!-- Title + tech tags -->
          <div class="flex-1 min-w-0">
            <h3 class="text-xl md:text-2xl font-semibold transition-colors duration-300 mb-2 {isOpen ? 'text-accent' : 'text-ink'}">
              {service.title}
            </h3>
            <div class="flex flex-wrap gap-1.5">
              {#each techTags[id] as tag}
                <span class="text-[11px] text-ink/40 font-mono px-2 py-0.5 border border-ink/10 rounded">
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <!-- Key metric — desktop only -->
          <div class="text-right shrink-0 hidden md:block mr-4">
            <div class="font-display text-4xl font-bold text-ink">
              {keyMetrics[id].value}
            </div>
            <div class="text-[10px] text-ink/40 uppercase tracking-widest mt-1">
              {keyMetrics[id].label}
            </div>
          </div>

          <!-- Chevron -->
          <svg
            class="w-4 h-4 text-ink/30 shrink-0 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Expanded panel -->
        {#if isOpen}
          <div
            id="panel-{id}"
            role="region"
            aria-labelledby="heading-{id}"
            transition:slide={{ duration: 300, easing: quintOut }}
          >
            <div class="pb-12 md:pl-[88px] grid md:grid-cols-2 gap-8 md:gap-12">

              <!-- Left: description + stats + skills -->
              <div class="space-y-6">
                <p class="text-ink/60 leading-relaxed text-sm">
                  {service.description}
                </p>

                <div class="grid grid-cols-2 gap-3">
                  {#each Object.entries(service.stats) as [key, value]}
                    <div class="bg-white border border-ink/8 rounded-xl p-4">
                      <div class="font-display text-2xl font-bold text-ink">{value}</div>
                      <div class="text-[11px] text-ink/40 mt-1">{camelCaseToLabel(key)}</div>
                    </div>
                  {/each}
                </div>

                <div>
                  <p class="text-[10px] uppercase tracking-widest text-ink/30 mb-3">Skills</p>
                  <div class="flex flex-wrap gap-2">
                    {#each service.skills as skill}
                      <span class="text-xs text-ink/70 font-mono px-2.5 py-1 bg-white border border-ink/10 rounded-full">
                        {skill}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Right: projects -->
              <div>
                <p class="text-[10px] uppercase tracking-widest text-ink/30 mb-4">Featured Work</p>
                <div class="space-y-3">
                  {#each service.projects as project}
                    <div class="bg-white border border-ink/8 rounded-xl p-5 hover:border-accent/40 transition-colors duration-200">
                      <div class="flex items-start justify-between mb-2">
                        <h5 class="font-semibold text-ink text-sm">{project.name}</h5>
                        {#if project.url}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-accent hover:text-accent-dark text-xs shrink-0 ml-3 transition-colors duration-200"
                          >
                            View ↗
                          </a>
                        {/if}
                      </div>
                      <p class="text-[12px] text-ink/50 mb-3 leading-relaxed">{project.description}</p>
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex flex-wrap gap-1">
                          {#each project.technologies as tech}
                            <span class="text-[10px] text-ink/40 font-mono px-1.5 py-0.5 bg-cream rounded">
                              {tech}
                            </span>
                          {/each}
                        </div>
                        <span class="text-[11px] font-medium text-accent shrink-0">{project.impact}</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

            </div>
          </div>
        {/if}
      </div>
    {/each}

    <div class="border-t border-ink/10"></div>

    <!-- Overall stats -->
    <div class="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
      {#each Object.entries(overallStats) as [key, value]}
        <div>
          <div class="font-display text-3xl font-bold text-ink">{value}</div>
          <div class="text-[10px] text-ink/40 mt-1.5 uppercase tracking-wider">{camelCaseToLabel(key)}</div>
        </div>
      {/each}
    </div>

  </div>
</section>
