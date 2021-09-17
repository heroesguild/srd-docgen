## Local Dev

1. Install [LaTeXTools](https://latextools.readthedocs.io/en/latest/install/)

   (TODO: Revise: Mac troubleshooting)

   - Check if `latexmk` exists in path

   ```
   which latexmk
   ```

   - If not, might need to:

   ```
   sudo nano /etc/paths
   ```

   - Add the following:

   ```
   /Library/TeX/texbin
   ```

1. Clone project

1. Make python virtual environment:

   ```
   python3 -m venv .venv
   ```

1. Activate it:

   ```
   source .venv/bin/activate
   ```

1. Install required pip packages:
   ```
   python3 -m pip install -r requirements.txt
   ```

## Building

(make sure your environment is activated)

```
source .venv/bin/activate
```

1. Navigate into the `source` directory:

   ```
   cd source
   ```

1. If building HTML

   ```
   make html
   python -m SimpleHTTPServer 8000
   ```

   Open in browser: `https://localhost:8000`

1. If building PDF
   ```
   make latexpdf
   ```

## Customizing Build

To customize, edit LaTeX, HTML options in `conf.py` file.

See options reference [here](https://www.sphinx-doc.org/en/master/usage/configuration.html).
