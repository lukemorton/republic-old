export default class ApplicationLayout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Brand</Link>
        </header>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}
