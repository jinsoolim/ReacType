import React, { useContext, useState } from 'react';
import { StateContext } from '../../context/context';
import AceEditor from 'react-ace';
import { makeStyles } from '@material-ui/core/styles';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import { Component } from '../../interfaces/Interfaces';

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   }
// }));

// const optionColor = '#252526';

const CodePreview = ({ theme, setTheme }) => {
  const [state, dispatch] = useContext(StateContext);
  // const classes = useStyles();
  const currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  const handleCodeSnipChange = val => {
    currentComponent.code = val;
  };

  const changeTheme = e => {
    setTheme(e.target.value);
  };

  return (
    <div
      style={{
        height: '90%',
        maxWidth: '100%',
        justifyContent: 'center'
      }}
    >
      <AceEditor
        mode="javascript"
        theme={theme}
        width="100%"
        height="100%"
        style={{
          border: '2px solid #33eb91',
          borderRadius: '8px'
        }}
        // onChange={code =>
        //   this.props.updateCode({
        //     componentId: this.props.focusComponent.id,
        //     code
        //   })
        // }
        onChange={handleCodeSnipChange}
        value={currentComponent.code}
        name="Code_div"
        // readOnly={this.props.codeReadOnly}
        readOnly={false}
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        tabSize={2}
      />
    </div>
  );
};

// const useStyles = makeStyles(theme => ({}));

export default CodePreview;
