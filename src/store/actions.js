import * as types from "./types";

export default {
  showloader: ({ commit }) => {
    commit(types.SHOWLOADING);
  },
  hideloader: ({ commit }) => {
    commit(types.HIDELOADING);
  },
  httpShowLoad: ({ commit }) => {
    commit(types.HTTPSHOWLOAD);
  },
  httpHideLoad: ({ commit }) => {
    commit(types.HTTPUNSHOWLOAD);
  }
};
