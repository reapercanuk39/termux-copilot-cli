# Installation Guide

## Quick Install (Recommended)

curl -fsSL https://raw.githubusercontent.com/reapercanuk39/termux-copilot-cli/main/install.sh | bash

## Manual Installation

### Prerequisites
- Node.js 16+ installed
- Git installed
- GitHub account with a personal access token

### Step 1: Clone the Repository

git clone https://github.com/reapercanuk39/termux-copilot-cli.git
cd termux-copilot-cli

### Step 2: Install Dependencies

npm install

### Step 3: Configure GitHub Token

Create a .env file in your project directory:

echo "GITHUB_TOKEN=your_github_token_here" > .env

Or set it as an environment variable:

export GITHUB_TOKEN=your_github_token_here

### Step 4: Make CLI Global (Optional)

npm link

## Usage

### Ask Copilot

copilot ask "How do I create a function in JavaScript?"

### Show Configuration

copilot config

### Show Version

copilot version

## Getting a GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select "copilot" scope
4. Copy the token and use it in your .env file

## Troubleshooting

Error: GITHUB_TOKEN not set
- Make sure your .env file exists and contains GITHUB_TOKEN=your_token

Error: Node.js not found
- Install Node.js: pkg install nodejs (for Termux)

Error: npm install fails
- Try: npm install --no-optional

## Support

For issues and questions, visit: https://github.com/reapercanuk39/termux-copilot-cli/issues
