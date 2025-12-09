#!/usr/bin/env node

const WindowsPlatform = require("./src/platforms/windows");
const config = require("./src/config");

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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
