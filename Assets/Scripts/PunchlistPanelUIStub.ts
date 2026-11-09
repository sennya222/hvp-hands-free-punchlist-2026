import type { PunchlistView } from './PunchlistController';
import type { PunchlistSnapshot } from './PunchlistState';

/** Rendering/event ports supplied by the real SIK/UIKit component after import. */
export interface PunchlistBindings {
  setTitle(value: string): void;
  setCounter(value: string): void;
  setRows(rows: ReadonlyArray<{ id: string; text: string; checked: boolean }>): void;
  setComplete(value: boolean): void;
  subscribeToggle(handler: (id: string) => void): () => void;
  subscribeReset(handler: () => void): () => void;
}

/** Stub adapter only: does not create a scene, draw UI, or simulate pinches. */
export class PunchlistPanelUIStub implements PunchlistView {
  constructor(private readonly bindings: PunchlistBindings) {}
  render(snapshot: PunchlistSnapshot): void {
    this.bindings.setTitle('Training punchlist');
    this.bindings.setCounter(snapshot.allCompleted ? 'All checks completed' : `${snapshot.remaining} of ${snapshot.total} remaining`);
    this.bindings.setRows(snapshot.items.map(item => ({ id: item.id, text: item.label, checked: item.completed })));
    this.bindings.setComplete(snapshot.allCompleted);
  }
  onToggle(handler: (id: string) => void): () => void { return this.bindings.subscribeToggle(handler); }
  onReset(handler: () => void): () => void { return this.bindings.subscribeReset(handler); }
}
