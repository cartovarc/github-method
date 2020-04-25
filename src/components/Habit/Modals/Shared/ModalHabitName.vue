<template>
  <div class="q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      clearable
      clear-icon="close"
      ref="habitName"
      label="Habit name"
    />
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all.js";
export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>
