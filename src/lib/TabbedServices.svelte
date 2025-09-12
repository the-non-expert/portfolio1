<script>
  // @ts-nocheck
  import { serviceAreas, overallStats } from "$lib/data/services.js";
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // Active tab state
  let activeTab = 'frontend';

  // Get service areas as array
  const services = Object.values(serviceAreas);
  
  // Tab switching function
  function switchTab(tabId) {
    activeTab = tabId;
  }
  
  // Get active service data
  $: activeService = serviceAreas[activeTab];
</script>

<section class="w-full bg-white py-10 md:px-32 px-4">
  <!-- Section Header -->
  <!-- <header class="text-center mb-16">
    <h2 class="text-4xl md:text-5xl font-light mb-6 text-gray-900">
      My Full-Stack Journey
    </h2>
    <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      From simple websites to production-grade systems - explore my evolution as a developer, 
      technical leader, and interim COO across frontend, backend, and leadership domains.
    </p>
  </header> -->

  <!-- Tab Navigation -->
  <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
  <nav class="flex justify-center mb-12" role="tablist" aria-label="Service areas">
    <div class="flex bg-gray-50 rounded-xl p-2 shadow-sm">
      {#each services as service (service.id)}
        <button
          class="relative px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          class:active={activeTab === service.id}
          on:click={() => switchTab(service.id)}
          role="tab"
          aria-selected={activeTab === service.id}
          aria-controls="panel-{service.id}"
          tabindex={activeTab === service.id ? 0 : -1}
        >
          <span class="relative z-10" class:active-text={activeTab === service.id}>
            {service.title}
          </span>
          
          <!-- Active indicator -->
          {#if activeTab === service.id}
            <div 
              class="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-200"
              transition:slide={{ duration: 300, easing: quintOut }}
            ></div>
          {/if}
        </button>
      {/each}
    </div>
  </nav>

  <!-- Content Area -->
  <div class="max-w-6xl mx-auto">
    {#key activeTab}
      <div 
        id="panel-{activeService.id}"
        class="grid md:grid-cols-2 gap-12 items-start"
        role="tabpanel"
        aria-labelledby="tab-{activeService.id}"
        transition:fade={{ duration: 200, easing: quintOut }}
      >
        <!-- Left Column: Overview -->
        <div class="space-y-6">
          <div class="flex items-center gap-4 mb-6">
            <img 
              src={activeService.icon} 
              alt="{activeService.title} icon"
              class="w-16 h-16 object-contain p-3 bg-gray-50 rounded-xl"
            />
            <div>
              <h3 class="text-3xl font-semibold text-gray-900 mb-2">
                {activeService.title}
              </h3>
              <p class="text-lg text-gray-600">{activeService.subtitle}</p>
            </div>
          </div>

          <p class="text-gray-600 leading-relaxed text-base">
            {activeService.description}
          </p>

          <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              My Journey
            </h4>
            <p class="text-gray-700 text-sm leading-relaxed">{activeService.journey}</p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            {#each Object.entries(activeService.stats) as [key, value]}
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                <div class="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Right Column: Skills & Projects -->
        <div class="space-y-8">
          <!-- Skills Section -->
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Core Skills</h4>
            <div class="flex flex-wrap gap-2">
              {#each activeService.skills as skill}
                <span class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
                  {skill}
                </span>
              {/each}
            </div>
          </div>

          <!-- Technologies -->
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Technologies</h4>
            <div class="flex flex-wrap gap-2">
              {#each activeService.technologies as tech}
                <span class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors cursor-default">
                  {tech}
                </span>
              {/each}
            </div>
          </div>

          <!-- Featured Projects -->
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Featured Projects</h4>
            <div class="space-y-4">
              {#each activeService.projects as project}
                <div 
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                  class:featured={project.emphasis === 'primary'}
                >
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <h5 class="font-medium text-gray-900">{project.name}</h5>
                      {#if project.url}
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          title="View live project"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      {/if}
                    </div>
                    <div class="flex items-center gap-2">
                      {#if project.emphasis === 'primary'}
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                          Featured
                        </span>
                      {/if}
                      {#if project.url}
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          View Live
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      {/if}
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                      {#each project.technologies as tech}
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {tech}
                        </span>
                      {/each}
                    </div>
                    <span class="text-sm font-medium text-blue-600">{project.impact}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/key}
  </div>

  <!-- Overall Stats Section -->
  <div class="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12">
    <h3 class="text-2xl font-semibold text-center text-gray-900 mb-8">
      Overall Experience
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {#each Object.entries(overallStats) as [key, value]}
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-900 mb-2">{value}</div>
          <div class="text-sm text-gray-600 capitalize">
            {key.replace(/([A-Z])/g, ' $1').replace(/([a-z])([A-Z])/g, '$1 $2').trim()}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Tab styles */
  button {
    position: relative;
    z-index: 1;
  }
  
  button.active {
    color: #1f2937;
  }
  
  .active-text {
    color: #1f2937;
  }
  
  /* Featured project styling */
  .featured {
    border-color: #3b82f6;
    background-color: #eff6ff;
  }
  
  /* Smooth transitions */
  * {
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Focus styles for accessibility */
  button:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* Hover animations */
  .hover\:shadow-md:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .hover\:-translate-y-0\.5:hover {
    transform: translateY(-0.125rem);
  }
</style>