import { NavLink } from "react-router-dom";

import styled from "styled-components";

const ListItemLink = styled(NavLink)`
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  height: 33px;
  color: rgba(41, 41, 41, 1);
  text-overflow: ellipsis;
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid #dadada;
  }
`;

export default ListItemLink;
