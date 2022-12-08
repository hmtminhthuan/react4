import React, { Component } from "react";
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { arrSV: props.arrSV };
  }

  shouldComponentUpdate(newProps, currentState) {
    if (this.props.like === newProps.like) {
      return false;
    }
    console.log("shouldComponentUpdate child");
    return true;
  }

  render() {
    const { arrSVV, handleEditSV, handleDelSV } = this.props;
    let arrSV1 = this.props.arrSV;
    const renderDSSV = (arrSV) => {
      console.log("Table", this.props.arrSV);
      return arrSV.map(({ id, name, phone, email }, index) => {
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
                  handleDelSV(id);
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
                  handleEditSV(SVEdit);
                }}
              >
                <i className="fa fa-edit"></i>
              </button>
            </td>
          </tr>
        );
      });
    };

    return (
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
          <tbody>{renderDSSV(arrSV1)}</tbody>
        </table>
      </div>
    );
  }
}
