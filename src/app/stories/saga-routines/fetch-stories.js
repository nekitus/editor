import { createSagaRoutine } from "../../utils";

import { featurePrefix } from "../meta";

export const {
  routine: fetchStoriesRoutine,
  saga: fetchStoriesSaga,
} = createSagaRoutine(`${featurePrefix}/FETCH_STORIES`, () => {
  const stories = JSON.parse(window.localStorage.getItem("stories")) || [];
  return stories;
});

export const fetchStories = fetchStoriesRoutine.request;
