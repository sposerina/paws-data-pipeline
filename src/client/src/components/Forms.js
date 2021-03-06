import React, {useState, useEffect} from 'react';
import {Input, MenuItem, Select, FormControl, InputLabel, Button} from "@material-ui/core";

import useFetch from './scripts/useFetch';

// These "forms" can be refactored to be a resuable component
// https://reactjs.org/docs/forms.html

function DownloadForm(props) {

  const handleChange = (event)=>{
    event.preventDefault();

    fetch("/files/current")
      .then(response => response.formData())
      .then(files => console.log(files));
  }

  return (
    <form onSubmit={handleChange}>
    <FormControl>
      <Select>
        <InputLabel>Select Item to Download</InputLabel>
        <MenuItem>Current</MenuItem>
        <MenuItem>Archived</MenuItem>
        <MenuItem>Output</MenuItem>
      </Select>
      <button type="submit">Download</button>
    </FormControl>
    </form>
  );

}

// Still need to refresh the list of availabe files on Server.
// <Input /> objects are uncontrolled in React, so it is recommend that you use
// the File API to interact with selected files. 
// https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag

function UploadForm(props) {
  const [{response, isLoading, isError}, setUrl] = useFetch(null, null);

  const execute = (event)=>{
    event.preventDefault();

    fetch("/execute")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
    <form onSubmit={props.handleSubmit}>
        <input type="file" ref={props.fileInput} multiple />
        <button type="submit">Submit</button>
    </form>
    </div>
  );

}
export { UploadForm, DownloadForm };