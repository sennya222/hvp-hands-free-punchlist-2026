// Engineering candidate only; not attached to a Lens Studio scene.
// No recognition, network, user data or cross-session persistence.
export type PunchlistItem = Readonly<{ id: string; label: string }>;
export type PunchlistSnapshot = Readonly<{
  items: ReadonlyArray<Readonly<{ id: string; label: string; completed: boolean }>>;
  remaining: number;
  total: number;
  allCompleted: boolean;
}>;

export class PunchlistState {
  private readonly items: PunchlistItem[];
  private readonly completed = new Set<string>();

  constructor(items: ReadonlyArray<PunchlistItem>) {
    if (items.length === 0) throw new Error('At least one item is required.');
    const ids = new Set<string>();
    this.items = items.map(item => {
      if (!item.id.trim() || !item.label.trim() || ids.has(item.id)) {
        throw new Error('Items need unique nonempty IDs and nonempty labels.');
      }
      ids.add(item.id);
      return { id: item.id, label: item.label };
    });
  }

  // Bind to a standard SIK/UI Kit button only after the design is approved.
  toggle(id: string): boolean {
    if (!this.items.some(item => item.id === id)) return false;
    if (this.completed.has(id)) this.completed.delete(id);
    else this.completed.add(id);
    return true;
  }

  reset(): void { this.completed.clear(); }

  snapshot(): PunchlistSnapshot {
    return {
      items: this.items.map(item => ({ ...item, completed: this.completed.has(item.id) })),
      remaining: this.items.length - this.completed.size,
      total: this.items.length,
      allCompleted: this.completed.size === this.items.length,
    };
  }
}
