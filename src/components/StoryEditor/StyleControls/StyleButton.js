import React from "react";
import PropTypes from "prop-types";

function StyleButton({ style, onToggle, active, label, ...props }) {
  const onMouseDown = e => {
    e.preventDefault();
    onToggle && onToggle(style);
  };

  const className = !active
    ? "RichEditor-styleButton"
    : "RichEditor-styleButton RichEditor-activeButton";

  return (
    <div
      onMouseDown={onToggle ? onMouseDown : null}
      className={className}
      {...props}
    >
      {label}
    </div>
  );
}

StyleButton.propTypes = {
  style: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

export default StyleButton;
