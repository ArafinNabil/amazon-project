#!/usr/bin/env bash
# Simple local server fallback using Python
PORT=5500
echo "Serving project at http://127.0.0.1:$PORT (Ctrl-C to stop)"
python3 -m http.server "$PORT"
