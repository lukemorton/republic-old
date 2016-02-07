export default function World(props) {
  return (
    <div>
      Hello World: {props.world}
      <Link to="/test">Test</Link>
    </div>
  );
}
