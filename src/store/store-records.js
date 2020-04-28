import Vue from "vue";
import { date, Notify } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  records: {},
  todayRecords: {},
  recordsDownloaded: false
};

const mutations = {
  setRecordsDownloaded(state, value) {
    state.recordsDownloaded = value;
  },
  addRecord(state, payload) {
    Vue.set(state.records, payload.id, payload.updates);
  },
  addTodayRecord(state, payload) {
    Vue.set(state.todayRecords, payload.id, payload.updates);
  },
  updateRecord(state, payload) {
    Object.assign(state.records[payload.id], payload.updates);
  },
  updateTodayRecord(state, payload) {
    Object.assign(state.todayRecords, payload);
  }
};

const actions = {
  setRecordsDownloaded({ commit }, value) {
    commit("setRecordsDownloaded", value);
  },
  fbReadData({ commit }) {
    let uid = firebaseAuth.currentUser.uid;
    let allRecordsRef = firebaseDb.ref("records/" + uid);

    let timeStamp = Date.now();
    let today = date.formatDate(timeStamp, "DDD-YYYY");
    let todayRecordsRef = firebaseDb.ref("records/" + uid + "/" + today);

    // check initial data
    allRecordsRef.once(
      "value",
      snapshot => {
        commit("setRecordsDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
      }
    );

    // allRecordsRef
    // child added
    allRecordsRef.on("child_added", snapshot => {
      let updates = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: updates
      };
      commit("addRecord", payload);
    });
    // child changed
    allRecordsRef.on("child_changed", snapshot => {
      console.log("val");
      console.log(snapshot.val());
      console.log("key");
      console.log(snapshot.key);
      let daysRecords = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: daysRecords
      };
      commit("updateRecord", payload);
    });

    // todayRecordsRef
    // child added
    todayRecordsRef.on("child_added", snapshot => {
      let updates = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: updates
      };
      commit("addTodayRecord", payload);
    });
    // child changed
    todayRecordsRef.on("child_changed", snapshot => {
      let updates = snapshot.val();
      let payload = {};
      payload[snapshot.key] = updates;
      commit("updateTodayRecord", payload);
    });
  },

  updateRecord({ dispatch }, payload) {
    dispatch("fbUpdateRecord", payload);
  },

  fbUpdateRecord({}, payload) {
    let uid = firebaseAuth.currentUser.uid;
    let score = payload.score;
    let timeStamp = Date.now();
    let today = date.formatDate(timeStamp, "DDD-YYYY");
    let recordRef = firebaseDb.ref("records/" + uid + "/" + today);
    let aux = {};
    aux[payload.habitId] = score;
    recordRef.update(aux, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Habit score updated");
      }
    });
  }
};

const getters = {
  records: state => {
    return state.records;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
