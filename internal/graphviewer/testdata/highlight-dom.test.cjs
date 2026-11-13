const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.resolve(__dirname, '../../../static/js/graphviewer.js'), 'utf8');
// Exercise the production DOM updater without introducing a browser dependency.
const { highlight } = new Function(
  source.slice(source.indexOf('const clearHighlight ='), source.indexOf('const fit =')) +
  '\nreturn { highlight };',
)();

function element(dataset) {
  const classes = new Set();
  return {
    dataset,
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      toggle: (name, active) => active ? classes.add(name) : classes.delete(name),
      contains: (name) => classes.has(name),
    },
  };
}

test('applies supplied membership, induced reference edges, and clears stale highlights', () => {
  const nodes = ['operator', 'permission', 'parent', 'owner', 'user', 'unrelated'].map(node => element({ node }));
  nodes[0].dataset.highlightNodes = 'operator permission parent owner';
  nodes[4].dataset.highlightNodes = 'user';
  const edges = [
    ['operator', 'permission'], ['operator', 'parent'], ['operator', 'owner'],
    ['parent', 'permission'], // Active even though it does not touch the selection.
    ['owner', 'user'], ['permission', 'unrelated'],
  ].map(([from, to]) => element({ from, to }));
  const root = element({});
  root.querySelectorAll = () => [...nodes, ...edges].filter(item => item.classList.contains('is-highlighted'));
  const state = { root, nodes, edges };
  const active = items => items.map(item => item.classList.contains('is-highlighted'));

  highlight(state, nodes[0]);
  assert.deepEqual(active(nodes), [true, true, true, true, false, false]);
  assert.deepEqual(active(edges), [true, true, true, true, false, false]);
  assert.equal(root.classList.contains('is-highlighting'), true);

  highlight(state, nodes[4]);
  assert.deepEqual(active(nodes), [false, false, false, false, true, false]);
  assert.deepEqual(active(edges), [false, false, false, false, false, false]);

  highlight(state, null);
  assert.equal(root.classList.contains('is-highlighting'), false);
  assert.equal(active(nodes).some(Boolean), false);
  assert.equal(active(edges).some(Boolean), false);
});
