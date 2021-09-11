[![Netlify Status](https://api.netlify.com/api/v1/badges/55a7471c-4719-489f-9cdd-a4b247695000/deploy-status)](https://app.netlify.com/sites/hgrpg/deploys)

## Local Dev

1. Install [LaTeXTools](https://latextools.readthedocs.io/en/latest/install/)

   - Add to path:

   ```
   sudo echo "/Library/TeX/texbin" > /etc/paths
   ```

1. Clone project

   ```
   git clone git@github.com:keithrpotempa/hgrpg-sphinx.git && cd hgrpg-sphinx
   ```

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

## Building Locally

(make sure your environment is activated)

```
source .venv/bin/activate
```

1. Navigate into the `docs` directory:

   ```
   cd docs
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
