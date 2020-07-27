import React from "react";
import PropTypes from "prop-types";

import StyledWrapper from "./StyledWrapper";

function PageWrapper({ children }) {
  return <StyledWrapper>{children}</StyledWrapper>;
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
};

export default PageWrapper;
