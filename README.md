## Local Dev

1. Install [LaTeXTools](https://latextools.readthedocs.io/en/latest/install/)

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
