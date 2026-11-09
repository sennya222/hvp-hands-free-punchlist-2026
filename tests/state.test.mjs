import test from 'node:test';
import assert from 'node:assert/strict';
import { PunchlistState } from '../Assets/Scripts/PunchlistState.ts';
const syntheticItems = [{ id: 'a', label: 'Synthetic A' }, { id: 'b', label: 'Synthetic B' }];

test('toggle is reversible; counts and completion follow visible item state', () => {
  const model = new PunchlistState(syntheticItems);
  assert.equal(model.snapshot().remaining, 2);
  model.toggle('a');
  assert.equal(model.snapshot().remaining, 1);
  model.toggle('b');
  assert.equal(model.snapshot().allCompleted, true);
  model.toggle('a');
  assert.equal(model.snapshot().allCompleted, false);
  assert.equal(model.snapshot().remaining, 1);
});
test('unknown ID cannot change state; reset and a new instance clear progress', () => {
  const model = new PunchlistState(syntheticItems);
  assert.equal(model.toggle('missing'), false);
  model.toggle('a');
  model.reset();
  assert.equal(model.snapshot().remaining, 2);
  assert.equal(new PunchlistState(syntheticItems).snapshot().remaining, 2);
});
test('caller cannot mutate model through input or a snapshot', () => {
  const input = [{ id: 'x', label: 'Synthetic X' }];
  const model = new PunchlistState(input);
  input[0].label = 'changed';
  const copy = model.snapshot();
  copy.items[0].label = 'changed again';
  copy.items[0].completed = true;
  assert.equal(model.snapshot().items[0].label, 'Synthetic X');
  assert.equal(model.snapshot().remaining, 1);
});
test('invalid item sets fail before construction', () => {
  assert.throws(() => new PunchlistState([]));
  assert.throws(() => new PunchlistState([{ id: 'a', label: ' ' }]));
  assert.throws(() => new PunchlistState([{ id: 'a', label: 'A' }, { id: 'a', label: 'B' }]));
});

