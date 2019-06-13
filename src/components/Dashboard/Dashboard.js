import React, { Component } from "react";
import "./Dashboard.css";
import AddLead from "./AddLead/AddLead";
import axios from "axios";
import swal from "sweetalert2";

class Dashboard extends Component {
  state = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
    LocationType: [
      { value: "Country", label: "Country" },
      { value: "City", label: "City" },
      { value: "Zip", label: "Zip" }
    ],
    selectedLocationType: [],
    locationString: ""
  };

  inputChangeHandler = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  locationTypeChangeHandler = event => {
    this.setState({
      selectedLocationType: [event]
    });
  };

  addLeadSubmitHandler = event => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://18.206.131.127:8100/api/leads/",
      data: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        mobile: this.state.mobileNumber,
        email: this.state.emailId,
        location_type: this.state.selectedLocationType[0].value,
        location_string: this.state.locationString
      }
    })
      .then(res => {
        this.setState({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          emailId: "",
          selectedLocationType: [],
          locationString: ""
        });
        swal.fire("Lead Added", "Lead Added Successfully", "success");
        // this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      firstName,
      lastName,
      mobileNumber,
      emailId,
      selectedLocationType,
      locationString,
      LocationType
    } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="dashboard mt-5 p-5">
            <AddLead
              firstName={firstName}
              lastName={lastName}
              mobileNumber={mobileNumber}
              emailId={emailId}
              selectedLocationType={selectedLocationType}
              locationString={locationString}
              LocationType={LocationType}
              inputChangeHandler={this.inputChangeHandler}
              locationTypeChangeHandler={this.locationTypeChangeHandler}
              addLeadSubmitHandler={this.addLeadSubmitHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
