<script>
  import myImage from "$lib/Images/MyImage.jpeg";
  import MySocialMediaDetails from "./CommonComponents/MySocialMediaDetails.svelte";

  import { onMount } from "svelte";

  /**
   * @type {string}
   */
  let currentTime;

  // Function to update the current time
  function updateTime() {
    currentTime = new Date().toLocaleTimeString();
  }

  // onMount is used to start the time update when the component is mounted
  onMount(() => {
    updateTime(); // Update time immediately
    const interval = setInterval(updateTime, 1000); // Update time every second

    // Cleanup interval on component destroy
    return () => clearInterval(interval);
  });
</script>

<div class="md:w-full md:flex md:items-center md:p-20 md:px-32 p-5">
  <div class="md:w-6/12 md:flex md:flex-col">
    <img
      src={myImage}
      alt="MyImage"
      class="w-12 h-12 object-cover rounded-full"
    />
    <p class="md:text-6xl text-5xl mt-10 font-light md:w-10/12">
      Hello! I'm Ayush Jhunjhunwala
    </p>

    <div class="flex gap-8 items-center mt-5">
      <MySocialMediaDetails />

      <div class="flex flex-col justify-center">
        <p class="font-extralight">Cuttack, India</p>
        <p>{currentTime}</p>
      </div>
    </div>
  </div>
  <div class="md:w-6/12">
    <p class="md:text-4xl text-xl mt-5 md:m-0">
      A Svelte-Kit Developer based out of Cuttack, India
    </p>
    <p class="mt-4 text-gray-500">Passionate to create digital solutions</p>

    <div class="flex gap-4">
      <a href="/contact"
        ><button class="bg-black text-white px-4 py-2 rounded-xl mt-10"
          >Talk with Me</button
        ></a
      >
      <a href="/myworks"
        ><button class="bg-white text-black border-2 px-4 py-2 rounded-xl mt-10"
          >See My Work</button
        ></a
      >
    </div>
  </div>
</div>
