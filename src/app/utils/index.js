import { createRoutine } from "redux-saga-routines";
import { call, put } from "redux-saga/effects";
import { merge } from "lodash-es";

import { identity, keyBy, omit } from "lodash-es";

export const metaCreator = payload => (payload ? payload.meta : identity);

/**
 * Если в payload есть meta (проставляется metaCreator выше),
 * то убирает ее и возвращает оставшийся payload
 */
export const payloadWithoutMetaCreator = payload => {
  if (typeof payload !== "object" || payload === null) return payload;
  // eslint-disable-next-line no-unused-vars
  const { successPayload, error, ...restPayload } = payload;

  return successPayload || error || restPayload;
};

export function createSagaRoutine(
  prefix,
  apiCall,
  onSuccess = identity,
  onError = identity,
  payloadCreator = identity,
  isThrowError
) {
  const routine = createRoutine(
    prefix,
    payload => payloadCreator(payloadWithoutMetaCreator(payload)),
    metaCreator
  );

  function* saga({ payload, meta } = {}) {
    try {
      const data = yield call(() => apiCall(payload));
      const isDataEmpty = data.data === "";

      const successPayload = isDataEmpty ? payload : data;

      yield put(routine.success({ successPayload, meta }));

      if (onSuccess) {
        yield onSuccess(data, payload);
      }
    } catch (error) {
      yield put(routine.failure({ error, meta }));

      if (onError) {
        yield onError(error, payload);
      }

      if (isThrowError) {
        yield put(routine.fulfill());
        throw new Error(error);
      }
    }

    yield put(routine.fulfill());
  }

  return { routine, saga };
}

export const idSelector = (_, id) => id;

export const nameSelector = (_, name) => name;

export function listToHash(array, key = "id") {
  return keyBy(array, key);
}
