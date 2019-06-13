import React, { Component } from "react";
import "./AddLead.css";
import Select from "react-select";

class AddLead extends Component {
  render() {
    const {
      firstName,
      lastName,
      mobileNumber,
      emailId,
      selectedLocationType,
      locationString,
      LocationType,
      inputChangeHandler,
      locationTypeChangeHandler,
      addLeadSubmitHandler
    } = this.props;
    return (
      <form>
        <h4 className="py-4">Add New Lead</h4>
        <div className="row">
          <div className="col-6">
            <label className="inputLabel">First Name</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="col-6">
            <label className="inputLabel">Last Name</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="inputLabel">Mobile Number</label>
            <input
              type="number"
              className="form-control py-2"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              value={mobileNumber}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="inputLabel">Email</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter Email Id"
              name="emailId"
              value={emailId}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="inputLabel">Location Type</label>
            <Select
              type="text"
              onChange={event => locationTypeChangeHandler(event)}
              options={LocationType}
              value={selectedLocationType}
              className="text-capitalize form-control p-0"
              placeholder="Select Location Type"
            />
          </div>
          <div className="col-6 pt-3">
            <label className="inputLabel">Location String</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter Location"
              name="locationString"
              value={locationString}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="col-12 pt-4">
            <button
              type="submit"
              className="addLead"
              onClick={addLeadSubmitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddLead;
