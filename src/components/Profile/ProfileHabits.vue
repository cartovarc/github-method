<template>
  <div class="row">
    <template v-if="habitsDownloaded">
      <div
        v-for="habit in habits"
        v-bind:key="habit.id"
        class="col-12 col-md-6 col-lg-6 q-pl-xs q-pr-xs"
      >
        <habit-card :name="habit.name" />
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination color="primary" v-model="current" :max="5">
        </q-pagination>
      </div>
    </template>

    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
      </span>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("habits", ["habits"]),
    ...mapState("habits", ["habitsDownloaded"])
  },
  data() {
    return {
      current: 1
    };
  },
  methods: {
    ...mapActions("habits", ["testGetData"])
  },
  components: {
    "habit-card": require("src/components/Profile/HabitCard/HabitCard.vue")
      .default
  },
  mounted() {
    console.log("HELOO");
    this.testGetData();
  }
};
</script>
