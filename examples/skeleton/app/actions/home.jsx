export function loadIndex() {
  return actions.state.merge(function ({ pageViews }) {
    if (pageViews) {
      pageViews += 1;
    } else {
      pageViews = 1;
    }

    return { pageViews };
  });
}
