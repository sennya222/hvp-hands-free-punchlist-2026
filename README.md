# Hands-free Punchlist

**Native checklist sequence verified in Lens Studio SPECS 27 Preview simulation: 3 → 2 → 1 → all complete → 1 → 3. Saved project and scene included. Clean dependency restoration is NOT VERIFIED; video is pending and no final contest submission is claimed.**

A manual three-item training checklist for keeping short inspection steps in view. Mark each row, see the remaining count, undo a check or reset the list. It does not recognize defects, analyze camera frames, call external services or persist progress across sessions.

## Verified scope

In genuine native SPECS 27 Preview, engineering agents tested **gaze + native tap**: three distinct checks, all-complete state, undo of one check, and Reset. Runtime text snapshots and real captured frames were reviewed by the coordinator and an independent reviewer. The checked sequence is in [the sanitized runtime evidence](verification/native-tap-results.json).

This is a **simulated native Preview check**, not a physical-device or hand/pinch test. LEAF, spatial viewpoint behavior, comfort on glasses and clean restoration from this repository are unverified. The synthetic block was imported but **was not placed beside the checklist or shown as its anchored subject**. No object-anchoring result is claimed.

Frozen canonical source SHA-256:

`fb6696c3ad506bc3f144f8b63af86cbd5838c22b64a6815b7e7d53dd864c096d`

The saved native snapshot was copied at **2026-11-09 21:34:07 UTC** (10 November 00:34:07 MSK). Native sequence evidence was captured at 21:27:39–21:27:49 UTC. This source freeze is distinct from the earlier historical WIP commits.

## Intended spatial task

1. Read a short checklist while looking toward a training workpiece.
2. Perform each manual check and mark its matching row.
3. See completion, undo a check if necessary, or choose Reset.

The checklist interaction is verified in simulation. The proposed placement beside a workpiece remains unfinished. “Hands-free” describes the goal of avoiding a held phone; voice control is not implemented.

## Open the saved project

Start with [native setup and known missing references](native/README.md). Open `native/Project.esproj` only after installing the required official packages and resolving its remaining references. Vendor archives and the template HDR are intentionally excluded.

The native folder contains the saved project/scene, its project-authored scripts, original synthetic OBJ and import metadata. It is **not a self-contained, clean-restore-tested distribution**. `native/dependency-references.json` is a human-authored inventory, not an automatic installer or a Lens Studio-generated dependency manifest.

`PunchlistUIKitUI` is the single scene component to attach. `nativePreviewControls = true` selects the native tap diagnostic used for the verified simulation; the separate SIK trigger mode is not a verified hand/pinch test. The root `Assets/` tree contains the same canonical application source plus the SDK-neutral adapter fixture; the saved scene lives in `native/`.

## Logic tests

Install [Node.js](https://nodejs.org/en/download) 24 or later, then run:

```sh
node --test --test-isolation=none tests/*.test.mjs
```

Six checks pass on Node.js 24.14.1: reversible toggles, counts/completion, invalid input, snapshot isolation, reset, controller disposal and adapter output. These SDK-independent tests use Node's experimental TypeScript transform. They do not reproduce the native Preview session.

## Contents

- `Assets/Scripts/`: state, controller, adapter fixture and canonical UIKit component.
- `Assets/Models/SyntheticTrainingBlock.obj`: original 10 cm-intended cube source; adjacent scene placement remains unfinished.
- `native/`: saved project, scene, own assets, dependency references and manual setup guide.
- `tests/`: six logic/adapter checks.
- `devpost/design-brief.md`: approved concept, defaults and scoped verification status.
- `verification/native-tap-results.json`: runtime text evidence with private screenshot paths removed.
- `publication-manifest.json`: explicit allowlist, source hashes and verification limits.

## Entrant, AI assistance and rights

The intended entrant is **Timofei Filimonov**. The topic, implementation and publication were approved through Pavel. Development and documentation are **AI-assisted**. Engineering agents conducted the verification; participant-run testing, Timofei's personal demo viewing and a completed learner interview are not claimed.

The project source and synthetic geometry were created for this project. No blanket license is granted here. Snap SDKs, templates, UIKit, InteractionKit, CLAD and separately installed dependencies retain their own terms. Their archives, the full SDK and template HDR images are not redistributed in this repository.
