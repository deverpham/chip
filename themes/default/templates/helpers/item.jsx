const React = require("react");
class Item extends React.Component {
  componentWillMount() {
    this.item = this.props.input;
    console.log(this.props);
  }
  render() {
    console.log(HANDLER);
    switch (this.item.nodeName) {
      default: {
        return (
          <div
            className={this.item.className}
            dangerouslySetInnerHTML={{
              __html: `<${this.item.nodeName}>${this.item.innerText}</${
                this.item.nodeName
              }>`
            }}
          />
        );
      }
    }
  }
}
module.exports = Item;
