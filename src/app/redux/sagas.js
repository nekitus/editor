import { fork } from "redux-saga/effects";

import { storiesSaga } from "../stories";

export function* rootSaga() {
  yield fork(storiesSaga);
}
