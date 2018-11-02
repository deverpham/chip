const React = require("react");
const Item = require("./helpers/item.jsx");
const Input = require("./input");
const {
  Button,
  FormControl,
  FormGroup,
  ControlLabel
} = require("react-bootstrap");
class Form extends React.Component {
  constructor() {
    super();
    this.fkprop = {
      title: "thinh",
      inputs: [
        {
          nodeName: "label",
          innerText: "User Name",
          className: "form-control"
        },
        {
          nodeName: "input",
          innerText: "",
          className: "form-control"
        }
      ]
    };
    this.state = {
      value: "thinh"
    };
  }
  render() {
    return <div className="text-primary">Hello madam</div>;
  }
}
module.exports = Form;
