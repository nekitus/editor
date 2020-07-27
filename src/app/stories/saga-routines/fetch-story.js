import { createSagaRoutine } from "../../utils";

import { featurePrefix } from "../meta";

export const {
  routine: fetchStoryRoutine,
  saga: fetchStorySaga,
} = createSagaRoutine(`${featurePrefix}/FETCH_STORY`, id => {
  const stories = JSON.parse(window.localStorage.getItem("stories")) || [];
  return stories.find(story => story.id === id);
});

export const fetchStory = fetchStoryRoutine.request;
