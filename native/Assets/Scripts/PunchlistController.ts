import { PunchlistState, type PunchlistItem, type PunchlistSnapshot } from './PunchlistState';

// SDK-neutral seam. CLAD implements this with actual SIK/UI Kit components.
export interface PunchlistView {
  render(snapshot: PunchlistSnapshot): void;
  onToggle(handler: (id: string) => void): () => void;
  onReset(handler: () => void): () => void;
}

export class PunchlistController {
  private readonly state: PunchlistState;
  private readonly unsubscribe: Array<() => void>;
  private disposed = false;

  constructor(private readonly view: PunchlistView, items: ReadonlyArray<PunchlistItem>) {
    this.state = new PunchlistState(items);
    this.unsubscribe = [
      view.onToggle(id => {
        if (!this.disposed && this.state.toggle(id)) this.view.render(this.state.snapshot());
      }),
      view.onReset(() => {
        if (!this.disposed) { this.state.reset(); this.view.render(this.state.snapshot()); }
      }),
    ];
    view.render(this.state.snapshot());
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.unsubscribe.forEach(remove => remove());
  }
}
