#!/bin/bash
export PATH="/Users/pumpkin/.nvm/versions/node/v24.14.0/bin:$PATH"
cd /Users/pumpkin/Claude/michielmaessen
exec npx next dev --port ${PORT:-3001}
