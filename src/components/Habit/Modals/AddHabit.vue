<template>
  <q-card>
    <modal-header>Add habit</modal-header>
    <q-form @submit="submitForm()">
      <q-card-section class="q-pt-none">
        <modal-habit-name
          ref="modalHabitName"
          :name.sync="habitToSubmit.name"
        />
      </q-card-section>
      <modal-buttons></modal-buttons>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import addEditHabitMixin from "src/mixins/mixin-add-edit-habit.js";

export default {
  mixins: [addEditHabitMixin],
  data() {
    return {
      habitToSubmit: {
        name: ""
      }
    };
  },
  methods: {
    ...mapActions("habits", ["addHabit"]),
    submitForm() {
      this.$refs.modalHabitName.$refs.habitName.validate();
      if (!this.$refs.modalHabitName.$refs.habitName.hasError) {
        this.submitHabit();
      }
    },
    submitHabit() {
      this.addHabit(this.habitToSubmit);
      this.$emit("close");
    }
  }
};
</script>
