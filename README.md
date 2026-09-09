# Texans HQ — v15.16

Drop-in replacement for v15.15. Same files, same unlock, same hosting.

## What’s new
- **Sched** shows the full NFL week (time CT, TV, favorite/line/total, keys).
- Toggle **This week** / **Texans season**.
- Star any game; Game Center + live play-by-play run for the game you pick.
- Live polling stays on **one** event so updates stay fast.
- **Scout memory** logs both teams of every game you watch (playoff scouting). Official Next Play / Dominos book stays Houston-only.
- **Pop out game dock** keeps scoreboard + leans in a small window beside Prime / NFL+.

## Push to GitHub
Copy everything in this `texans-hq/` folder over the files already in your repo (do not nest another `texans-hq` folder unless that is how the repo is laid out now). Commit and push. GitHub Pages users: keep `.nojekyll` so Pages does not process the PWA.

After deploy, hard-refresh once (or reopen the installed app) so the service worker picks up v15.16.
