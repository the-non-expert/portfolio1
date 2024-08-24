<script>
  import instagram from "$lib/Images/instagram.svg";
  import whatsapp from "$lib/Images/whatsapp.svg";
  import gmail from "$lib/Images/gmail.svg";
  import npmIcon from "$lib/Images/npmIcon.svg";
  import github from "$lib/Images/github.svg";
</script>

<div class=" flex gap-3">
  <a href="https://www.instagram.com/ayush_jhunjhunwala/" target="_blank">
    <img
      src={instagram}
      alt="instagram"
      class="w-10 h-10 object-contain border-2 p-2 rounded-xl"
    /></a
  >
  <!-- <a href="https://wa.me/7978284945" target="_blank">
    <img
      src={gmail}
      alt="gmail"
      class="w-10 h-10 object-contain border-2 p-2 rounded-xl"
    /></a
  > -->
  <a
    href="https://www.npmjs.com/settings/ayushjhunjhunwala/packages"
    target="_blank"
  >
    <img
      src={npmIcon}
      alt="npmIcon"
      class="w-10 h-10 object-contain border-2 p-2 rounded-xl"
    /></a
  >
  <a href="https://github.com/the-non-expert" target="_blank">
    <img
      src={github}
      alt="github"
      class="w-10 h-10 object-contain border-2 p-2 rounded-xl"
    /></a
  >
</div>
