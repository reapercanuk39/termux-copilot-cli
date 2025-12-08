# Installation Guide - Termux Copilot CLI

## Prerequisites
- Android device with Termux installed
- ARM64 architecture (most modern Android devices)
- ~500MB free storage
- Internet connection

## Step-by-Step Installation

### 1. Update Termux Packages
pkg update && pkg upgrade -y

### 2. Install Required Dependencies
pkg install -y nodejs git python build-essential

### 3. Clone or Download Copilot CLI
cd ~
git clone https://github.com/copilot-cli/copilot-cli.git
cd copilot-cli
npm install

### 4. Install the Bypass Module
mkdir -p ~/.copilot-hooks
cp bypass-final.js ~/.copilot-hooks/

### 5. Configure Node to Load the Bypass
Add this to your ~/.bashrc:
export NODE_OPTIONS="--require /data/data/com.termux/files/home/.copilot-hooks/bypass-final.js"

Then reload:
source ~/.bashrc

### 6. Verify Installation
copilot --version
copilot -p "Hello, test this"

## Troubleshooting Installation

**Permission Denied Errors:**
chmod +x ~/copilot-build/copilot-cli/bin/copilot.js

**Module Not Found:**
npm install --save-dev sharp child_process

**Node Version Issues:**
nvm install 18
nvm use 18

## Success Indicators
- No pne.fork is not a function errors
- Copilot CLI responds to prompts
- [BYPASS] Copilot Termux v2.0 appears in output
- Code analysis works without crashes
