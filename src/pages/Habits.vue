<template>
  <profile-habits />
</template>

<script>
export default {
  components: {
    "profile-habits": require("src/components/Profile/ProfileHabits.vue")
      .default
  }
};
</script>
