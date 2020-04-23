<template>
  <q-page class="flex column">
    <div id="parent" class="row" style="width: 100%; padding: 24px;">
      <div
        class="col-md-3 col-xs-12"
        style="overflow: auto; max-height: 100%; "
      >
        <div class="q-pa-md flex flex-center">
          <q-card class="my-card">
            <q-img
              src="https://avatars1.githubusercontent.com/u/26529546?s=460&u=7d9794f9b38aef28063e43bb92a70076eefbc5ae&v=4"
              :ratio="1"
            />
            <q-card-section>
              <div class="text-h6">Carlos Tovar</div>
              <div class="text-subtitle2">cartovarc</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-btn
                class="full-width"
                color="white"
                text-color="black"
                label="Follow"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      ,
      <div class="col-md-8 col-sm-12" style="overflow: auto;min-height: 500px;">
        <q-tabs align="left" v-model="tab" class="primary">
          <q-tab name="mails" label="Habits (5)"> </q-tab>
          <q-tab name="alarms" label="Followers (6)"> </q-tab>
          <q-tab name="movies" label="Following (7)"> </q-tab>
        </q-tabs>
        <q-separator class="q-mb-md" />

        <template>
          <div class="q-pa-md row items-start q-gutter-md">
            <div class="row">
              <div
                v-for="card in 5"
                :key="card"
                class="col-12 col-md-6 col-lg-6 q-mb-sm q-pl-xs q-pr-xs"
              >
                <q-card flat bordered class="habit-card bg-grey-1 q-mb-sm">
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h6">Hacer ejercicio</div>
                        <div class="text-subtitle2">
                          Minimo 30 minutos al dia
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
              </div>
            </div>
          </div>
        </template>

        <q-list class="q-mt-md">
          <q-separator />
          <q-item-label header>Followers</q-item-label>

          <q-item
            v-for="contact in followers"
            :key="contact.id"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                class="full-width"
                color="white"
                text-color="black"
                label="Follow"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-mt-md">
          <q-separator />
          <q-item-label header>Following</q-item-label>

          <q-item
            v-for="contact in followers"
            :key="contact.id"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                class="full-width"
                color="white"
                text-color="black"
                label="Follow"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <green-grid />
      </div>
    </div>
  </q-page>
</template>

<script>
const followers = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg"
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    email: "wstapforth5@pcworld.com",
    avatar: "avatar6.jpg"
  }
];

export default {
  data() {
    return {
      tab: "mails",
      followers,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  components: {
    "green-grid": require("src/components/GreenGrid.vue").default
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px

.habit-card
  width: 100%
</style>
