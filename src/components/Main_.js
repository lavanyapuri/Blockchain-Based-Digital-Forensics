import React, { Component } from 'react';
import View from './View'
let view=false;

class Main extends Component {
//subject_id, owner, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions
  render() {
    return (
      <div id="content">
        <h1>Add Report</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const subject_id = this.subject_id.value
          const subject_name = this.subject_name.value
          const subject_age = this.subject_age.value
          const subject_sex = this.subject_sex.value
          const report_id = this.report_id.value
          const caseNumber = this.caseNumber.value
          const date = this.date.value
          const location = this.location.value
          const description = this.description.value
          const evidence = this.evidence.value
          const conclusions = this.conclusions.value
          this.props.createProduct(subject_id, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="subject_id"
              type="text"
              ref={(input) => { this.subject_id = input }}
              className="form-control"
              placeholder="Subject ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="subject_name"
              type="text"
              ref={(input) => { this.subject_name = input }}
              className="form-control"
              placeholder="Subject Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="subject_age"
              type="text"
              ref={(input) => { this.subject_age = input }}
              className="form-control"
              placeholder="Subject Age"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="subject_sex"
              type="text"
              ref={(input) => { this.subject_sex = input }}
              className="form-control"
              placeholder="Subject Sex"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="report_id"
              type="text"
              ref={(input) => { this.report_id = input }}
              className="form-control"
              placeholder="Report ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="caseNumber"
              type="text"
              ref={(input) => { this.caseNumber = input }}
              className="form-control"
              placeholder="Case Number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="date"
              type="text"
              ref={(input) => { this.date = input }}
              className="form-control"
              placeholder="Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="location"
              type="text"
              ref={(input) => { this.location = input }}
              className="form-control"
              placeholder="Location"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="description"
              type="text"
              ref={(input) => { this.description = input }}
              className="form-control"
              placeholder="Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="evidence"
              type="text"
              ref={(input) => { this.evidence = input }}
              className="form-control"
              placeholder="Evidence"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="conclusions"
              type="text"
              ref={(input) => { this.conclusions = input }}
              className="form-control"
              placeholder="Conclusions"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Report</button>
        </form>
        <p>&nbsp;</p>
        <h2>View Report</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Case Number</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="reportList">
            { this.props.reports.map((report, key) => {
              return(
                <><tr key={key}>
                  <th scope="row">{report.report_id.toString()}</th>
                  <td>{report.subject_name.toString()}</td>
                  <td>{report.caseNumber.toString()}</td>
                  <td>{report.owner.toString()}</td>
                  <td>
                    {<button
                      name={report.report_id}
                      value={key}
                      onClick={(event) => {
                        view=true;
                      } }
                    >
                      View
                    </button>}
                  </td>
                </tr>
                <main role="main" className="col-lg-12 d-flex">
                  {   (view)
                      ? null
                      //subject_id, owner, subject_name, subject_age, subject_sex, report_id, caseNumber, date, location, description, evidence, conclusions
                      : <View
                        sub_id={report.subject_id.toString()}
                        owner={report.owner.toString()}
                        name={report.subject_name.toString()}
                        age={report.subject_age.toString()}
                        sex={report.subject_sex.toString()}
                        rep_id={report.report_id.toString()}
                        case_no={report.caseNumber.toString()}
                        date={report.date.toString()}
                        loaction={report.location.toString()}
                        desc={report.description.toString()}
                        evidence={report.evidence.toString()}
                        conclusions={report.conclusions.toString()}
                         />
                  }
                  {view=false}
                </main>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
