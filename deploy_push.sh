#!/bin/bash
npm run predeploy && npm run deploy && git add . && git commit -m "Added new blog" && git push -u origin main