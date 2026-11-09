# Saved native project: setup and limits

**Checklist gaze + native tap passed in SPECS 27 Preview simulation. Clean restoration of this package-free checkout is NOT VERIFIED.**

## Manual setup — restore not tested

1. Install [Lens Studio](https://ar.snap.com/download). The project was saved with 5.24.1. Several recorded package descriptors identify 5.25; the verified local session does not prove all clean-install combinations.
2. Use the official Asset Library to obtain these recorded application dependencies and import them into this project's Packages folder:

| Dependency | Version | Recorded Asset Library ID |
| --- | --- | --- |
| UIKit / SpectaclesUIKit | 4.0.0 | `7pJbKPpGSYDaQrYPtHhfiL` |
| InteractionKit / SpectaclesInteractionKit | 4.0.0 | `1aPW5eMfMPeP1615dXiqyN` |
| Icons / SpecsIcons (UIKit dependency) | 4.0.0 | `2C2Px5zRD3OJOQzl0gpL9R` |
| Motion (UIKit dependency) | 4.0.0 | `2VzoC0jw1TPZ8pu10Zs6OD` |

3. The saved scene retains **AiPreviewAgentInspect 4.0.0** as a development inspection helper. Its descriptor has no Asset Library ID. Its exact independent installation route is not established here; obtain it through the official SPECS/CLAD tooling or have the maintainer remove the helper in Lens Studio and resave. No helper references were silently changed in this release.
4. **Bitmoji 3D 10.0.1** was still installed in the captured local project but has no direct saved-scene ScriptAsset reference established by the packaging audit. It is not an application requirement established by this snapshot. **LEAF was absent** from this final saved package set; no LEAF PASS is claimed.
5. The unchanged scene may retain diffuse/specular references to the excluded default-template `Echopark.hdr`. Their IDs appear in `dependency-references.json`. Obtain a permitted environment asset from official sources and resolve these references in Lens Studio; this restore procedure is untested.
6. Open `Project.esproj`, inspect all unresolved references/compiler errors, and confirm the Spectacles target, World-tracked camera and canonical `PunchlistUIKitUI` component. Package names alone do not guarantee UUID references resolve. Recheck the native sequence in your restored project.

## What this snapshot proves

The application code SHA is frozen at `fb6696c3ad506bc3f144f8b63af86cbd5838c22b64a6815b7e7d53dd864c096d`. Engineering verified the local native checklist sequence through gaze + tap, including completion, undo and Reset. That local session had its dependencies installed; it is not a restore test of this package-free release.

The synthetic cube was imported but not placed beside the list. No claim is made for an anchored workpiece, physical device, hand pinch, LEAF or spatial viewpoint behavior. Video remains pending.

## Reference inventory and rights

`dependency-references.json` records the **six packages actually present in the final saved snapshot**, versions and IDs. It is a human-authored inventory, **not** a Lens Studio-generated `package_dependencies.json`. No automatic restoration is claimed and no generated manifest has been fabricated.

The official package-export flow can store Asset Library dependency information and resolve it during package import, potentially using an existing project/installed version. This source checkout has not been tested through that export/import flow. [Official package export and dependency resolution](https://developers.snap.com/lens-studio/features/package-management/exporting-packages)

Vendor archives and the template HDR are excluded by release choice. Their redistribution terms remain unknown here; no blanket permission or prohibition is asserted. Install dependencies under their original terms.

