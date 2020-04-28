<template>
  <div class="flex flex-center q-pa-none" v-if="habitsDownloaded">
    <svg class="squares" width="900" height="200">
      <g v-for="i in 7" v-bind:key="'c' + i">
        <rect
          v-for="j in TOTAL_WEEKS"
          v-bind:key="j"
          :x="(j - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
          :y="(i - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
          :width="BOX_SIZE"
          :height="BOX_SIZE"
          :style="'fill:' + getColor(i - 1, j - 1) + ';opacity:1'"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";
import { blend } from "src/functions/function-blend-colors.js";
import { normalize } from "src/functions/function-normalize.js";

const gray = "#ebedf0";
const white = "#ffffff";
const green_one = "#c6e48b";
const green_two = "#7bc96f";
const green_three = "#196127";

export default {
  props: ["allRecords"],
  computed: {
    ...mapState("habits", ["habitsDownloaded"])
  },
  data() {
    return {
      TOTAL_WEEKS: 52,
      BOX_SIZE: 13, //px
      BOX_GUTTER: 3 //px
    };
  },
  methods: {
    // i, j -> DDD-YYYY
    getDateFromCoords(i, j) {
      let jToday = parseInt(this.TOTAL_WEEKS) - 1;
      let timeStamp = Date.now();
      let iToday = parseInt(date.formatDate(timeStamp, "d"));
      let todayDayOfYear = parseInt(date.formatDate(timeStamp, "DDD"));
      let todayYear = parseInt(date.formatDate(timeStamp, "YYYY"));

      let intermediateColums = 0;
      if (jToday !== j && Math.abs(jToday - j) !== 1) {
        intermediateColums = jToday - j - 1;
      }

      let sameColum = jToday === j;
      let distance = 0;

      if (sameColum) {
        distance = iToday - i;
      } else {
        distance = intermediateColums * 7 + iToday + (7 - i + 1);
      }

      let DDDij = todayDayOfYear - distance;
      let ijYear = todayYear;
      if (distance > todayDayOfYear) {
        ijYear = ijYear - 1;
        DDDij = DDDij + 365;
      }
      return DDDij + "-" + ijYear;
    },

    getColor(i, j) {
      let timeStamp = Date.now();
      let currentYear = parseInt(date.formatDate(timeStamp, "Y"));
      let jToday = parseInt(this.TOTAL_WEEKS) - 1;
      let iToday = parseInt(date.formatDate(timeStamp, "d"));

      // white in future days
      if (i > iToday && j == jToday) {
        return white;
      }

      let DDDYYYY = this.getDateFromCoords(i, j);

      let habitsScores = this.allRecords[DDDYYYY];

      let totalContributions = 0;

      if (habitsScores) {
        for (let [key, score] of Object.entries(habitsScores)) {
          if (score === "good" || score === "excellent") {
            totalContributions++;
          }
        }
      }

      if (totalContributions) {
        return blend("#c6e48b", "#196127", normalize(totalContributions, 5, 0));
      }

      return gray;
    }
  }
};
</script>
<style lang="stylus">
.squares
  overflow: hidden!important
  direction: rtl
</style>
