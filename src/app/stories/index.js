import { handleActions, combineActions, createActions } from "redux-actions";
import { takeEvery } from "redux-saga/effects";

import { LOCATION_CHANGE } from "connected-react-router";

import { uniq, identity, merge, property as prop } from "lodash-es";
import { listToHash } from "../utils";

import {
  fetchStoryRoutine,
  fetchStorySaga,
  fetchStoriesRoutine,
  fetchStoriesSaga,
  createStoryRoutine,
  createStorySaga,
} from "./saga-routines";

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  listStoriesIds: [],
  isListFetching: false,
  isItemFetching: false,
  isItemCreating: false,
  error: null,
  fetchStoryError: null,
};

// Reducer
export default handleActions(
  {
    [fetchStoriesRoutine.REQUEST]: state => {
      return {
        ...state,
        error: null,
        fetchStoryError: null,
        isListFetching: true,
      };
    },
    [fetchStoriesRoutine.SUCCESS]: (state, { payload, meta }) => {
      const { clearList } = meta;

      const newStoriesIds = payload.map(prop("id"));

      return {
        ...state,
        byId: listToHash(payload),
        allIds: payload.map(item => item.id),
        listStoriesIds: clearList
          ? newStoriesIds
          : uniq(state.listStoriesIds.concat(newStoriesIds)),
      };
    },
    [fetchStoriesRoutine.FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [fetchStoriesRoutine.FULFILL]: state => ({
      ...state,
      isListFetching: false,
    }),

    [combineActions(
      fetchStoryRoutine.REQUEST,
      createStoryRoutine.REQUEST
    )]: state => ({
      ...state,
      fetchStoryError: null,
      error: null,
    }),

    [fetchStoryRoutine.REQUEST]: state => ({
      ...state,
      isItemFetching: true,
    }),

    [fetchStoryRoutine.FULFILL]: state => ({
      ...state,
      isItemFetching: false,
    }),

    [createStoryRoutine.REQUEST]: state => ({
      ...state,
      isItemCreating: true,
    }),

    [createStoryRoutine.FULFILL]: state => ({
      ...state,
      isItemCreating: false,
    }),

    [combineActions(fetchStoryRoutine.SUCCESS, createStoryRoutine.SUCCESS)]: (
      state,
      { payload }
    ) => ({
      ...state,
      byId: {
        ...state.byId,
        [payload.id]: merge({}, state.byId[payload.id] || {}, payload),
      },
      allIds: uniq(state.allIds.concat(payload.id)),
      listStoriesIds: uniq(state.listStoriesIds.concat(payload.id)),
    }),
    [createStoryRoutine.FAILURE]: (state, { payload }) => {
      const error = (payload.response && payload.response.data) || payload;

      return {
        ...state,
        error,
      };
    },

    [fetchStoryRoutine.FAILURE]: (state, { payload }) => {
      const fetchStoryError =
        (payload.response && payload.response.data) || payload;

      return {
        ...state,
        fetchStoryError,
      };
    },
  },
  INITIAL_STATE
);

// Roitines
export { fetchStoriesRoutine, fetchStoryRoutine, createStoryRoutine };

// Actions
export { fetchStories, fetchStory, createStory } from "./saga-routines";

// Root Saga
export function* storiesSaga() {
  yield takeEvery(fetchStoriesRoutine.REQUEST, fetchStoriesSaga);
  yield takeEvery(fetchStoryRoutine.REQUEST, fetchStorySaga);
  yield takeEvery(createStoryRoutine.REQUEST, createStorySaga);
}
