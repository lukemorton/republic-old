export function loadWorld() {
  return actions.state.merge(function ({ world }) {
    if (world) {
      world += 1;
    } else {
      world = 1;
    }

    console.log('loadWorld');

    return { world };
  });
}
