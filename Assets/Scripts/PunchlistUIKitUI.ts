import { Button } from 'UIKit.lspkg/Scripts/Components/Button/Button';
import { ElementContent, TextAlignment } from 'UIKit.lspkg/Scripts/Components/Content/ElementContent';
import { addContentToElement } from 'UIKit.lspkg/Scripts/Components/Content/ElementContentFactory';
import { FlexLayout } from 'UIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout';
import { FlexItem } from 'UIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem';
import { FlexAlign, FlexDirection, FlexJustify } from 'UIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes';
import { System3 } from 'UIKit.lspkg/Scripts/Themes/System-3.0/System3';
import { ThemeService } from 'UIKit.lspkg/Scripts/Themes/ThemeService';
import { CanvasController } from 'UIKit.lspkg/Scripts/Utility/CanvasController';
import { createChildSceneObjectWithParentLayer } from 'UIKit.lspkg/Scripts/Utility/SceneUtilities';
import { RoundedRectangle } from 'UIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle';
import WorldCameraFinderProvider from 'InteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider';
import { PunchlistController, type PunchlistView } from './PunchlistController';
import type { PunchlistSnapshot } from './PunchlistState';

const DEMO_ITEMS = [
  { id: 'label', label: 'Sample label' },
  { id: 'fastener', label: 'Sample fastener' },
  { id: 'edge', label: 'Sample edge' },
];

/**
 * Attach once to an enabled, identity-scale, world-root SceneObject.
 * Creates a fixed world-space panel 80 cm along the host's local -Z axis.
 * Requires the installed InteractionKit prefab, a World-tracked camera,
 * Spectacles platform/Preview override, and UIKit's companion packages.
 * No input wiring, external assets, recognition, network or persistence.
 * Source-reviewed against the installed UIKit/InteractionKit revision;
 * Preview/device rendering and interaction still require verification.
 */
@component
export class PunchlistUIKitUI extends BaseScriptComponent implements PunchlistView {
  @input nativePreviewControls: boolean = true;
  private panel: SceneObject | null = null;
  private canvas: CanvasController | null = null;
  private controller: PunchlistController | null = null;
  private counter: ElementContent | null = null;
  private readonly rowLabels: ElementContent[] = [];
  private readonly buttonUnsubscribe: Array<() => void> = [];
  private readonly toggleHandlers = new Set<(id: string) => void>();
  private readonly resetHandlers = new Set<() => void>();
  private readonly nativeControls: Array<{ id: string; host: SceneObject }> = [];
  private latestSnapshot: PunchlistSnapshot | null = null;
  private disposed = false;

  onAwake(): void {
    if (this.nativePreviewControls) global.touchSystem.touchBlocking = true;
    this.createEvent('OnDestroyEvent').bind(() => this.dispose());
    this.createEvent('OnStartEvent').bind(() => {
      if (this.disposed) return;
      try {
        this.buildPanel();
        this.controller = new PunchlistController(this, DEMO_ITEMS);
        print('PUNCHLIST_UIKIT_BUILT: 3 synthetic checks; verify Preview and IK triggers.');
      } catch (error) {
        print(`PUNCHLIST_UIKIT_BUILD_ERROR: ${String(error)}`);
        this.dispose();
      }
    });
  }

  render(snapshot: PunchlistSnapshot): void {
    this.latestSnapshot = snapshot;
    if (this.disposed || !this.counter) return;
    this.counter.text = snapshot.allCompleted
      ? `All ${snapshot.total} checks complete`
      : `${snapshot.remaining} of ${snapshot.total} remaining`;
    snapshot.items.forEach((item, index) => {
      const label = this.rowLabels[index];
      if (label) label.text = `${item.completed ? '[x]' : '[ ]'} ${item.label}`;
    });
  }

  onToggle(handler: (id: string) => void): () => void {
    this.toggleHandlers.add(handler);
    return () => { this.toggleHandlers.delete(handler); };
  }

  onReset(handler: () => void): () => void {
    this.resetHandlers.add(handler);
    return () => { this.resetHandlers.delete(handler); };
  }

  private buildPanel(): void {
    ThemeService.getInstance().setTheme(System3);
    const panel = createChildSceneObjectWithParentLayer('PunchlistUIKitPanel', this.sceneObject);
    this.panel = panel;
    // Placement of the whole panel only; every UI sibling is Flex-managed.
    panel.getTransform().setLocalPosition(new vec3(0, 0, -80));
    this.canvas = new CanvasController(panel);
    this.canvas.ensure(new vec2(34, 36));

    const backing = panel.createComponent(RoundedRectangle.getTypeName()) as RoundedRectangle;
    backing.size = new vec2(34, 36);
    backing.cornerRadius = 1.2;
    backing.backgroundColor = new vec4(0.025, 0.035, 0.06, 1);
    backing.initialize();

    const contentRoot = createChildSceneObjectWithParentLayer('Content', panel);
    // One deliberate layer offset; Flex preserves Z. Clear the backing plane.
    contentRoot.getTransform().setLocalPosition(new vec3(0, 0, 0.3));
    const column = contentRoot.createComponent(FlexLayout.getTypeName()) as FlexLayout;
    column.direction = FlexDirection.Column;
    column.width = 32;
    column.height = 34;
    column.justifyContent = FlexJustify.Center;
    column.alignItems = FlexAlign.Stretch;
    column.rowGap = 0.7;

    this.createLabel(contentRoot, 'Title', 'Training punchlist', 3.2, 54);
    this.counter = this.createLabel(contentRoot, 'Counter', '3 of 3 remaining', 3, 46);
    DEMO_ITEMS.forEach((item, index) => {
      const row = this.createButton(contentRoot, `Check${index + 1}`, `[ ] ${item.label}`, 5, 52);
      this.rowLabels.push(row.content);
      this.nativeControls.push({ id: item.id, host: row.button.sceneObject });
      this.buttonUnsubscribe.push(this.subscribeButton(row.button, () => {
        if (!this.disposed) this.toggleHandlers.forEach(handler => handler(item.id));
      }));
    });
    const reset = this.createButton(contentRoot, 'Reset', 'Reset checks', 4.5, 48);
    this.nativeControls.push({ id: 'reset', host: reset.button.sceneObject });
    this.buttonUnsubscribe.push(this.subscribeButton(reset.button, () => {
      if (!this.disposed) this.resetHandlers.forEach(handler => handler());
    }));
    this.createLabel(contentRoot, 'DemoNote', this.nativePreviewControls ? 'Native tap preview / synthetic demo' : 'Synthetic training demo', 2, 32);
    column.refreshChildren();
    column.forceLayout();
    if (this.nativePreviewControls) {
      const firstFrame = this.createEvent('DelayedCallbackEvent');
      firstFrame.bind(() => {
        if (this.disposed) return;
        try {
          const camera = WorldCameraFinderProvider.getInstance().getComponent();
          // Place once after the Preview camera has settled; keep the panel in world space.
          const cameraTransform = camera.getTransform();
          panel.getTransform().setWorldPosition(cameraTransform.getWorldTransform().multiplyPoint(new vec3(0, 0, -80)));
          panel.getTransform().setWorldRotation(cameraTransform.getWorldRotation());
          const targets = this.nativeControls.map(control => {
            const visual = control.host.getComponent('Component.RenderMeshVisual');
            const mesh = visual.mesh;
            const center = mesh.aabbMin.add(mesh.aabbMax).uniformScale(0.5);
            const screen = camera.worldSpaceToScreenSpace(control.host.getTransform().getWorldTransform().multiplyPoint(center));
            return { id: control.id, x: screen.x, y: screen.y, inFrame: screen.x >= 0 && screen.x <= 1 && screen.y >= 0 && screen.y <= 1 };
          });
          print('PUNCHLIST_NATIVE_TARGETS ' + JSON.stringify(targets));
        } catch (error) { print('PUNCHLIST_PROJECTION_ERROR ' + String(error)); }
      });
      firstFrame.reset(1.5);
    }
    if (this.latestSnapshot) this.render(this.latestSnapshot);
  }

  private createItem(parent: SceneObject, name: string, height: number): SceneObject {
    const object = createChildSceneObjectWithParentLayer(name, parent);
    const item = object.createComponent(FlexItem.getTypeName()) as FlexItem;
    item.overrideHeight = height;
    item.flexShrink = 0;
    return object;
  }

  private subscribeButton(button: Button, handler: () => void): () => void {
    if (!this.nativePreviewControls) return button.onTriggerUp.add(handler);
    const host = button.sceneObject;
    const visual = host.getComponent('Component.RenderMeshVisual');
    if (!visual) throw new Error('UIKit button has no native visual for touch targeting.');
    // Wearable InteractionComponent taps select the gaze target. For the explicitly
    // labelled desktop mode, handle real Preview touch events against projected bounds.
    const touch = this.createEvent('TapEvent');
    touch.bind(event => {
      if (this.disposed) return;
      const camera = WorldCameraFinderProvider.getInstance().getComponent();
      const matrix = host.getTransform().getWorldTransform();
      const mesh = visual.mesh;
      const a = camera.worldSpaceToScreenSpace(matrix.multiplyPoint(mesh.aabbMin));
      const b = camera.worldSpaceToScreenSpace(matrix.multiplyPoint(mesh.aabbMax));
      const point = event.getTapPosition();
      if (point.x >= Math.min(a.x, b.x) && point.x <= Math.max(a.x, b.x)
          && point.y >= Math.min(a.y, b.y) && point.y <= Math.max(a.y, b.y)) {
        print('PUNCHLIST_NATIVE_TAP ' + host.name);
        handler();
      }
    });
    return () => { touch.enabled = false; };
  }

  private createLabel(parent: SceneObject, name: string, text: string, height: number, textSize: number): ElementContent {
    const object = this.createItem(parent, name, height);
    const content = addContentToElement(object, {
      text,
      textAlignment: TextAlignment.Center,
      textSize,
      sizeOverride: new vec2(32, height),
    });
    content.useTextColorOverride = true;
    content.textColorOverride = new vec4(1, 1, 1, 1);
    content.padding = { top: 0, right: 0.4, bottom: 0, left: 0.4 };
    return content;
  }

  private createButton(parent: SceneObject, name: string, text: string, height: number, textSize: number): { button: Button; content: ElementContent } {
    const object = this.createItem(parent, name, height);
    const button = object.createComponent(Button.getTypeName()) as Button;
    button.setVariant({ theme: 'System3', shape: 'Rectangle', style: 'Primary' });
    button.size = new vec3(32, height, 0.2);
    button.initialize();
    const content = addContentToElement(object, {
      text,
      textAlignment: TextAlignment.Center,
      textSize,
    });
    return { button, content };
  }

  private dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.controller?.dispose();
    this.controller = null;
    this.buttonUnsubscribe.splice(0).forEach(unsubscribe => unsubscribe());
    this.toggleHandlers.clear();
    this.resetHandlers.clear();
    this.rowLabels.length = 0;
    this.nativeControls.length = 0;
    this.counter = null;
    this.canvas?.release();
    this.canvas = null;
    if (this.panel && !isNull(this.panel)) this.panel.destroy();
    this.panel = null;
  }
}

