import { createSelector } from "reselect";
import {
  mapApiErrorsToFormFieldsErrors,
  idSelector,
  nameSelector,
} from "../utils";

export const getStories = state => state.stories.byId;

export const getStoriesList = state =>
  state.stories.listStoriesIds.map(id => state.stories.byId[id]);

export const getStory = createSelector(
  getStories,
  idSelector,
  (stories, id) => stories[id]
);

export const getStoriesFetchStoryError = state => state.stories.fetchStoryError;

export const getCurrentStoryId = state => state.stories.currentStoryId;

export const getIsStoryFetching = state => state.stories.isItemFetching;

export const getIsStoryUpdating = state => state.stories.isItemUpdating;

export const getIsStoryDeleting = state => state.stories.isItemDeleting;
