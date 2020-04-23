<template>
  <q-page class="flex flex-center">
    <green-grid />
  </q-page>
</template>

<script>
export default {
  components: {
    "green-grid": require("src/components/GreenGrid.vue").default
  }
};
</script>
