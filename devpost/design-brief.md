---
status: approved_for_implementation_via_pavel
topic_approval: approved_via_pavel
full_interview: not_completed
participant_demo_review: delegated_to_agents_not_personally_performed
---

# Design brief: Hands-free Punchlist

<strong style="color:#B8860B">Человек становится участником, ставит агентам цель занять призовое место, а агенты самостоятельно исследуют методы, пишут код, проводят эксперименты и меняют подход по результатам.</strong>

**English translation:** A person becomes a participant, sets the agents the goal of taking a prize-winning place, and the agents independently research methods, write code, conduct experiments, and change their approach based on the results.

## Source of choice and approval
The participant's coordinator relayed approval of the Hands-free Punchlist topic on 9 November 2026, followed by explicit authorization to implement and publish this separate project. This is an engineering brief prepared under that authorization. A full learner interview and personal demo review have not been completed or claimed. Values not selected by the participant are marked (default).

## The one spatial moment
A learner stands beside one synthetic training workpiece, sees its short manual punchlist placed beside it, and marks checks while keeping the object in view. Synthetic training context and wording are engineering defaults.

## Why it belongs on glasses
- Draws task information beside its subject; leaves attention on the workpiece between short interactions (default rationale, awaiting learner wording).
- No claim of automatic recognition or defect detection.

## Product or overlay
- Type: manual overlay for a single training object (default).
- Real version senses no defects; user performs the checks.
- Preview stand-in: one clearly labelled synthetic block; three pre-authored demo checks (default).

## Where things live
- Object and list share a world anchor; list sits beside the object, never follows the head (default).
- Panel source size is 34 by 36 cm. The first observed layout was about 110 cm from the camera and too small in the native frame. A 60 cm viewing distance is a proposed readability correction, pending runtime verification (default).
- SyntheticWorkpiece has a prepared cube source intended as 10 cm wide; imported dimensions and actual scene placement remain pending (default).

## Hands and input
- Three UIKit row controls toggle manual check state; Reset clears all checks. The frozen source snapshot includes a desktop-native tap diagnostic; its handler is under active iteration and the separate SIK trigger mode remains unverified (default).
- Targets highlight when aimed at. No voice or custom gestures (default).

## When things show
- List stays visible while checks are incomplete. Completion replaces the status with a concise completion message; Reset remains available (default).
- No out-of-view alert is required in this single-object demonstration (default).

## Done criteria
1. Native SPECS 27 Preview shows the synthetic workpiece and a readable, adjacent list of three demo checks.
2. One native tap changes exactly its targeted check and updates the remaining count once. Pinch is a separate unverified input mode.
3. Completing every check shows completion; undoing one returns the remaining state.
4. Reset clears every check and returns the initial count; restarting Preview does not duplicate events or retain prior progress.
5. Moving the Preview viewpoint leaves the list attached beside the workpiece, rather than attached to the viewer.

## Out of scope
- Real-world defect detection, live vision, speech recognition, persistent anchors, shared multi-user state and external services.

## Risks and open questions
- Implementation and publication are authorized through the coordinator. Personal preview review was delegated to the agents, not performed by the participant. Engineering defaults are explicitly marked; a full interview is not claimed.
- A separate saved Default-origin project was converted to SPECS; World tracking was restored and saved, the initial UIKit revision compiled, and a real native frame showed the panel. Current native-tap/readability changes, imported workpiece and the complete interaction sequence still need verification.
- Feel, comfort and real tracking remain unproven on glasses.

## Verification status and snapshot input mode
Initial native render only is verified. All five done criteria remain pending full verification. No MP4, completed interaction sequence, hand/pinch test or LEAF PASS is represented. The template guidance below is retained as the intended full workflow; native-tap mode is a deliberately narrower diagnostic and must be labelled honestly.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
