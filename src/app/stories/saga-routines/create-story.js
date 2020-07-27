import { createSagaRoutine } from "../../utils";
import { put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { createRoutine } from "redux-saga-routines";

import { featurePrefix } from "../meta";

const createStoryRoutine = createRoutine(`${featurePrefix}/CREATE_STORY`);

function* createStorySaga(action) {
  const { id, content, name, date } = action.payload;
  try {
    const stories = JSON.parse(window.localStorage.getItem("stories")) || [];
    const newStories = [...stories, { content, id, name, date }];
    window.localStorage.setItem("stories", JSON.stringify(newStories));

    yield put(createStoryRoutine.success(action.payload));
  } catch (error) {
    yield put(createStoryRoutine.failure(error));
  }
}

export { createStoryRoutine, createStorySaga };

export const createStory = createStoryRoutine.request;
