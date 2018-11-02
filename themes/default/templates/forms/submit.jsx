const React = require("react");
const Item = require("./item");
class Submit extends React.Component {
  render() {
    return (
      <form method={this.props.method} action={this.props.action}>
        {this.props.items.map((item, key) => (
          <Item key={key} {...item} />
        ))}
      </form>
    );
  }
}
module.exports = Submit;
