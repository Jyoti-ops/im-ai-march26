# im-ai-march26

What you’ll build (demo app)
Training Batch Time Tracker (local web app)
Create Projects (client/training name)
Create Tasks (module, prep, delivery, follow-up)
Start/stop a timer and log time entries
Simple Dashboard (today/week totals)
Export a PDF for today’s timesheet (optional extension)

Prereqs (5 minutes)
1.GitHub Copilot subscription
2.VS Code with:
oGitHub Copilot extension
oGitHub Copilot Chat extension
3.Git installed

Setup (10 minutes)
1) Create repo + clone
1.Create a new private repo (include README).
2.Clone locally.
3.Create a new branch:
git checkout -b vibe-batch-tracker
2) Open in VS Code
Open the repo folder in VS Code.
Close all editor tabs 

Vibe Coding Rule #1 (say this out loud)
You drive with prompts. Copilot drives the keyboard.
You do review → run → feedback → iterate.
Phase A — Research in “Ask” mode (10–15 minutes)
Open Copilot Chat and set mode to Ask (not Agent yet). 
Prompt A1 (research options)
Paste this:
You are my solution architect. I want to build a simple local web app called “Training Batch Time Tracker”.
Requirements: Projects, Tasks, Timer start/stop, entries list, basic totals for today, persistent storage on my machine (SQLite or local file), and a clean UI.
Suggest 2 stack options (frontend + backend), explain tradeoffs, and recommend one that is easiest to run locally in VS Code for a demo.
Accept the recommendation quickly (don’t debate stacks).
For demo speed, you’ll usually land on one of:
Next.js + SQLite (single repo, fullstack)
Vite React + Express + SQLite (clear separation)

Phase B — Plan in “Ask” mode (10 minutes)
Prompt B1 (generate a mini plan)
Create a step-by-step implementation plan with milestones.
Include: folder structure, data model (Project, Task, TimeEntry), API endpoints (if any), UI pages/components, and “run locally” commands.
Keep it MVP-first, then list 3 optional enhancements.
Prompt B2 (lock decisions)
Confirm final decisions: chosen stack, DB approach, and exact commands to initialize the project.
Then wait for me to say “GO AGENT” before you start making changes.

Phase C — Build in “Agent” mode (30–45 minutes)
Switch Copilot Chat mode to Agent (this is the core “vibe coding” step where Copilot implements changes). 
Prompt C1 (one-shot build request)
Paste:
GO AGENT.
Build the MVP end-to-end in this repo.
Must have:
1.Projects CRUD
2.Tasks CRUD
3.Timer: Start, Pause/Stop, Switch task
4.Today totals by task and by project
5.Persistent storage (SQLite preferred)
6.Clean, responsive UI
Constraints:
Add a README with setup/run steps.
Add basic error handling + empty states.
Use simple accessible UI labels.
After implementation, run the app and tell me the local URL and the command you ran.
When Copilot asks to approve changes
Click Approve/Continue as needed.
If it proposes additional dependencies or migrations, allow it (but keep notes).

Phase D — Run + verify (10 minutes)
What you check live
Can you add a project?
Can you add tasks?
Start timer → stop → entry appears
Totals update
Prompt D1 (debug loop)
The app doesn’t start. Here is the error:
[paste full terminal output]
Fix the issue, re-run the app, and confirm it works.

Phase E — “Vibe Iteration” (15–25 minutes)
Use the “small prompts, one change at a time” discipline. GitHub specifically recommends keeping each prompt focused on a single task.
Pick one of these changes:
Option E1 — Better switching behavior
When I switch tasks while a timer is running, I want:
current entry to stop automatically
new entry to start immediately
no zero-minute entries should be created
Implement this and add a small UI hint explaining the behavior.
Option E2 — Add “No Project” default
When creating a task without choosing a project, assign it to “No Project” by default (or current selected project if one is selected). Implement and update UI accordingly.
After each good iteration
1.Accept/Keep changes in the editor (VS Code shows this in the Copilot diff UX). 
2.Commit:
git add .
git commit -m "Improve timer switching behavior"

Phase F — “Make it professional” (10 minutes)
Prompt F1 (UI polish)
Make the UI look like a professional business app.
Keep it minimal. Improve spacing, typography, and layout.
Ensure the dashboard and timer screen look clean on mobile.

Phase G — Add tests + docs (optional 15–20 minutes)
Prompt G1 (tests)
Add a basic automated test suite appropriate for this stack.
At minimum:
unit tests for time calculations
integration test for creating a time entry
Put tests under a tests/ folder. Run tests and fix failures.
Prompt G2 (README)
Improve README.md with: overview, features, prerequisites, setup, run commands, and troubleshooting.

Bonus: Add repo custom instructions (makes the demo look very real)
Create .github/copilot-instructions.md and add rules like:
stack conventions
naming
“run tests before finalizing”
“no inline styles”
“keep components small”

Suggested content (copy/paste):
# Copilot Instructions (Training Batch Time Tracker)

## Code quality
- Prefer simple, readable code over cleverness.
- Add loading/empty/error states for every screen.
- Add basic accessibility (labels, aria-* where needed).

## Architecture
- Keep UI components small; move logic to services/hooks.
- Centralize DB access in one module; do not scatter SQL.
- Add a small README section whenever adding a new command.

## Validation
- If you change business logic, add/update tests.
- Before saying “done”, run the app and confirm no console errors.
