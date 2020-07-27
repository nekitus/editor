import styled, { css } from "styled-components";

const StyledStyleControls = styled.div`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;

  position: absolute;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  display: ${({ isOpen }) => (isOpen ? "inline-block" : "none")};
  z-index: 500;
  -webkit-transition: none;
  transition: none;
  left: ${({ left }) => (left ? left : -500)}px;
  top: ${({ top }) => (top ? top : -500)}px;

  transition: top 75ms ease-out, left 75ms ease-out;
  animation: popup-upwards 180ms forwards linear;
`;

export default StyledStyleControls;
