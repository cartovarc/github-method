<template>
  <div class="flex flex-center q-pa-none" v-if="habitsDownloaded">
    <svg class="squares" width="900" height="200">
      <g v-for="j in 7" v-bind:key="'c' + j">
        <rect
          v-for="i in 54"
          v-bind:key="i"
          :x="(i - 1) * 20 + 1"
          :y="(j - 1) * 20 + 1"
          width="15"
          height="15"
          :style="'fill:' + randomColor() + ';opacity:1'"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("habits", ["habitsDownloaded"])
  },
  methods: {
    randomColor() {
      const level = Math.floor(Math.random() * 4);
      if (level == 0) {
        return "#c6e48b";
      } else if (level == 1) {
        return "#7bc96f";
      } else if (level == 2) {
        return "#196127";
      } else {
        return "#ebedf0";
      }
    }
  }
};
</script>
<style lang="stylus">
.squares
  overflow: hidden!important
  direction: rtl
</style>
