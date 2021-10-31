import {
  SHOWLOADING,
  HIDELOADING,
  HTTPSHOWLOAD,
  HTTPUNSHOWLOAD
} from "./types";

const state = {
  showLoading: false,
  showShareLoading: false,
  httpLoading: true,
  operationType: {},
  keepAliveList: []
};

const mutations = {
  [SHOWLOADING](state) {
    state.showLoading = true;
  },
  [HIDELOADING](state) {
    state.showLoading = false;
  },
  [HTTPSHOWLOAD](state) {
    state.httpLoading = true;
  },
  [HTTPUNSHOWLOAD](state) {
    state.httpLoading = false;
  },
  setOperationType(state, value) {
    state.operationType = value;
  },
  setKeepAliveList(state, value) {
    state.keepAliveList = value;
  },
  setShareLoading(state, value) {
    state.showShareLoading = value;
  }
};

const getters = {
  showLoading(state) {
    return state.showLoading;
  },
  showShareLoading(state) {
    return state.showShareLoading;
  },
  httpLoading(state) {
    return state.httpLoading;
  },
  getOperationType(state) {
    return state.operationType;
  },
  getKeepAliveList(state) {
    return state.keepAliveList;
  }
};

export default {
  state,
  mutations,
  getters
};
