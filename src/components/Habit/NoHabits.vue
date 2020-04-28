<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="sentiment_very_dissatisfied" color="primary" />
      </template>
      You have no habits
    </q-banner>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.my-banner {
  background-color: #cb2431;
}
</style>
