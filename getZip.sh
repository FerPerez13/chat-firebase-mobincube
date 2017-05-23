#! /bin/bash

npm run build

cd build

zip -r chat.zip bundle.js images index.html main.css properties.json

mv chat.zip "$@"
