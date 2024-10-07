<script>
    import { fly} from "svelte/transition";
    import { page } from "$app/stores";
		import { quadOut } from "svelte/easing";
</script>

{#key $page.url}
  <div in:fly={{  x:'-10%', duration: 500, easing: quadOut }}>
    <slot  />
  </div>
{/key}