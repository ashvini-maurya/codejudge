import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import swal from "sweetalert2";
import "./AllLeads.css";

class AllLeads extends Component {
  state = {
    allLeads: []
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
          type: 'success',
          title: 'Lead Deleted',
          text: 'Lead successfully deleted!'
        })
      })
      .catch(err => {
        console.log(err);
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="dashboard mt-5 p-5">
            <h4 className="py-4">All Leads</h4>
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
                        <i className="fas fa-pen-square cursorPointer" />
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
        </div>
      </div>
    );
  }
}

export default AllLeads;
