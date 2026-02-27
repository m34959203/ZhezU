#!/bin/bash
# deploy.sh — Build and prepare Next.js standalone for Plesk hosting (hoster.kz)
#
# Usage:
#   bash scripts/deploy.sh
#
# This script:
# 1. Installs dependencies
# 2. Builds the Next.js app (standalone mode)
# 3. Copies public/ and .next/static/ into the standalone directory
# 4. Ensures data/ and public/uploads/ directories exist and are writable

set -e

echo "=== ZhezU Deploy Build ==="

cd "$(dirname "$0")/.."
APP_DIR=$(pwd)

# 1. Install dependencies
echo "[1/4] Installing dependencies..."
if command -v pnpm &> /dev/null; then
  pnpm install --frozen-lockfile
elif command -v npm &> /dev/null; then
  npm ci
else
  echo "ERROR: Neither pnpm nor npm found"
  exit 1
fi

# 2. Build
echo "[2/4] Building Next.js app..."
if command -v pnpm &> /dev/null; then
  pnpm build
else
  npm run build
fi

STANDALONE_DIR="$APP_DIR/.next/standalone"

if [ ! -d "$STANDALONE_DIR" ]; then
  echo "ERROR: Standalone build not found at $STANDALONE_DIR"
  echo "Make sure next.config.ts has output: 'standalone'"
  exit 1
fi

# 3. Copy static assets into standalone
echo "[3/4] Copying static assets..."

# public/ → .next/standalone/public/
if [ -d "$APP_DIR/public" ]; then
  cp -r "$APP_DIR/public" "$STANDALONE_DIR/public"
  echo "  - public/ copied"
fi

# .next/static/ → .next/standalone/.next/static/
if [ -d "$APP_DIR/.next/static" ]; then
  mkdir -p "$STANDALONE_DIR/.next/static"
  cp -r "$APP_DIR/.next/static/." "$STANDALONE_DIR/.next/static/"
  echo "  - .next/static/ copied"
fi

# 4. Ensure writable directories
echo "[4/4] Ensuring data directories..."

mkdir -p "$STANDALONE_DIR/data"
mkdir -p "$STANDALONE_DIR/public/uploads"

# Copy existing data files if they exist
if [ -d "$APP_DIR/data" ] && [ "$(ls -A $APP_DIR/data 2>/dev/null)" ]; then
  cp -r "$APP_DIR/data/." "$STANDALONE_DIR/data/"
  echo "  - data/ copied ($(ls $APP_DIR/data | wc -l) files)"
fi

# Copy i18n message files (needed for translation editing in admin)
if [ -d "$APP_DIR/src/i18n/messages" ]; then
  mkdir -p "$STANDALONE_DIR/src/i18n/messages"
  cp -r "$APP_DIR/src/i18n/messages/." "$STANDALONE_DIR/src/i18n/messages/"
  echo "  - i18n messages copied"
fi

echo ""
echo "=== Build complete! ==="
echo ""
echo "Standalone output: $STANDALONE_DIR"
echo "Size: $(du -sh $STANDALONE_DIR | cut -f1)"
echo ""
echo "To start: node $STANDALONE_DIR/server.js"
echo "Or in Plesk: set 'Application startup file' to server.js"
