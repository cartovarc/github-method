import Vue from "vue";
import { uid, Notify } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  habits: {},
  totalHabits: 0,
  habitsDownloaded: false
};

const mutations = {
  setHabitsDownloaded(state, value) {
    state.habitsDownloaded = value;
  },
  addHabit(state, payload) {
    Vue.set(state.habits, payload.id, payload.habit);
    state.totalHabits = state.totalHabits + 1;
  },
  updateHabit(state, payload) {
    Object.assign(state.habits[payload.id], payload.updates);
  },
  deleteHabit(state, id) {
    Vue.delete(state.habits, id);
    state.totalHabits = state.totalHabits - 1;
  },
  clearHabits(state) {
    state.habits = {};
  }
};

const actions = {
  setHabitsDownloaded({ commit }, value) {
    commit("setHabitsDownloaded", value);
  },
  fbReadData({ commit }) {
    let uid = firebaseAuth.currentUser.uid;
    let userHabits = firebaseDb.ref("habits/" + uid);

    // check initial data
    userHabits.once(
      "value",
      snapshot => {
        commit("setHabitsDownloaded", true);
      },
      error => {
        showErrorMessage(error.message);
      }
    );

    // child added
    userHabits.on("child_added", snapshot => {
      let habit = snapshot.val();
      let payload = {
        id: snapshot.key,
        habit: habit
      };
      commit("addHabit", payload);
    });

    // child changed
    userHabits.on("child_changed", snapshot => {
      let habit = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: habit
      };
      commit("updateHabit", payload);
    });

    // child removed
    userHabits.on("child_removed", snapshot => {
      let habitId = snapshot.key;
      commit("deleteHabit", habitId);
      Notify.create("Habit deleted");
    });
  },

  updateHabit({ dispatch }, payload) {
    dispatch("fbUpdateHabit", payload);
  },

  fbUpdateHabit({}, payload) {
    let uid = firebaseAuth.currentUser.uid;
    let habitRef = firebaseDb.ref("habits/" + uid + "/" + payload.id);
    habitRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        let keys = Object.keys(payload.updates);
        if (!(keys.includes("ignore_atribute_example") && keys.length == 1)) {
          Notify.create("Habit updated");
        }
      }
    });
  },
  addHabit({ dispatch }, habit) {
    let id = uid();
    let payload = {
      id: id,
      habit: habit
    };
    dispatch("fbAddHabit", payload);
  },
  fbAddHabit({}, payload) {
    let uid = firebaseAuth.currentUser.uid;
    let habitRef = firebaseDb.ref("habits/" + uid + "/" + payload.id);
    habitRef.set(payload.habit, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create("Habit added");
      }
    });
  },

  deleteHabit({ dispatch }, id) {
    dispatch("fbDeleteHabit", id);
  },

  fbDeleteHabit({}, habitId) {
    let uid = firebaseAuth.currentUser.uid;
    let habitRef = firebaseDb.ref("habits/" + uid + "/" + habitId);
    habitRef.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      }
    });
  }
};

const getters = {
  habits: state => {
    return state.habits;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
