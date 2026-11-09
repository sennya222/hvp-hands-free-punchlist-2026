# Hands-free Punchlist

**WORK IN PROGRESS — native Lens Studio / SPECS Preview has not been verified. This repository is not a completed contest submission.**

A manual three-item checklist intended to sit beside one synthetic training object in AR. The user checks the object, marks the corresponding item, and sees how many checks remain. It does not detect defects or recognize objects.

## One useful spatial moment

1. Stand beside a clearly labelled synthetic workpiece and read its three nearby checks.
2. Inspect the object and toggle the matching check; the remaining count updates.
3. Complete all three checks, undo a check if necessary, or choose Reset to start again.

The intended interface uses standard SIK / UI Kit controls. “Hands-free” describes the goal of keeping the checklist in the user's view without holding a phone; this prototype does not implement voice control.

## What is included

| File | Purpose |
| --- | --- |
| `Assets/Scripts/PunchlistState.ts` | SDK-independent checklist state, validation, toggle and reset |
| `Assets/Scripts/PunchlistController.ts` | View contract, event subscriptions, rendering and disposal |
| `Assets/Scripts/PunchlistPanelUIStub.ts` | Rendering/event port adapter; creates no scene or controls |
| `Assets/Scripts/PunchlistNativePreview.ts` | Unverified native Text / InteractionComponent tap fallback; requires scene bindings and editor compilation |
| `tests/*.test.mjs` | Six executable state, controller and UI-port checks |
| `devpost/design-brief.md` | Approved topic, implementation defaults, intended spatial behavior and acceptance criteria |
| `NATIVE-PREVIEW-FALLBACK.md` | Pending native compilation, scene wiring and tap-verification steps |
| `publication-manifest.json` | Allowlist and exclusions for this source snapshot |

This source snapshot does **not** contain a complete Lens Studio `.esproj`, a native scene, SIK / UI Kit packages, or a verified native view adapter. The proposed layout and interaction in the brief are acceptance criteria, not evidence that they have passed in Preview. These TypeScript files are not attached to a Lens Studio scene in this snapshot. The native fallback uses Text and InteractionComponent tap input; its native compilation and runtime behavior remain unverified. It does not establish SIK pinch support or a working SPECS environment.

## Run the logic test

Install [Node.js](https://nodejs.org/en/download) 24 or later from its official distribution. No npm packages or paid services are required.

```sh
node --test --test-isolation=none tests/*.test.mjs
```

All six checks passed locally on Node.js 24.14.1. They cover reversible toggles, counts/completion, invalid inputs, snapshot isolation, reset, controller subscriptions/disposal and UI-port rendering. These are SDK-independent logic/adapter tests; they do not compile the native fallback or test native rendering, pinching, world anchoring, device comfort or Preview stability.

## Continue in Lens Studio

1. Install [Lens Studio](https://ar.snap.com/download) and use the official [Learn AR with SPECS resources](https://learn-specs.devpost.com/resources) for the SPECS base template and current setup instructions.
2. Install the official CLAD / Devpost planning tools and required SIK / UI Kit packages from their official sources. No third-party tool packages are vendored here.
3. Add the source modules to a new SPECS project through Lens Studio's asset import. For the original interaction design, implement `PunchlistView` using real SIK / UI Kit controls, with one subscription per row and one for Reset; call `dispose()` when the view is destroyed. For a smaller native tap diagnostic, follow `NATIVE-PREVIEW-FALLBACK.md` and compile the fallback before wiring its real component inputs.
4. Use the brief to build the synthetic workpiece and adjacent world-anchored checklist, then verify every acceptance criterion in Interactive Preview before recording or submitting anything.

## Entrant and development disclosure

The intended entrant is **Timofei Filimonov**. The Hands-free Punchlist topic and implementation/publication were approved through Pavel. Development and documentation are AI-assisted. A completed learner interview, Timofei's personal demo test, and his personal review of every engineering default are not established by this repository. The original design brief keeps those distinctions explicit.

Native SPECS Preview is unverified, a public demo video is not provided, and no final Devpost project submission is claimed.

## Rights and dependencies

The source files in this snapshot were created for this project. No blanket license is granted here. Snap SDKs, templates, SIK, UI Kit, CLAD and any separately installed dependencies remain subject to their own licenses and terms. This repository does not redistribute those dependencies.
