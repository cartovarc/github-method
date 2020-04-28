<template>
  <div class="row">
    <template v-if="habitsDownloaded && recordsDownloaded">
      <div
        v-for="(habit, key) in habits"
        v-bind:key="key"
        class="col-12 col-md-6 col-lg-6 q-pl-xs q-pr-xs"
      >
        <habit-card
          @delete="prompToDelete(key)"
          @edit="showEditHabit = true"
          :name="habit.name"
          :id="key"
        />

        <q-dialog v-model="showEditHabit">
          <edit-habit @close="showEditHabit = false" :habit="habit" :id="key" />
        </q-dialog>
      </div>

      <div v-if="totalHabits == 0" class="col-12 q-mb-md">
        <no-habits />
      </div>

      <!--
      <div class="q-pa-lg flex flex-center col-12">
        <q-pagination color="primary" v-model="current" :max="5">
        </q-pagination>
      </div> -->
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
    ...mapState("habits", ["habitsDownloaded", "totalHabits"]),
    ...mapState("records", ["records", "recordsDownloaded"])
  },
  data() {
    return {
      current: 1,
      showEditHabit: false
    };
  },
  methods: {
    ...mapActions("habits", ["deleteHabit"]),
    prompToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteHabit(id);
        });
    }
  },
  components: {
    "habit-card": require("src/components/Profile/HabitCard/HabitCard.vue")
      .default,
    "edit-habit": require("components/Habit/Modals/EditHabit.vue").default,
    "no-habits": require("components/Habit/NoHabits.vue").default
  }
};
</script>
