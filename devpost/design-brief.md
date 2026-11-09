---
status: approved_for_implementation_via_pavel
topic_approval: approved_via_pavel
full_interview: not_completed
participant_demo_review: not_confirmed
---

# Design brief: Hands-free Punchlist

**Человек становится участником, ставит агентам цель занять призовое место, а агенты самостоятельно исследуют методы, пишут код, проводят эксперименты и меняют подход по результатам.**

## Source of choice and approval
09.11.2026: root relayed Pavel saying: «Тимофей одобряет и доверяет. Но скажи пожалуйста, а это сколько времени есть до реализации проекта? Тогда важно, чтобы узнать, успеет Тимофей посмотреть или нет.» This confirms the topic choice through Pavel. It does not establish a completed learner interview, approval of every detail below, or a personal demo review. All unchosen engineering values are marked (default). This draft prepares reversible work while awaiting the saved SPECS project and learner review.


09.11.2026 около 23:00 МСК root передал новое прямое поручение Павла: «Тимофей уже согласен, делай. И сразу публикуй.» Это разрешает реализацию и публикацию чистого отдельного проекта. Полное интервью и личный просмотр демо по-прежнему не заявляются.

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
- Checklist center about 100 cm from starting view and slightly below eye level; panel about 45 by 40 cm (default; adjust after Preview).
- SyntheticWorkpiece is a simple block, about 25 cm wide (default).

## Hands and input
- Three large SIK/UIKit row controls toggle manual check state; Reset clears all checks (default).
- Targets highlight when aimed at. No voice or custom gestures (default).

## When things show
- List stays visible while checks are incomplete. Completion replaces the status with a concise completion message; Reset remains available (default).
- No out-of-view alert is required in this single-object demonstration (default).

## Done criteria
1. Interactive Preview shows the synthetic workpiece and a readable, spatially adjacent list of three demo checks.
2. One click/pinch changes exactly its targeted check and updates the remaining count once.
3. Completing every check shows completion; undoing one returns the remaining state.
4. Reset clears every check and returns the initial count; restarting Preview does not duplicate events or retain prior progress.
5. Moving the Preview viewpoint leaves the list attached beside the workpiece, rather than attached to the viewer.

## Out of scope
- Real-world defect detection, live vision, speech recognition, persistent anchors, shared multi-user state and external services.

## Risks and open questions
- Learner wording, actual context and final dimensions need review; the topic alone has approval through Pavel.
- No saved SPECS Base Template or successful Preview has yet been established by this engineering branch.
- Feel, comfort and real tracking remain unproven on glasses.

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
