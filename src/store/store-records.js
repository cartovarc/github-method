import Vue from "vue";
import { uid, Notify } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  records: {},
  recordsDownloaded: false
};

const mutations = {
  setRecordsDownloaded(state, value) {
    state.recordsDownloaded = value;
  },
  addRecord(state, payload) {
    Vue.set(state.records, payload.id, payload.habitRecords);
  },
  updateRecord(state, payload) {
    Object.assign(state.records[payload.id], payload.updates);
  }
};

const actions = {
  setRecordsDownloaded({ commit }, value) {
    commit("setRecordsDownloaded", value);
  },
  fbReadData({ commit }) {
    let uid = firebaseAuth.currentUser.uid;
    let userRecords = firebaseDb.ref("records/" + uid);

    // check initial data
    userRecords.once(
      "value",
      snapshot => {
        commit("setRecordsDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
      }
    );

    // child added
    userRecords.on("child_added", snapshot => {
      let habitRecords = snapshot.val();
      let payload = {
        id: snapshot.key,
        habitRecords: habitRecords
      };
      commit("addRecord", payload);
    });

    // child changed
    userRecords.on("child_changed", snapshot => {
      let habitRecords = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: habitRecords
      };
      commit("updateRecord", payload);
    });
  },

  updateRecord({ dispatch }, payload) {
    dispatch("fbUpdateRecord", payload);
  },

  fbUpdateRecord({}, payload) {
    let uid = firebaseAuth.currentUser.uid;
    let score = payload.score;
    let recordRef = firebaseDb.ref("records/" + uid + "/" + payload.habitId);
    recordRef.update({ "04-26-2020": score }, error => {
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
