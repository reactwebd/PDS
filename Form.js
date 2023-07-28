import React, { Component } from "react";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      type: "Profit",
      subject: "",
      marks: 0,
      amount: 0,
    };
  }

  handleDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleSubjectChange = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };

  handleMarksChange = (e) => {
    this.setState({
      marks: e.target.value,
    });
  };

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.date === "" &&
      this.state.type === "" &&
      this.state.subject === "" &&
      this.state.marks === 0 &&
      this.state.amount === 0
    ) {
      alert("Please fill the form");
    } else {
      console.log(
        this.state.type,
        this.state.date,
        this.state.subject,
        this.state.marks,
        this.state.amount
      );
      let markobj = {
        Type: this.state.type,
        Date: this.state.date,
        Subject: this.state.subject,
        Marks: this.state.marks,
        Amount: this.state.amount,
      };
      fetch("http://localhost:8000/api/exam_entris", {
        method: "POST",
        body: JSON.stringify(markobj),
        // headers : {
        //     "ContentType" : "application/json"
        // }
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              onChange={this.handleDateChange}
            />
          </div>
          <div className="mb-3">
            <select className="form-select" onChange={this.handleTypeChange}>
              <option>Profit</option>
              <option>Loss</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleSubjectChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Marks
            </label>
            <input
              type="number"
              className="form-control"
              onChange={this.handleMarksChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              onChange={this.handleAmountChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
}

