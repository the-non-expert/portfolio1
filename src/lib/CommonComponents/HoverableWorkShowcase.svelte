<script>
  // @ts-nocheck

  export let data = [];
</script>

{#each data as item (item.id)}
  <div
    class="border rounded-lg flex items-center justify-center h-48 bg-white relative group"
  >
    <img
      src={item.image}
      alt={item.description}
      class="w-40 object-cover transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
    />
    <div
      class="absolute text-center text-lg font-medium text-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
    >
      <p class="p-4">
        {item.description}
      </p>
      <a href={item.websiteLink} target="_blank"
        ><button class="px-3 py-1 border-2 border-black rounded-3xl"
          >Visit Website</button
        ></a
      >
    </div>
  </div>
{/each}
