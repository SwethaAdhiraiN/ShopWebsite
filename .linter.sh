#!/bin/bash
cd /home/kavia/workspace/code-generation/ShopWebsite/frontend_web_application
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

