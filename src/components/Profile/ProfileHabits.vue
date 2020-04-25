<template>
  <div class="row">
    <div
      v-for="card in 2"
      v-bind:key="card"
      class="col-12 col-md-6 col-lg-6 q-pl-xs q-pr-xs"
    >
      <habit-card name="Sleep Early" description="at 10 pm" />
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination color="primary" v-model="current" :max="5"> </q-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1
    };
  },
  components: {
    "habit-card": require("src/components/Profile/HabitCard.vue").default
  }
};
</script>
