"use client";

import React, { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

type Padding =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tabSize?: number;
  insertSpaces?: boolean;
  padding?: Padding;
  style?: React.CSSProperties;
}

const initialCode = `import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root");`;
const CodeEditor: React.FC<Props> = ({
  tabSize = 10,
  insertSpaces = true,
  padding = 0,
  style,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState(initialCode);
  const updateInput = (record: string) => {
    const input = textareaRef.current;
    if (!input) return;

    input.value = record;
    setCode(record);
  };

  const applyEdits = (record: string) => {
    updateInput(record);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const input = e.currentTarget;
      const { value, selectionStart, selectionEnd } = input;
      const tabCharacter = (insertSpaces ? " " : "\t").repeat(tabSize);

      if (selectionStart === selectionEnd) {
        applyEdits(
          value.substring(0, selectionStart) +
            tabCharacter +
            value.substring(selectionEnd)
        );
      } else {
        // Handle multi-line indentation
        const lines = value.split("\n");
        let startLine = value.substr(0, selectionStart).split("\n").length - 1;
        let endLine = value.substr(0, selectionEnd).split("\n").length - 1;

        const newValue = lines
          .map((line, i) => {
            if (i >= startLine && i <= endLine) {
              return tabCharacter + line;
            }
            return line;
          })
          .join("\n");

        applyEdits(newValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setCode(value);
  };

  const contentStyle = {
    paddingTop: typeof padding === "object" ? padding.top : padding,
    paddingRight: typeof padding === "object" ? padding.right : padding,
    paddingBottom: typeof padding === "object" ? padding.bottom : padding,
    paddingLeft: typeof padding === "object" ? padding.left : padding,
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      <pre
        aria-hidden="true"
        style={{ ...styles.editor, ...styles.highlight, ...contentStyle }}
      >
        <Highlight theme={themes.dracula} code={code} language="jsx">
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </>
          )}
        </Highlight>
      </pre>
      <textarea
        ref={textareaRef}
        style={{
          ...styles.editor,
          ...styles.textarea,
          ...contentStyle,
        }}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    textAlign: "left",
    boxSizing: "border-box",
    padding: 0,
    overflow: "hidden",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    resize: "none",
    color: "inherit",
    overflow: "hidden",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    position: "relative",
    pointerEvents: "none",
  },
  editor: {
    margin: 0,
    border: 0,
    background: "none",
    boxSizing: "inherit",
    display: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontStyle: "inherit",
    fontVariantLigatures: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    tabSize: "inherit",
    textIndent: "inherit",
    textRendering: "inherit",
    textTransform: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
} as const;

export default CodeEditor;
