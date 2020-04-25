export default {
  methods: {
    submitForm() {
      this.$refs.modalHabitName.$refs.habitName.validate();
      if (!this.$refs.modalHabitName.$refs.habitName.hasError) {
        this.submitHabit();
      }
    }
  },
  components: {
    "modal-header": require("components/Habit/Modals/Shared/ModalHeader.vue")
      .default,
    "modal-habit-name": require("components/Habit/Modals/Shared/ModalHabitName.vue")
      .default,
    "modal-buttons": require("components/Habit/Modals/Shared/ModalButtons.vue")
      .default
  }
};
