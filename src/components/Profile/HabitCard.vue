<template>
  <q-card flat bordered class="habit-card bg-grey-1 q-mb-sm">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ name }}</div>
          <div class="text-subtitle2">
            {{ description }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Editar</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Borrar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn class="full-width" flat>¿?</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["name", "description"]
};
</script>

<style lang="sass" scoped>
.habit-card
  width: 100%
</style>
