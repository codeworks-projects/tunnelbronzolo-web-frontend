<template>
  <component
    :is="toPath ? NuxtLink : 'div'"
    :to="toPath"
    :class="{
      'record-card': true,
      clickable: true,
      placeholder: data?.isPlaceholder,
    }"
  >
    <div v-if="props.data?.imageUrl || data?.isPlaceholder" class="image-ct">
      <div
        class="image"
        :style="{
          backgroundImage: props.data?.imageUrl
            ? 'url(' + props.data?.imageUrl + ')'
            : undefined,
        }"
      />
    </div>
    <div class="name">{{ props.data?.name }}</div>
    <div v-if="buttonIcon" class="button-ct">
      <Button size="sm" :icon="buttonIcon" :disabled="data?.isPlaceholder" />
    </div>
  </component>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent("nuxt-link");

// Props
const props = withDefaults(
  defineProps<{
    data: ListRecord;
    toPath?: string;
    buttonIcon?: string;
  }>(),
  {
    data: undefined,
    toPath: undefined,
    buttonIcon: undefined,
  }
);
</script>

<style lang="postcss" scoped>
.record-card {
  @apply flex items-center px-3 py-3 gap-3 border-b border-white-contrast select-none;

  & .image-ct {
    @apply flex items-center justify-center;

    & .image {
      @apply w-10 h-10 bg-placeholder bg-cover bg-center rounded-md;
    }
  }

  & .name {
    @apply text-base font-semibold text-primary flex-grow truncate;
  }

  & .button-ct {
    @apply flex items-center justify-center;
  }

  &:hover {
    @apply bg-[#fcfcfc];
  }

  &.placeholder {
    @apply pointer-events-none;

    & .name {
      @apply h-4 bg-placeholder;
    }
  }
}
</style>
