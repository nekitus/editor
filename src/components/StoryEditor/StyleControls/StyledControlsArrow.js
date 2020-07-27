import styled, { css } from "styled-components";

const StyledControlsArrow = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  clip: rect(10px 20px 20px 0);
  margin-left: -10px;
  span {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #262625;
    -webkit-transform: rotate(45deg) scale(0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;

export default StyledControlsArrow;
