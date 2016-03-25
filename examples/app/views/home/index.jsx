export default class HomeIndex extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>

        <p>Hello World: {this.props.world}</p>
      </div>
    );
  }
}
