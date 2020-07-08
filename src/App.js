import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import Aux from './hoc/Auxillary';
import Dropzone from 'react-dropzone';

class App extends Component {
  state = {
    messages: [],
    customer_ids: [],
    customer_names: [],
  };
  onDrop = (uploadedFiles) => {
    console.log(uploadedFiles.files[0]);
    console.log(uploadedFiles);
  };

  componentDidMount() {
    // get the customers
    // put them in a state: id, name
    axios
      .get('http://localhost:8080/customers')
      .then((res) => {
        console.log(res);

        // for loop into getting the ids and name

        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].id);
          this.setState((prevState) => ({
            customer_ids: [...prevState.customer_ids, res.data[i].id],

            customer_names: [...prevState.customer_names, res.data[i].name],
          }));
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  onChangeHandler = (event) => {
    console.log('wahhhh hule');

    console.log(event.target.files);

    var list_of_files = event.target.files;

    var messages_from_loop = [];
    for (var i = 0; i < list_of_files.length; i++) {
      console.log(list_of_files[i]);
      // list_of_files[i].webkitRelativePath = list_of_files[i].name
      var formData = new FormData();
      formData.append('file', list_of_files[i]);
      axios
        .post('http://localhost:8080/rulesheet', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res);
          this.setState((prevState) => ({
            messages: [...prevState.messages, res.data],
          }));
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    console.log('end');

    // // axios.get('http://localhost:8080/rulesheets').then((res) => {
    // //   // then print response status
    // //   console.log(res);
    // // }); // this works

    // // axios.post('', {
    // //   firstName: 'Fred',
    // //   lastName: 'Flintstone'
    // // })
    // // .then(function (response) {
    // //   console.log(response);
    // // })
    // var formData = new FormData();
    // formData.append('file', event.target.files[0]);
    // axios
    //   .post('http://localhost:8080/rulesheet', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log('nagkamali');
    //     console.log(error.response);
    //   });
  };

  render() {
    let whatever = null;
    return (
      <Aux>
        <h1 className="left-top">Upload Directory</h1>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className="left-top">
              <input
                {...getInputProps()}
                directory=""
                webkitdirectory=""
                type="file"
                onChange={this.onChangeHandler}
              />
              <p className="looklikebutton">Choose Directory to Upload</p>
            </div>
          )}
        </Dropzone>
        {this.state.messages.length === 0
          ? null
          : this.state.messages.map((message) => (
              <li key={message} className="left-top">
                {message}
              </li>
            ))}
        {/*         
        <div className="left-top">
          {' '}
          <input type="file" name="file" onChange={this.onChangeHandler} />
        </div> */}
        <div className="top-bottom"></div>
        <h1 className="left-top">Customers</h1>

        <table className="left-top">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th></th>
          </tr>
          {this.state.customer_ids.length === 0
            ? null
            : this.state.customer_ids.map((i, j) => (
                <tr>
                  <td key={j} className="left-top">
                    {i}
                  </td>
                  <td key={j} className="left-top">
                    {this.state.customer_names[j]}
                  </td>
                  <td> Delete</td>
                </tr>
              ))}
        </table>
        <p className="left-top looklikebutton">Add Customer</p>
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
