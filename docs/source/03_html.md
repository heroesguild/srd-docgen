---
title: HTML
---

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
   python -m http.server 8000
   ```
   (or if that doesn't work)
   ```
   python -m SimpleHTTPServer 8000
   ```

   Open in browser: `https://localhost:8000`