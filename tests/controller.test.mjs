import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
const file = new URL('../Assets/Scripts/PunchlistController.ts', import.meta.url);
const dependency = new URL('../Assets/Scripts/PunchlistState.ts', import.meta.url);
let source = stripTypeScriptTypes(await readFile(file, 'utf8'), { mode: 'transform' });
source = source.replace("'./PunchlistState'", JSON.stringify(dependency.href));
const { PunchlistController } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
test('view events render correct state and dispose removes subscriptions', () => {
  const toggles = new Set(), resets = new Set();
  let snapshot, renderCount = 0;
  const view = {
    render(value) { snapshot = value; renderCount++; },
    onToggle(fn) { toggles.add(fn); return () => toggles.delete(fn); },
    onReset(fn) { resets.add(fn); return () => resets.delete(fn); },
  };
  const controller = new PunchlistController(view, [{ id: 'a', label: 'Synthetic A' }]);
  assert.equal(snapshot.remaining, 1);
  toggles.forEach(fn => fn('a'));
  assert.equal(snapshot.allCompleted, true);
  const before = renderCount;
  toggles.forEach(fn => fn('unknown'));
  assert.equal(renderCount, before);
  resets.forEach(fn => fn());
  assert.equal(snapshot.remaining, 1);
  controller.dispose(); controller.dispose();
  assert.equal(toggles.size, 0);
  assert.equal(resets.size, 0);
});
