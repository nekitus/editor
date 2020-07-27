import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import parse from "html-react-parser";

import { createMatchSelector, push, goBack } from "connected-react-router";
import { fetchStory } from "../../../app/stories";
import {
  getStory,
  getIsStoryFetching,
  getIsStoryDeleting,
  getIsStoryUpdating,
  getStoriesFetchStoryError,
} from "../../../app/stories/selectors";

import Helmet from "react-helmet";

import StyledStory from "./StyledStory";

export function Story({ storyId, story, goBack, push, fetchStory }) {
  useEffect(() => {
    fetchStory(storyId);
  }, []);

  const goToList = () => {
    push("/stories");
  };

  return (
    <StyledStory>
      <Helmet title="Stories" />
      <div>
        {story.content && parse(story.content)}
      </div>
    </StyledStory>
  );
}

Story.propTypes = {
  story: PropTypes.object,
  storyId: PropTypes.number.isRequired,
  fetchStory: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

Story.defaultProps = {
  story: {},
};

export default connect(
  state => {
    const matchSelector = createMatchSelector({ path: "/stories/:id" });
    const match = matchSelector(state);

    const storyId = match && match.params.id;

    return {
      storyId,
      story: getStory(state, storyId),
    };
  },
  { fetchStory, push, goBack }
)(Story);
