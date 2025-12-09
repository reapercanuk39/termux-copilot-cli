#!/usr/bin/env node

const axios = require("axios");
const dotenv = require("dotenv");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const WindowsPlatform = require("./src/platforms/windows");
const config = require("./src/config");

dotenv.config();

const VERSION = "1.0.0";
const COPILOT_API = "https://api.github.com/copilot_internal/chat";

program
  .name("copilot")
  .description("GitHub Copilot CLI for Termux")
  .version(VERSION);

program
  .command("ask <prompt>")
  .description("Ask Copilot a question")
  .option("-p, --prompt <text>", "The prompt to send")
  .action(async (prompt, options) => {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      console.error("Error: GITHUB_TOKEN environment variable not set");
      console.error("Please set your GitHub token: export GITHUB_TOKEN=your_token");
      process.exit(1);
    }

    try {
      console.log("🤔 Thinking...");
      
      const response = await axios.post(
        COPILOT_API,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("\n✅ Copilot Response:\n");
      console.log(response.data.message || response.data);
    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  });

program
  .command("windows <command>")
  .description("Execute a command on your Windows PC")
  .action(async (command, options) => {
    try {
      if (!config.windows.host || !config.windows.username || !config.windows.password) {
        console.error("❌ Error: Windows SSH credentials not configured");
        console.error("Please set these environment variables:");
        console.error("  export WINDOWS_SSH_HOST=10.0.0.37");
        console.error("  export WINDOWS_SSH_USER=sshuser");
        console.error("  export WINDOWS_SSH_PASS=strongpassword");
        process.exit(1);
      }

      console.log(`📡 Executing on Windows: ${command}`);
      
      const windows = new WindowsPlatform(config.windows);
      const result = await windows.executeCommand(command);
      
      console.log("\n✅ Windows Response:\n");
      console.log(result);
    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  });

program
  .command("config")
  .description("Configure your GitHub token")
  .action(() => {
    console.log("To configure, set your GitHub token:");
    console.log("export GITHUB_TOKEN=your_github_token");
    console.log("\nOr create a .env file in your project directory:");
    console.log("GITHUB_TOKEN=your_github_token");
  });

program
  .command("version")
  .description("Show version")
  .action(() => {
    console.log(`Termux Copilot CLI v${VERSION}`);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
