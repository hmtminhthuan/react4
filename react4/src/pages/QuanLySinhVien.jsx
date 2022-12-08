import React, { Component } from "react";
import Table from "./Table";
export default class QuanLySinhVien extends Component {

  state = {
    formValue: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },

    formError: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    valid: false,

    arrSV: [
      {
        id: "001",
        name: "Huynh Minh Thuan",
        phone: "0989123456",
        email: "hmt123@gmail.com",
      },
      {
        id: "002",
        name: "Huynh Thuan",
        phone: "0989123457",
        email: "hmt123456@gmail.com",
      },
    ],
  };

  renderDSSV() {
    let arrv = this.state.arrSV;
    return arrv.map(({ id, name, phone, email }, index) => {
      console.log({ id });
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.handleDelSV(id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                let SVEdit = {
                  id,
                  name,
                  phone,
                  email,
                };
                this.handleEditSV(SVEdit);
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
          </td>
        </tr>
      );
    })
  }
  checkFormValid = () => {
    let { formError, formValue } = this.state;
    for (let key in formError) {
      if (formError[key] !== "" || formValue[key] === "") {
        return false;
      }
    }
    return true;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.checkFormValid()) {
      alert("Form is invalid");
      return;
    }

    let arrSV = this.state.arrSV;
    for (let key of arrSV) {
      if (this.state.formValue.id == key.id) return;
    }
    let newArrSV = { ...this.state.formValue };
    arrSV.push(newArrSV);
    await this.setState({
      arrSV: arrSV,
    })
    console.log('SUBMIT', this.state.arrSV)
  };

  handleChangeInput = (e) => {
    let { value, name, type } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let dataMaxLength = e.target.getAttribute("data-max-length");

    let newFormValue = this.state.formValue;

    newFormValue[name] = value;

    let newFormError = this.state.formError;
    let message = "";
    if (value.trim() === "") {
      message = name + " cannot be blank!";
    } else {

      if (dataType == "number") {
        let regexPhoneNumber = /^\d+(,\d{1,2})?$/;
        if (!regexPhoneNumber.test(value)) {
          message = name + " is invalid";
        }
      }

      if (dataMaxLength != null && value.length > dataMaxLength) {
        message = name + ` cannot be greater than ${dataMaxLength} characters!`;
      }

      if (type == "email") {
        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regexEmail.test(value)) {
          message = name + " is invalid";
        }
      }
    }

    newFormError[name] = message;

    this.setState({
      formValue: newFormValue,
      formError: newFormError,
    },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        })
      });
    console.log(name, value);
  };

  handleEditSV = (SVClick) => {
    this.setState({
      formValue: SVClick,
      arrSV: this.state.arrSV,
    },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        })
      });
    console.log('COPY', this.state.arrSV)
  }

  handleUpdateSV = async () => {
    let { arrSV, formValue } = this.state;
    let SVUpdate = arrSV.find(sv => sv.id === formValue.id);

    if (SVUpdate) {
      for (let key in SVUpdate) {
        if (key !== 'id') {
          SVUpdate[key] = formValue[key];
        }
      }
    }

    await this.setState({
      arrSV: arrSV
    })
    console.log('UPDATE', this.state.arrSV)
  }

  handleDelSV = async (idClick) => {
    let arrSV = this.state.arrSV.filter(
      (sv) => sv.id != idClick
    );
    await this.setState({
      arrSV: arrSV
    })

    await console.log('DEL', this.state.arrSV);
  }


  render() {
    let { formValue } = this.state;
    let arrSV = this.state.arrSV;
    console.log("QL", arrSV);
    return (
      <>
        <form className="container" onSubmit={this.handleSubmit} >
          <h3 className="text-center bg-dark text-white py-3">
            Thông tin sinh viên
          </h3>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p className=" fs-5">Mã SV</p>
                <input
                  className="form-control"
                  name="id"
                  value={formValue.id}
                  onInput={this.handleChangeInput}
                  type="masv"
                  data-max-length="6"
                />
                {this.state.formError.id && (
                  <div className="alert alert-danger mt-2">
                    {this.state.formError.id}
                  </div>
                )}
              </div>
              <div className="form-group">
                <p className=" fs-5 mt-3">Số điện thoại</p>
                <input
                  className="form-control"
                  name="phone"
                  value={formValue.phone}
                  onInput={this.handleChangeInput} data-type="number"
                />
                {this.state.formError.phone && (
                  <div className="alert alert-danger mt-2">
                    {this.state.formError.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p className=" fs-5">Họ và tên</p>
                <input
                  className="form-control"
                  name="name"
                  value={formValue.name}
                  onInput={this.handleChangeInput}
                />
                {this.state.formError.name && (
                  <div className="alert alert-danger mt-2">
                    {this.state.formError.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <p className="fs-5 mt-3">Email</p>
                <input
                  className="form-control"
                  name="email"
                  value={formValue.email}
                  onInput={this.handleChangeInput} type="email"
                />
                {this.state.formError.email && (
                  <div className="alert alert-danger mt-2">
                    {this.state.formError.email}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-success" type="submit" disabled={!this.state.valid}
              >
                Thêm sinh viên
              </button>
              <button className="btn btn-success mx-3" type="button" disabled={!this.state.valid}
                onClick={() => {
                  this.handleUpdateSV();
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-3">
          <div>
            <table className="table">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Mã SV</th>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Delete</th>
                  <th>Copy</th>
                </tr>
              </thead>
              <tbody>{this.renderDSSV()}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
