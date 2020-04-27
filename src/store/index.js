import Vue from "vue";
import Vuex from "vuex";

import habits from "./store-habits";
import profile from "./store-profile";
import auth from "./store-auth";
import records from "./store-records";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      habits,
      profile,
      auth,
      records
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
