import React, { Component } from 'react';
let view=false;

class View extends Component {
//subject_id, owner, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions
  render() {
    return (
        <div id="content">
        <p>&nbsp;</p>
        <h2>Report Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Column</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="reportDetails">
            { 
                <>
                <tr>
                  <th scope="row">Subject ID</th>
                  <td>{this.props.sub_id.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Owner</th>
                  <td>{this.props.owner.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Subject Name</th>
                  <td>{this.props.name.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Subject Age</th>
                  <td>{this.props.age.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Subject Sex</th>
                  <td>{this.props.sex.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Case Number</th>
                  <td>{this.props.case_no.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Date</th>
                  <td>{this.props.date.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>{this.props.location.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>{this.props.desc.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Evidence</th>
                  <td>{this.props.evidence.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Conclusions</th>
                  <td>{this.props.conclusions.toString()}</td>
                </tr>
                
                </>
              
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default View;