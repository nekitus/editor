import { push, goBack } from "connected-react-router";

import { useDispatch } from "react-redux";
import { useLocation } from "react-use";
import { useLastLocation } from "react-router-last-location";

export function useListHistory({ listUrl, currentListItemId }) {
  const location = useLocation();
  const lastLocation = useLastLocation();
  const dispatch = useDispatch();

  const isCurrentPageIsList = location.pathname === listUrl;

  const hasToRedirectOnListItemPage = currentListItemId && isCurrentPageIsList;

  function backToList() {
    if (lastLocation && lastLocation.pathname === listUrl) {
      dispatch(goBack());
    } else {
      dispatch(push(listUrl));
    }
  }

  return { isCurrentPageIsList, hasToRedirectOnListItemPage, backToList };
}
