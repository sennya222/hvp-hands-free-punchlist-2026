# Hands-free Punchlist

**WORK IN PROGRESS — an initial native UIKit panel render was observed. The full three-check, undo and Reset sequence is NOT VERIFIED. No demo video or final contest submission is claimed.**

A manual three-item training checklist intended to sit beside one synthetic workpiece in AR. It does not recognize defects, analyze camera frames, call external services or retain progress across sessions.

## The intended task

1. Read three short checks beside a synthetic training object.
2. Inspect the object and mark the matching row; the intended counter shows the remaining work.
3. Complete the list, undo a check if needed, or choose Reset to start again.

These are intended actions, not a passed native runtime demonstration. “Hands-free” describes the goal of keeping the list in view without holding a phone; voice control is not implemented.

## Verified and pending

Six SDK-independent state/controller/UI-adapter tests pass. Engineering review observed a real three-row UIKit panel in native Lens Studio Multimedia Preview with SPECS 27 selected. That first frame used an earlier source revision and was too small for a clear demonstration.

This frozen source iteration revises label/readability and desktop tap handling. Its canonical script SHA-256 is `ef991c514a4da64c5075a94a6f296a33fce7ba392dd58795c881b539e8083ee4`. It was copied into this release snapshot at **2026-11-09 21:25:48 UTC** (10 November 00:25:48 MSK). This is a historical WIP iteration, not an up-to-date tested build. The live editor's engineering source may already differ. The earlier frame does not verify this revision. The original synthetic cube source is intended to be 10 cm wide; native import scale, bounds and placement are unverified.

Full native taps on all three rows, completion, undo, Reset, hand/pinch input, spatial movement, dependency restoration and video are **not verified**. Logic tests do not prove those native behaviors.

## Source files

| File | Purpose |
| --- | --- |
| `Assets/Scripts/PunchlistUIKitUI.ts` | The single canonical scene component; creates a UIKit/Flex panel |
| `Assets/Scripts/PunchlistState.ts` | Validation, reversible toggles, completion/count and reset |
| `Assets/Scripts/PunchlistController.ts` | State-to-view coordination and event disposal |
| `Assets/Scripts/PunchlistPanelUIStub.ts` | SDK-neutral adapter test fixture; not a scene component |
| `Assets/Models/SyntheticTrainingBlock.obj` | Original cube geometry; native import/scale unverified |
| `tests/*.test.mjs` | Six logic and adapter checks |
| `devpost/design-brief.md` | Approved topic, defaults and pending acceptance criteria |
| `publication-manifest.json` | Source allowlist, hashes and verification limits |

The former experimental `PunchlistNativePreview.ts` and fallback guide are superseded by the canonical UIKit component and removed from the current tree. Prior commits retain them.

This snapshot contains **no saved `.esproj`, native scene or vendor archives**. It is not a complete reproducible Lens Studio project. A separately prepared native candidate is not included here.

## Run the logic checks

Install [Node.js](https://nodejs.org/en/download) 24 or later:

```sh
node --test --test-isolation=none tests/*.test.mjs
```

All six checks passed locally on Node.js 24.14.1. They cover reversible toggles, counts/completion, invalid input, snapshot isolation, reset, controller subscriptions/disposal and UI-adapter output. The harness uses Node's experimental TypeScript transform. It does not compile the UIKit component or test native rendering, tracking or LEAF.

## Continue in Lens Studio

1. Install [Lens Studio](https://ar.snap.com/download) and follow the official [Learn AR with SPECS resources](https://learn-specs.devpost.com/resources).
2. Obtain UIKit, InteractionKit and their dependencies from the official Asset Library under their original terms. Package compatibility and a clean dependency restore are not verified by this source snapshot.
3. Import the scripts through Lens Studio. Attach only `PunchlistUIKitUI` to a world-root scene object, with a World-tracked camera and required InteractionKit setup.
4. `nativePreviewControls` separates the desktop-native tap diagnostic from the SIK trigger mode. Inspect the exact committed script for this frozen implementation; native input is under active iteration. Neither a successful full tap sequence nor hand/pinch support is claimed.
5. Compile the actual source, verify readable rendering, then test each row, completion, undo and Reset against visible state. Import the block and measure its bounds/placement. Verify spatial behavior separately.
6. Record genuine Preview evidence only after the corresponding actions pass. Label desktop tap input accurately.

## Entrant and AI assistance

The intended entrant is **Timofei Filimonov**. The topic, implementation and publication were approved through Pavel. Development and documentation are **AI-assisted**. Engineering agents are handling demo review; participant-run testing, Timofei's personal demo viewing and a completed learner interview are not claimed.

## Rights

The project source and synthetic geometry were created for this project. No blanket license is granted here. Snap SDKs, templates, UIKit, InteractionKit, CLAD and separately installed dependencies retain their own terms. This repository does not redistribute their archives, the full SDK or template HDR images.
