import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
const source = stripTypeScriptTypes(await readFile(new URL('../Assets/Scripts/PunchlistPanelUIStub.ts', import.meta.url), 'utf8'), { mode: 'transform' });
const { PunchlistPanelUIStub } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
test('UI port renders remaining and completed states without inventing scene state', () => {
  let counter, rows, complete;
  const ui = new PunchlistPanelUIStub({
    setTitle() {}, setCounter(v) { counter = v; }, setRows(v) { rows = v; }, setComplete(v) { complete = v; },
    subscribeToggle() { return () => {}; }, subscribeReset() { return () => {}; },
  });
  ui.render({ items: [{ id: 'a', label: 'Synthetic A', completed: false }], total: 1, remaining: 1, allCompleted: false });
  assert.equal(counter, '1 of 1 remaining'); assert.equal(complete, false); assert.equal(rows[0].checked, false);
  ui.render({ items: [{ id: 'a', label: 'Synthetic A', completed: true }], total: 1, remaining: 0, allCompleted: true });
  assert.equal(counter, 'All checks completed'); assert.equal(complete, true); assert.equal(rows[0].checked, true);
});
