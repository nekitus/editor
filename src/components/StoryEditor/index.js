import Draft, {
  SelectionState,
  Modifier,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import PropTypes from "prop-types";
import draftToHtml from "draftjs-to-html";
import Editor from "draft-js-plugins-editor";
import { clearEditorContent } from "draftjs-utils";
import createImagePlugin from "draft-js-image-plugin";

import React, { useState, useEffect, useRef } from "react";
import Immutable from "immutable";

import StyleControls from "./StyleControls";
import EditorButton from "./EditorButton";

import "./index.css";
const imagePlugin = createImagePlugin();

import { styleMap } from "./StoryEditor.resources";

function StoryEditor({ onSave }) {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
  });
  const editor = useRef(null);

  const handleFocus = () => editor.current.focus();
  const handleChange = editorState => {
    setState({ editorState });
  };

  const toggleInlineStyle = inlineStyle => {
    handleChange(RichUtils.toggleInlineStyle(state.editorState, inlineStyle));
  };

  const handleClearEditor = e => {
    e.stopPropagation();

    const editorState = EditorState.push(
      state.editorState,
      ContentState.createFromText("")
    );
    setState({ editorState });
  };
  const handleSaveStory = e => {
    const stateContent = convertToRaw(editorState.getCurrentContent());
    onSave(stateContent);
    handleClearEditor(e);
  };

  const onClickEditor = e => {
    e.stopPropagation();
  };

  const { editorState } = state;

  return (
    <div className="RichEditor-root" onClick={onClickEditor}>
      <EditorButton onClick={handleClearEditor}>Очистить редактор</EditorButton>
      <EditorButton onClick={handleSaveStory}>Сохранить</EditorButton>
      <StyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
        onChange={handleChange}
      />
      <div className="RichEditor-editor" onClick={handleFocus}>
        <Editor
          plugins={[imagePlugin]}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={handleChange}
          placeholder="Tell a story..."
          ref={editor}
        />
      </div>
    </div>
  );
}

StoryEditor.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default StoryEditor;
