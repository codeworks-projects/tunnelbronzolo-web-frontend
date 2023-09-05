<template>
  <img :src="src" />
  <!--
    TODO: nuxt img has been disabled due to an issue while compiling the project with NixOS and should be re-enabled once the compilation issue is fixed
    <nuxt-img
    :src="src"
    sizes="sm:100vh lg:2560px"
    format="webp"
    quality="80"
    loading="lazy"
  />-->
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
  }>(),
  {
    src: undefined,
  }
);
</script>
