import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCurrentStoryId } from "../../app/stories/selectors";

import { Route, Redirect } from "react-router-dom";

import StoriesList from "./StoriesList";
import Story from "./Story";

export function StoriesPage({ currentStoryId }) {
  return (
    <>
      {currentStoryId && (
        <Redirect exact from="/stories" to={`/stories/${currentStoryId}`} />
      )}
      <Route path="/stories/:id" exact>
        <Story />
      </Route>
      <Route path="/stories" exact>
        <StoriesList />
      </Route>
    </>
  );
}

StoriesPage.propTypes = {
  currentStoryId: PropTypes.number,
};

export default connect(state => ({
  currentStoryId: getCurrentStoryId(state),
}))(StoriesPage);
