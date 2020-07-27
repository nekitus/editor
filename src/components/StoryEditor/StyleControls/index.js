import React from "react";
import PropTypes from "prop-types";

import { useState, useEffect, useMemo } from "react";
import { usePopup } from "../../../hooks";
import { useUpdateEffect } from "react-use";

import StyledStyleControls from "./StyledStyleControls";
import StyledControlsArrow from "./StyledControlsArrow";
import StyledStyleControlsInner from "./StyledStyleControlsInner";

import StyleButton from "./StyleButton";
import Dropzone from "react-dropzone";
import Draft, { EditorState, AtomicBlockUtils } from "draft-js";

const POPUP_WIDTH = 258;
const POPUP_TOP_MARGIN = 50;
const MAX_SIZE_FILE = 4096000;

import {
  IMAGES_ACCEPT_MIME_TYPES,
  INLINE_STYLES,
} from "../StoryEditor.resources";

const StyleControls = ({ editorState, onToggle, onChange }) => {
  const [selectRect, setSelectRect] = useState({ x: 0, y: 0, width: 0 });
  const [isSelected, setIsSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const { Portal, popupInner } = usePopup({ initialIsOpen: false });
  const getSelectedBlockElement = () => {
    const selection = window.getSelection();
    if (selection.rangeCount == 0) return null;
    let node = selection.getRangeAt(0).startContainer;
    do {
      if (node.getAttribute && node.getAttribute("data-block") == "true")
        return node;
      node = node.parentNode;
    } while (node != null);
    return null;
  };

  const insertImage = (editorState, base64) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: base64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  const displayImage = base64Img => {
    const newEditorState = insertImage(editorState, base64Img);
    onChange(newEditorState);
  };

  const handleImageDrop = acceptedFile => {
    acceptedFile.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        displayImage(reader.result);
        setIsOpen(false);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });
  };

  const calculateLeftPosition = (selectRect, isSelected) => {
    return isSelected
      ? selectRect.x - POPUP_WIDTH / 2 + selectRect.width / 2
      : selectRect.x;
  };

  useUpdateEffect(() => {
    const currentBlock = getSelectedBlockElement();
    if (currentBlock) {
      const selectionState = editorState.getSelection();
      const currentContent = editorState.getCurrentContent();
      const start = selectionState.getStartOffset();
      const end = selectionState.getEndOffset();
      const lastBlockLen = currentContent.getLastBlock().getText().length;
      const caretPosition = selectionState.getStartOffset();
      const isNewLine = lastBlockLen === 0 && caretPosition === 0;
      const selection = window.getSelection();
      const oRange = selection && selection.getRangeAt(0);
      const { x, y, width } = oRange && oRange.getBoundingClientRect();
      const isFirstBlockFocus = currentContent.getBlockMap().first().getKey() === selectionState.getAnchorKey();
      setIsSelected(start !== end);

      setSelectRect({
        x: x || currentBlock.offsetLeft + 20,
        y: y ? y + window.scrollY : currentBlock.offsetTop,
        width,
      });

      if (!isFirstBlockFocus && (isNewLine || isSelected)) {
        if (!isOpen) {
          setIsOpen(true);
        }
      } else if (isOpen) {
        setIsOpen(false);
      }
    }
  }, [editorState, isSelected]);


  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
    });
  }, []);

  const currentStyle = editorState.getCurrentInlineStyle();

  const leftPosition = useMemo(
    () => calculateLeftPosition(selectRect, isSelected),
    [selectRect, isSelected]
  );

  return (
    <Portal>
      <StyledStyleControls
        ref={popupInner}
        isOpen={isOpen}
        left={leftPosition}
        top={selectRect.y - POPUP_TOP_MARGIN}
      >
        <StyledStyleControlsInner>
          {INLINE_STYLES.map(type => (
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={onToggle}
              style={type.style}
            />
          ))}
          <Dropzone
            onDrop={handleImageDrop}
            maxSize={MAX_SIZE_FILE}
            multiple={false}
            accept={IMAGES_ACCEPT_MIME_TYPES}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <React.Fragment>
                  <StyleButton
                    {...getRootProps()}
                    label="Добавить картинку"
                  ></StyleButton>
                  <input {...getInputProps()} />
                </React.Fragment>
              );
            }}
          </Dropzone>
        </StyledStyleControlsInner>
        <StyledControlsArrow>
          <span></span>
        </StyledControlsArrow>
      </StyledStyleControls>
    </Portal>
  );
};

StyleButton.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StyleControls;
