import styled, { css } from "styled-components";

const StyledStyleControlsInner = styled.div`
  position: relative;
  background-image: linear-gradient(to bottom, rgba(49, 49, 47, 0.99), #262625);
  background-repeat: repeat-x;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 0 10px;
`;

export default StyledStyleControlsInner;

//
//display: inline-block;
//cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
//outline: ${({ isHardOutline }) =>
//isHardOutline ? "none !important" : "none"};
//border: none;
//padding: 0;
//box-sizing: border-box;
//transition: background-color 100ms, border-color 100ms, box-shadow 100ms,
//  color 100ms, opacity 100ms;
//
//border-radius: ${({ isRounded }) => (isRounded ? "3px" : "0px")};
