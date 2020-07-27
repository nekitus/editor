import React, { useEffect } from "react";
import PropTypes from "prop-types";
import draftToHtml from "draftjs-to-html";

import { connect, useDispatch, useStore } from "react-redux";
import Helmet from "react-helmet";

import { getStoriesList } from "../../../app/stories/selectors";

import { fetchStories, createStory } from "../../../app/stories";

import { createUUID } from "../../../utils";

import StyledStoriesList from "./StyledStoriesList";
import StoriesListTitle from "./StoriesListTitle";
import ListItem from "./ListItem";
import StoryEditor from "../../../components/StoryEditor";

export function StoriesList({ createStory, fetchStories, stories }) {
  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <React.Fragment>
      <Helmet title={"Stories"} />
      <StoryEditor onSave={createStory} />
      <StyledStoriesList>
        <StoriesListTitle>Your stories</StoriesListTitle>
        <div>
          {stories.map(story => (
            <ListItem {...story} />
          ))}
        </div>
      </StyledStoriesList>
    </React.Fragment>
  );
}

StoriesList.propTypes = {
  createStory: PropTypes.func.isRequired,
  fetchStories: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
};

StoriesList.defaultProps = {
  stories: [],
};

export default connect(
  state => ({
    stories: getStoriesList(state),
  }),
  {
    fetchStories,
    createStory: content => {
      const id = createUUID().split("-")[3];

      const story = {
        id,
        content: draftToHtml(content),
        name: content.blocks[0].text || id,
        date: new Date().toISOString(),
      };

      return createStory(story);
    },
  }
)(StoriesList);
