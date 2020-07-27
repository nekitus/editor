import React, { useEffect } from "react";
import PropTypes from "prop-types";

import StyledListItem from "./StyledListItem";
import ListItemLink from "./ListItemLink";
import ListItemTitle from "./ListItemTitle";

function ListItem({ id, name, date }) {
  return (
    <StyledListItem>
      <div>
        <ListItemTitle>
          <ListItemLink
            key={id}
            to={`/stories/${id}`}
            data-testid="stories-list-item"
          >
            {name}
          </ListItemLink>
        </ListItemTitle>
      </div>
      <div>
        <div>
          <div>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </StyledListItem>
  );
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export default ListItem;
