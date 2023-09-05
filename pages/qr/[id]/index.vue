<script setup lang="ts">
const localePath = useLocalePath();
const route = useRoute();

navigateTo(localePath("/") + "?show=" + route.params.id);
</script>
