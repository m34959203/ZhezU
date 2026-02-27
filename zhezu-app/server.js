// server.js — Entry point for Plesk Node.js hosting (hoster.kz)
// This file is used as the "Application startup file" in Plesk panel.
//
// Before running, execute: npm run deploy  (or: bash scripts/deploy.sh)
// This will build the app and prepare the standalone directory.

const path = require('path');
const { execSync } = require('child_process');

// Standalone server location after `next build` with output: 'standalone'
const standaloneDir = path.join(__dirname, '.next', 'standalone');
const serverPath = path.join(standaloneDir, 'server.js');

// Check if build exists
const fs = require('fs');
if (!fs.existsSync(serverPath)) {
  console.log('Standalone build not found. Running deploy script...');
  execSync('bash scripts/deploy.sh', { stdio: 'inherit', cwd: __dirname });
}

// Set required environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Start the Next.js standalone server
require(serverPath);
