# Project Source Storage

This folder stores the original source code for projects showcased in the portfolio app.

## Why this folder exists

- Keeps the portfolio site separate from the code of the projects being showcased.
- Lets static projects and full Django projects live side by side.
- Prevents Python virtual environments, SQLite databases, and cache files from cluttering the main app structure.

## Suggested usage

- Put static HTML/CSS/JS projects in their own folder with their assets beside them.
- Put each Django project in its own folder with `manage.py`, apps, templates, static files, and a local `requirements.txt`.
- If a Django project uses SQLite, keep `db.sqlite3` inside that project folder for local use. It is ignored by git in this repo.

## Current layout

- `cs50w/search`
- `cs50w/wiki`
- `cs50w/auction`
- `cs50w/mail`
