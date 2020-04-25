<template>
  <q-card flat bordered class="habit-card q-mb-sm">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col-7">
          <div class="text-subtitle1">{{ name }}</div>
          <div class="text-subtitle2">
            How did you handle your habit today?
          </div>
        </div>

        <div class="col-4 text-right">
          <bar-graph />
        </div>

        <div class="col-1">
          <q-space />
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section> Edit </q-item-section>
                </q-item>
                <q-item clickable @click="$emit('delete')">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="q-gutter-sm">
        <q-radio
          keep-color
          v-model="color"
          val="bad"
          label="Bad"
          color="grey"
        />
        <q-radio
          keep-color
          v-model="color"
          val="good"
          label="Good"
          color="green"
        />
        <q-radio
          keep-color
          v-model="color"
          val="excellent"
          label="Excellent"
          color="green-10"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["name", "id"],
  data() {
    return {
      color: "bad"
    };
  },
  components: {
    "bar-graph": require("src/components/Profile/HabitCard/BarGraph").default
  }
};
</script>

<style lang="sass" scoped>
.habit-card
  width: 100%
</style>
