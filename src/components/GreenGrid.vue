<template>
  <div
    ref="greengraph"
    class="flex flex-center q-pa-none"
    v-if="habitsDownloaded"
  >
    <svg class="squares" width="850" height="200">
      <g v-for="i in 7" v-bind:key="'c' + i">
        <g v-for="j in TOTAL_WEEKS" v-bind:key="j">
          <rect
            :x="(j - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
            :y="(i - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
            :width="BOX_SIZE"
            :height="BOX_SIZE"
            :style="'fill:' + getColor(i, j) + ';opacity:1'"
          />
          <text
            v-if="debug"
            :x="(j - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
            :y="(i - 1) * (BOX_SIZE + BOX_GUTTER) + 5"
            font-family="Verdana"
            font-size="5"
            fill="blue"
          >
            {{ i }} - {{ j }}
          </text>

          <text
            v-if="debug"
            :x="(j - 1) * (BOX_SIZE + BOX_GUTTER) + 1"
            :y="(i - 1) * (BOX_SIZE + BOX_GUTTER) + 10"
            font-family="Verdana"
            font-size="3"
            fill="blue"
          >
            {{ getDateFromCoords(i, j) }}
          </text>
        </g>
      </g>
    </svg>
    <q-resize-observer @resize="onResize" />
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
const timeStamp = Date.now();

export default {
  computed: {
    ...mapState("habits", ["habitsDownloaded"]),
    ...mapState("records", ["records", "todayRecords"]),
    allRecords() {
      return Object.assign({}, this.records, this.todayRecords);
    },
    iToday() {
      return parseInt(date.formatDate(timeStamp, "d")) + 1;
    },
    jToday() {
      return parseInt(this.TOTAL_WEEKS);
    }
  },
  data() {
    return {
      TOTAL_WEEKS: 52,
      BOX_SIZE: 13, //px
      BOX_GUTTER: 3, //px
      debug: false
    };
  },
  methods: {
    // i, j -> DDD-YYYY
    getDateFromCoords(i, j) {
      let todayDayOfYear = parseInt(date.formatDate(timeStamp, "DDD"));
      let todayYear = parseInt(date.formatDate(timeStamp, "YYYY"));

      let intermediateColums = 0;
      if (Math.abs(this.jToday - j) !== 1 && Math.abs(this.jToday - j) !== 0) {
        intermediateColums = this.jToday - j - 1;
      }

      let sameColum = this.jToday === j;
      let distance = 0;

      if (sameColum) {
        distance = this.iToday - i;
      } else {
        distance = intermediateColums * 7 + this.iToday + (7 - i);
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
      let currentYear = parseInt(date.formatDate(timeStamp, "Y"));
      // white in future days
      if (i > this.iToday && j == this.jToday) {
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
        return blend(
          "#c6e48b",
          "#196127",
          normalize(totalContributions, 5, 0) - 0.2
        );
      }

      return gray;
    },
    onResize(size) {
      let divWidth = size.width;
      this.TOTAL_WEEKS = Math.min(
        parseInt(divWidth / (this.BOX_SIZE + this.BOX_GUTTER)),
        52
      );
    }
  }
};
</script>
<style lang="stylus"></style>
