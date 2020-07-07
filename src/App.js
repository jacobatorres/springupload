import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import Aux from './hoc/Auxillary';

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
      <Aux>
        <h1 className="left-top">Upload Directory</h1>
        <div className="left-top">
          {' '}
          <input type="file" name="file" onChange={this.onChangeHandler} />
        </div>
        <div className="top-bottom"></div>
        <h1 className="left-top">Customers</h1>
        <table className="left-top">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
        <div className="top-bottom"></div>
        <h1 className="left-top">Rulesheets</h1>
        <table className="left-top">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
      </Aux>
    );
  }
}

export default App;
