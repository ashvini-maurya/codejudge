import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import swal from "sweetalert2";
import "./AllLeads.css";
import Navigation from "../Navigation/Navigation";

class AllLeads extends Component {
  state = {
    allLeads: [],
    note: "",
    selectedLead: {}
  };

  componentDidMount() {
    this.getAllLeads();
  }

  getAllLeads = () => {
    axios({
      method: "GET",
      url: "http://18.206.131.127:8100/api/leads/"
    })
      .then(res => {
        console.log(res);
        this.setState({
          allLeads: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteLead(leadId) {
    axios({
      method: "DELETE",
      url: `http://18.206.131.127:8100/api/leads/${leadId}`
    })
      .then(res => {
        this.getAllLeads();
        swal.fire({
          type: "success",
          title: "Lead Deleted",
          text: "Lead successfully deleted!"
        });
      })
      .catch(err => {
        console.log(err);
        swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      });
  }

  noteChangeHandler = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  selectLead = lead => {
    this.setState({
      selectedLead: lead
    });
  };

  noteSubmitHandler = () => {
    axios({
      method: "PUT",
      url: `http://18.206.131.127:8100/api/leads/${
        this.state.selectedLead.id
      }/`,
      data: {
        first_name: this.state.selectedLead.first_name,
        last_name: this.state.selectedLead.last_name,
        mobile: this.state.selectedLead.mobile,
        email: this.state.selectedLead.email,
        location_string: this.state.selectedLead.location_string,
        communication: this.state.note
      }
    })
      .then(res => {
        swal.fire({
          type: "success",
          title: "Note Added",
          text: "Note successfully added!"
        });
        document.getElementById("noteModal").click();
        this.setState({
          note: ""
        });
      })
      .catch(err => {
        console.log(err);
        swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="dashboard mt-5 p-5">
            <h4 className="py-4">All Leads</h4>
            <Navigation />
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="tableHead">
                  <tr>
                    <th>#</th>
                    <th className="text-left">First Name</th>
                    <th className="text-left">Last Name</th>
                    <th className="text-left">Email ID</th>
                    <th className="text-left">Mobile</th>
                    <th className="text-left">Status</th>
                    {/* <th>Location Type</th>
                    <th>Location String</th> */}
                    <th className="text-left">Created At</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.allLeads.map((lead, index) => (
                    <tr key={lead.id}>
                      <td className="text-left">{index + 1}.</td>
                      <td className="text-left">{lead.first_name}</td>
                      <td className="text-left">{lead.last_name}</td>
                      <td className="text-left">{lead.email}</td>
                      <td className="text-left">{lead.mobile}</td>
                      <td className="text-left">{lead.status}</td>
                      {/* <td>{lead.location_type}</td>
                      <td>{lead.location_string}</td> */}
                      <td className="text-left">
                        <Moment format="DD/MM/YYYY">{lead.created_at}</Moment>
                      </td>
                      <td>
                        <i
                          className="fas fa-pen-square cursorPointer"
                          data-toggle="modal"
                          data-target="#noteModal"
                          onClick={() => this.selectLead(lead)}
                        />
                      </td>
                      <td onClick={() => this.deleteLead(lead.id)}>
                        <i className="fas fa-trash cursorPointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* opening Note modal */}
          <div
            className="modal fade"
            id="noteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="noteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="w-100">
                    <button
                      type="button"
                      className="close mr-2"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <p className="text-center mb-0 pt-4">Please enter Note</p>
                    <div className="mt-3 w-75 mx-auto mb-3">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <textarea
                            type="input"
                            placeholder="Enter Note"
                            className="form-control"
                            name="note"
                            value={this.state.note}
                            onChange={this.noteChangeHandler}
                          />
                          {this.state.noteError ? (
                            <p className="errorClass fs12 text-left">
                              {this.state.noteError}
                            </p>
                          ) : null}
                        </div>
                        <button
                          className="mt-4 addLead"
                          onClick={this.noteSubmitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* closing Note modal */}
        </div>
      </div>
    );
  }
}

export default AllLeads;
