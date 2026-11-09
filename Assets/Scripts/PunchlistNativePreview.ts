import { PunchlistController } from './PunchlistController';
import { PunchlistPanelUIStub } from './PunchlistPanelUIStub';

/** Native Preview fallback. Real Text/InteractionComponent SDK; not a SIK gesture test. */
@component
export class PunchlistNativePreview extends BaseScriptComponent {
  @input titleText: Text;
  @input statusText: Text;
  @input rowText0: Text;
  @input rowText1: Text;
  @input rowText2: Text;
  @input rowTarget0: InteractionComponent;
  @input rowTarget1: InteractionComponent;
  @input rowTarget2: InteractionComponent;
  @input resetText: Text;
  @input resetTarget: InteractionComponent;
  private controller: PunchlistController | null = null;

  onAwake(): void {
    const rowTexts = [this.rowText0, this.rowText1, this.rowText2];
    const rowTargets = [this.rowTarget0, this.rowTarget1, this.rowTarget2];
    if (!this.titleText || !this.statusText || !this.resetText || !this.resetTarget ||
        rowTexts.some(row => !row) || rowTargets.some(target => !target)) {
      print('PUNCHLIST_BINDING_ERROR: three real Text/InteractionComponent rows are required.');
      return;
    }
    const items = [
      { id: 'label', label: 'Check the sample label' },
      { id: 'fastener', label: 'Check the sample fastener' },
      { id: 'edge', label: 'Check the sample edge' },
    ];
    this.resetText.text = 'Reset checks';
    const view = new PunchlistPanelUIStub({
      setTitle: title => { this.titleText.text = title + ' / synthetic demo'; },
      setCounter: text => { this.statusText.text = text; },
      setRows: rows => rows.forEach((row, index) => {
        rowTexts[index].text = `${row.checked ? '[x]' : '[ ]'} ${row.text}`;
      }),
      setComplete: () => {},
      subscribeToggle: handler => {
        const registrations = rowTargets.map((target, index) => ({
          target, registration: target.onTap.add(() => handler(items[index].id)),
        }));
        return () => registrations.forEach(({ target, registration }) => target.onTap.remove(registration));
      },
      subscribeReset: handler => {
        const registration = this.resetTarget.onTap.add(() => handler());
        return () => this.resetTarget.onTap.remove(registration);
      },
    });
    this.controller = new PunchlistController(view, items);
    this.createEvent('OnDestroyEvent').bind(() => {
      this.controller?.dispose();
      this.controller = null;
    });
    print('PUNCHLIST_NATIVE_PREVIEW_READY: three synthetic checks; native tap input only.');
  }
}
