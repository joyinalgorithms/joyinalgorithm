# CS50W Project Source

Each project has its own folder so it can keep the structure it needs without affecting the portfolio app.

## Recommended structure

- `search/`
  Store the static files directly here, such as `index.html`, `style.css`, `advanced.html`, `images/`, and any JavaScript files.
- `wiki/`
  Store the full Django project here, including `manage.py`, the Django project package, apps, templates, static files, and optional local `db.sqlite3`.
- `auction/`
  Store the full Django auction app here with the same pattern as `wiki/`.
- `mail/`
  Store the full Django mail project here with the same pattern as `wiki/`.

## Notes

- A separate virtual environment per Django project is fine, but keeping one shared Python environment for all CS50W Django projects is also okay.
- The portfolio data already includes these folder paths in `ProjectsPage.tsx`, so we can use them later if you want to show source locations or code links in the UI.
