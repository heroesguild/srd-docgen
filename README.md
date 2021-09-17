[![Netlify Status](https://api.netlify.com/api/v1/badges/3fd99e77-67fb-4d9b-bdaf-f0755dc3ffbf/deploy-status)](https://app.netlify.com/sites/srd-docgen/deploys)

## Local Dev

1. Clone project

   ```
   git clone git@github.com:keithrpotempa/srd-docgen.git && cd srd-docgen
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

## Building HTML

(make sure your environment is activated)

```
source .venv/bin/activate
```

1. Navigate into the `docs` directory:

   ```
   cd docs
   ```

1. Build static html and serve:
   ```
   make html
   python -m SimpleHTTPServer 8000
   ```

   Open in browser: `https://localhost:8000`

## Building PDFs
1. Install MacTex

   ```
   brew cask install mactex
   sudo chown -R myuser:mygroup /usr/local/texlive
   ```

<!-- ONLY IF USING DND TEMPLATE -->

<!-- 1. Install the LaTeX template

   (Instructions copied from the "User install using `TEXMFHOME`" from the template's README [here](https://github.com/rpgtex/DND-5e-LaTeX-Template#readme))

      This will install the template for your current user in one of the following locations: 
      * Linux: `~/.texmf/tex/latex`
      * OS X / macOS: `~/Library/texmf/tex/latex`
      * Windows: `C:\Users\{username}\texmf\tex\latex`

      LaTeX will find the package automatically.

      1. Prepare your `TEXMFHOME` directory.

         ```sh
         mkdir "$(kpsewhich -var-value TEXMFHOME)/tex/latex/"
         ```

      2. Download the [latest release](https://github.com/rpgtex/DND-5e-LaTeX-Template/releases/latest) and extract it in `$TEXMFHOME/tex/latex/`.

         ```sh
         wget https://github.com/rpgtex/DND-5e-LaTeX-Template/archive/master.zip
         unzip -d "$(kpsewhich -var-value TEXMFHOME)/tex/latex/" master.zip
         cd "$(kpsewhich -var-value TEXMFHOME)/tex/latex/"
         mv DND-5e-LaTeX-Template-master dnd 
         ```-->
1. (make sure your environment is activated)

```
source .venv/bin/activate
```

1. Navigate into the `docs` directory:

   ```
   cd docs
   ```

1. Build static html and serve:
   ```
   make latexpdf
   ```

1. View PDF output in `build/latex`


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
