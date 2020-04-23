<template>
  <div class="graph">
    <ul class="months">
      <div>Jan</div>
      <div>Feb</div>
      <div>Mar</div>
      <div>Apr</div>
      <div>May</div>
      <div>Jun</div>
      <div>Jul</div>
      <div>Aug</div>
      <div>Sep</div>
      <div>Oct</div>
      <div>Nov</div>
      <div>Dec</div>
    </ul>
    <ul class="days">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </ul>
    <ul class="squares">
      <!-- added via javascript -->
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    // Add squares

    const squares = document.querySelector(".squares");
    for (var i = 1; i < 365; i++) {
      const level = Math.floor(Math.random() * 3);
      squares.insertAdjacentHTML(
        "beforeend",
        `<div data-level="${level}"></div>`
      );
    }
  }
};
</script>

<style>
/* Article - https://bitsofco.de/github-contribution-graph-css-grid/ */

/* Grid-related CSS */

:root {
  --square-size: 12px;
  --square-gap: 5px;
  --week-width: calc(var(--square-size) + var(--square-gap));
}

.months {
  grid-area: months;
}
.days {
  grid-area: days;
}
.squares {
  grid-area: squares;
}

.graph {
  display: inline-grid;
  grid-template-areas:
    "empty months"
    "days squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
}

.months {
  display: grid;
  margin: 0px;
  grid-template-columns:
    calc(var(--week-width) * 4) /* Jan */
    calc(var(--week-width) * 4) /* Feb */
    calc(var(--week-width) * 4) /* Mar */
    calc(var(--week-width) * 5) /* Apr */
    calc(var(--week-width) * 4) /* May */
    calc(var(--week-width) * 4) /* Jun */
    calc(var(--week-width) * 5) /* Jul */
    calc(var(--week-width) * 4) /* Aug */
    calc(var(--week-width) * 4) /* Sep */
    calc(var(--week-width) * 5) /* Oct */
    calc(var(--week-width) * 4) /* Nov */
    calc(var(--week-width) * 5) /* Dec */;
}

.days,
.squares {
  margin: 0px;
  padding: 0px;
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
}

.squares {
  grid-auto-flow: column;
}

/* Other styling */

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 12px;
}

.graph {
  padding: 20px;
  border: 1px #e1e4e8 solid;
}

.days div:nth-child(odd) {
  visibility: hidden;
}

.squares div {
  background-color: #ebedf0;
}

.squares div[data-level="1"] {
  background-color: #c6e48b;
}

.squares div[data-level="2"] {
  background-color: #7bc96f;
}

.squares div[data-level="3"] {
  background-color: #196127;
}
</style>
