<template>
  <q-card>
    <modal-header>Edit habit</modal-header>
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
  props: ["habit", "id"],
  data() {
    return {
      habitToSubmit: {}
    };
  },
  methods: {
    ...mapActions("habits", ["updateHabit"]),
    submitHabit() {
      this.updateHabit({
        id: this.id,
        updates: this.habitToSubmit
      });
      this.$emit("close");
    }
  },
  mounted() {
    this.habitToSubmit = Object.assign({}, this.habit);
  }
};
</script>
