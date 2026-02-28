// server.js — Entry point for Plesk Node.js hosting (hoster.kz)
// This file is used as the "Application startup file" in Plesk panel.
//
// The deploy/ directory contains the pre-built standalone server
// (committed to git, unlike .next/ which is gitignored).
// To rebuild: bash scripts/deploy.sh

const path = require('path');
const fs = require('fs');

// Try deploy/ first (committed to git, always available on server),
// then fall back to .next/standalone/ (local dev builds)
const deployServerPath = path.join(__dirname, 'deploy', 'server.js');
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');

let serverPath;
if (fs.existsSync(deployServerPath)) {
  serverPath = deployServerPath;
} else if (fs.existsSync(standaloneServerPath)) {
  serverPath = standaloneServerPath;
} else {
  console.error('No standalone build found.');
  console.error('Run: bash scripts/deploy.sh');
  process.exit(1);
}

// Set required environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Start the Next.js standalone server
require(serverPath);
