<script>
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
</script>

<div class="w-full md:p-20 py-10 md:px-40 p-4">
  <p class="text-6xl">
    Starting a new project? Get in touch and let's talk all about it
  </p>
  <p class="text-gray-400 mt-5">
    Call, email, meet or video call - however you'd prefer to work i would love
    to hear from you
  </p>

  <MySocialMediaDetails />
</div>

<div
  class="bg-[#F4F5F1] md:p-20 p-4 w-full flex md:flex-row flex-col justify-center gap-10"
>
  <div class="bg-white p-5 md:w-4/12 md:h-fit w-full rounded-xl">
    <p class="text-3xl font-semibold">Free 30 mins Consultation</p>
    <p class="mt-5">
      Have a new project in mind? Schedule a 30-minute discovery call and please
      fill out the quick form, and together we'll explore the possibilities
    </p>
  </div>
  <div class="bg-white p-5 md:w-4/12 w-full rounded-xl">
    <div class="flex flex-col gap-2">
      <p class="font-semibold">Full Name</p>
      <input
        type="text"
        placeholder="Virat Kohli"
        class="bg-[#F4F5F1] p-2 w-full rounded-xl"
      />
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <p class="font-semibold">Email</p>
      <input
        type="email"
        placeholder="viratkohli@gmail.com"
        class="bg-[#F4F5F1] p-2 w-full rounded-xl"
      />
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <p class="font-semibold">Estimated Budget</p>
      <select class="bg-[#F4F5F1] p-2 w-full rounded-xl">
        <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
        <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
        <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
        <option value="₹30,000+">₹30,000+</option>
      </select>
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <p class="font-semibold">Description</p>
      <textarea
        placeholder="a few words..."
        class="bg-[#F4F5F1] p-2 w-full rounded-xl"
      />
    </div>
    <button class="bg-black text-white px-4 py-2 rounded-xl mt-10"
      >Send Message</button
    >
  </div>
</div>
