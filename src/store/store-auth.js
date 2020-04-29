import { firebaseAuth } from "boot/firebase";
import { Loading, LocalStorage } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";

let UsernameGenerator = require("username-generator");

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};

const actions = {
  registerUser({ dispatch }, payload) {
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        dispatch(
          "profile/updateUsername",
          {
            updates: { username: UsernameGenerator.generateUsername() }
          },
          { root: true }
        );
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  loginUser({}, payload) {
    Loading.show();
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        //console.log("Response: ", response);
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChanged({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch(err => {
          //showErrorMessage(err);
        });
        dispatch("habits/fbReadData", null, { root: true });
        dispatch("profile/fbReadData", null, { root: true });
        dispatch("records/fbReadData", null, { root: true });
      } else {
        commit("habits/clearHabits", null, { root: true });
        commit("habits/setHabitsDownloaded", false, { root: true });
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch(err => {
          //showErrorMessage(err);
        });
      }
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
