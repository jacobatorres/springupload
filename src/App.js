import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

class App extends Component {
  onChangeHandler = (event) => {
    console.log(event.target.files[0]);

    // axios.get('http://localhost:8080/rulesheets').then((res) => {
    //   // then print response status
    //   console.log(res);
    // }); // this works

    // axios.post('', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    var formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios
      .post('http://localhost:8080/rulesheet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('nagkamali');
        console.log(error.response);
      });
  };

  render() {
    return (
      <div className="proper">
        {' '}
        <input type="file" name="file" onChange={this.onChangeHandler} />
      </div>
    );
  }
}

export default App;
