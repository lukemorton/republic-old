export default class World extends React.Component {
  render() {
    return (
      <div>
        Hello World: {this.props.world}
        <Link to="/test">Test</Link>
      </div>
    );
  }
}
