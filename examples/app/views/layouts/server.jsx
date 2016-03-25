export default class ServerLayout extends React.Component {
  render() {
    return (
      <html>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}
