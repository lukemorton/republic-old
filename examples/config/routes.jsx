import { Route, IndexRoute, Link } from 'react-router';

export default function Hello() {
  return (
    <div>
      Hello World
      <Link to="/test">Test</Link>
    </div>
  );
}

export default function Test() {
  return (
    <div>
      test
      <Link to="/">Hello</Link>
    </div>
  );
}

export default (
  <Route path="/">
    <IndexRoute component={Hello} />
    <Route path="test" component={Test} />
  </Route>
);
