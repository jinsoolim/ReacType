import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { StateContext } from '../../context/context';
import HTMLItem from './HTMLItem';
import { makeStyles } from '@material-ui/core/styles';

const HTMLPanel = (): JSX.Element => {
  const classes = useStyles();

  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [currentID, setCurrentID] = useState(12);
  const [state, dispatch] = useContext(StateContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const buttonClasses =
    'MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-button-12 MuiButton-textPrimary';

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setTag(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setName(e.target.value);
  };

  const checkNameDupe = (inputName: String) => {
    let checkList = state.HTMLTypes.slice();

    // checks to see if inputted comp name already exists
    let dupe = false;
    checkList.forEach(HTMLTag => {
      if (
        HTMLTag.name.toLowerCase() === inputName.toLowerCase() ||
        HTMLTag.tag.toLowerCase() === inputName.toLowerCase()
      ) {
        dupe = true;
      }
    });
    return dupe;
  };

  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Tag/ Tag name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Tag/ Tag name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Tag/ Tag name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Tag/ Tag name must not contain symbols.');
    }
  };

  const resetError = () => {
    setErrorStatus(false);
  };

  const createOption = (inputTag: String, inputName: String) => {
    // format name so first letter is capitalized and there are no whitespaces
    let inputNameClean = inputName.replace(/\s+/g, '');
    const formattedName =
      inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1);
    // add new component to state
    const newElement = {
      id: currentID,
      tag: inputTag,
      name: formattedName,
      style: {},
      placeHolderShort: name,
      placeHolderLong: '',
      icon: null
    };
    dispatch({
      type: 'ADD ELEMENT',
      payload: newElement
    });
    const nextID = currentID + 1;
    setCurrentID(nextID);
    setTag('');
    setName('');
  };

  const alphanumeric = input => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (input.match(letterNumber)) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let letters = /[a-zA-Z]/;
    if (!tag.charAt(0).match(letters) || !name.charAt(0).match(letters)) {
      triggerError('letters');
      return;
    } else if (!alphanumeric(tag) || !alphanumeric(name)) {
      triggerError('symbolsDetected');
      return;
    } else if (tag.trim() === '' || name.trim() === '') {
      triggerError('empty');
      return;
    } else if (checkNameDupe(tag) || checkNameDupe(name)) {
      triggerError('dupe');
      return;
    }
    createOption(tag, name);
    resetError();
  };

  return (
    <div>
      <h4> HTML Elements</h4>
      <div className={classes.addComponentWrapper}>
        <div className={classes.inputWrapper}>
          <form onSubmit={handleSubmit}>
            <h4>Create New Element: </h4>
            <label className={classes.inputLabel}>
              Tag:
              <input
                color={'primary'}
                type="text"
                name="Tag"
                value={tag}
                onChange={handleTagChange}
                className={classes.input}
                style={{ marginBottom: '10px' }}
              />
              {errorStatus && <span>{errorMsg}</span>}
            </label>
            <br></br>
            <label className={classes.inputLabel}>
              Tag Name:
              <input
                color={'primary'}
                type="text"
                name="Tag Name"
                value={name}
                onChange={handleNameChange}
                className={classes.input}
              />
              {errorStatus && <span>{errorMsg}</span>}
            </label>
            <input
              className={buttonClasses}
              color="primary"
              type="submit"
              value="Add Element"
              style={{ marginTop: '15px' }}
            />
          </form>
        </div>
      </div>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {state.HTMLTypes.map(option => (
          <HTMLItem
            name={option.name}
            key={`html-${option.name}`}
            id={option.id}
            Icon={option.icon}
          />
        ))}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({
  inputField: {
    marginTop: '15px'
  },
  inputWrapper: {
    // height: '115px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '35px',
    marginBottom: '15px'
  },
  addComponentWrapper: {
    border: '1px solid rgba(70,131,83)',
    padding: '20px',
    margin: '20px'
  },
  rootCheckBox: {},
  rootCheckBoxLabel: {
    color: 'white'
  },
  panelWrapper: {
    width: '100%',
    marginTop: '15px'
  },
  panelWrapperList: {
    // maxHeight: '400px',
    minHeight: '120px',
    // overflowY: 'auto',
    marginLeft: '-15px',
    marginRight: '-15px'
  },
  panelSubheader: {
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    color: '#fff',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid rgba(51,235,145,0.75)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginLeft: '10px'
  },
  inputLabel: {
    fontSize: '16px',
    zIndex: 20,
    color: '#fff',
    marginTop: '-10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    marginLeft: '10px'
  },
  button: {
    fontSize: '1rem',
    height: '40px',
    maginTop: '10px',
    width: '100%',
    // border: '1px solid rgba(70,131,83)',
    backgroundColor: 'rgba(1,212,109,0.1)'
  },
  rootToggle: {
    color: '#01d46d',
    fontSize: '0.85rem'
  }
});

export default HTMLPanel;
