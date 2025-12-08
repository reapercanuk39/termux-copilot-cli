#!/bin/bash

# Termux Copilot CLI Installer

echo "🚀 Installing Termux Copilot CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "For Termux: pkg install nodejs"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Clone the repository
echo "📥 Cloning repository..."
git clone https://github.com/reapercanuk39/termux-copilot-cli.git
cd termux-copilot-cli

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make CLI executable
chmod +x index.js

# Create symlink for global access
echo "🔗 Creating global symlink..."
sudo npm link || npm link

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Setup Instructions:"
echo "1. Set your GitHub token: export GITHUB_TOKEN=your_token"
echo "2. Or create a .env file with: GITHUB_TOKEN=your_token"
echo "3. Run: copilot ask \"your question here\""
echo ""
echo "For more info, visit: https://github.com/reapercanuk39/termux-copilot-cli"
