export default class HomeIndex extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to your republic app!</h1>

        <p>You have seen this page {this.props.pageViews} times.</p>
      </div>
    );
  }
}
