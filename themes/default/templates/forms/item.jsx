const React = require("react");
const {
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
  Button
} = require("reactstrap");
class Item extends React.Component {
  render() {
    switch (this.props.class) {
      case "input": {
        return (
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {this.props.label}
            </InputGroupAddon>
            <Input {...this.props.props} />
          </InputGroup>
        );
      }
      case "button": {
        return <Button {...this.props.props}>{this.props.label}</Button>;
      }
      default: {
        return null;
      }
    }
  }
}
module.exports = Item;
