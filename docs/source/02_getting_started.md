---
title: Getting Started
---


## Local Dev

1. Clone project

   ```
   git clone git@github.com:keithrpotempa/srd-docgen.git && cd $_
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



## Customizing Build

To customize, edit LaTeX, HTML options in `conf.py` file.

See options reference [here](https://www.sphinx-doc.org/en/master/usage/configuration.html).

## Deploying to Netlify

- Link your github repo to a Netlify site
- Build Settings:
   - Build Command: eg: `cd docs && make html` 
      - Navigate into the directory where your project's `MakeFile` is located
      - Build the html
   - Publish Directory: eg: `docs/build/html` 
      - The directory where your html outputs to
