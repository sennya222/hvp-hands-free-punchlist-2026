# Native Preview fallback integration

Prepared after the editor restart, without contacting MCP or switching Preview. This is a rendering/input diagnostic and a small manual checklist implementation. It does not establish spatial SIK pinch support, a working SPECS environment, successful rendering or a complete contest entry.

`PunchlistNativePreview.ts` is a real BaseScriptComponent using Text and InteractionComponent declarations from the saved project's Lens Studio 5.24 StudioLib.d.ts. InteractionComponent.onTap.add returns EventRegistration, removed through onTap.remove on destruction. These signatures were read from the local SDK; runtime compilation remains pending.

After the refreshed MCP configuration is available:

1. Verify the open saved project and camera/tracking state before writes. Use ordinary native Preview image/video input first; do not repeat the failed Interactive environment switch during this diagnostic.
2. Import all four source modules through Lens Studio's proper asset import. Ask the native compiler for errors before adding the component. No package-specific imports are required by this fallback.
3. Discover actual Text/scene presets through the live schema. Create a title, counter, three row Text objects and a Reset Text object beside the synthetic workpiece. Keep these anchored in the scene, not parented to the camera. Add an InteractionComponent to each row and Reset object. Register each Text as its target with addMeshVisual; set its rendering Camera if needed. Large minimum touch bounds may be set through setMinimumTouchSize after checking the SDK.
4. Once the real component IDs exist and TypeScript input slots have compiled, wire titleText, statusText, rowText0–2, rowTarget0–2, resetText and resetTarget in one batched VirtualScene modify. Use component-typed references, not SceneObject references. Individual fields avoid the tool limitation on array input wiring. Do not guess IDs/preset names or use screenshots to estimate input coordinates.
5. A native tap toggles its row and updates the count; Reset clears everything. Check the ready log line, then inspect a fresh native Preview capture and test each action. Until then maintain Preview NOT VERIFIED.

The synthetic labels are engineering defaults. They claim no actual inspection or defect detection. This fallback may be used for honest native-render evidence, but requires further SIK/UIKit work before claiming the original spatial interaction criteria.

Official references: [Touch and Interactions](https://developers.snap.com/lens-studio/features/scripting/touch-input), [Script Components](https://developers.snap.com/lens-studio/features/scripting/script-components).
