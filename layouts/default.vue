<template>
  <div>
    <slot />
    <NotificationCenter />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const countVisit = async () => {
  await useFetch(config.public.PUBLIC_VISIT_COUNT_API_HTTP_ENDPOINT, {
    method: "post",
    body: {
      data: {
        t: "8hf7egd7dss",
      },
    },
  });
};

countVisit();
</script>
