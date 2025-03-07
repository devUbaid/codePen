import React, { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props;

    const [open, setOpen] = useState(true);

    // Function to determine which language extension to use
    const getLanguageExtension = () => {
        switch (language) {
            case 'javascript':
                return javascript();
            case 'css':
                return css();
            case 'xml':
            case 'html':
                return html();
            default:
                return javascript();
        }
    };

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <button 
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => setOpen(prevopen => !prevopen)}>
                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt}/>
                </button>
            </div>
            <CodeMirror
                value={value}
                height="100%"
                theme="dark"
                extensions={[getLanguageExtension()]}
                onChange={onChange}
                className="code-mirror-wrapper"
                basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: true,
                    lineWrapping: true
                }}
            />
        </div>
    );
}