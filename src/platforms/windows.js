const { Client } = require("ssh2");

class WindowsPlatform {
  constructor(config) {
    this.host = config.host;
    this.username = config.username;
    this.password = config.password;
  }

  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      const client = new Client();
      
      client.on("ready", () => {
        client.exec(`powershell.exe -Command "${command}"`, (err, stream) => {
          if (err) reject(err);
          
          let output = "";
          stream.on("close", () => {
            client.end();
            resolve(output);
          });
          stream.on("data", (data) => {
            output += data.toString();
          });
        });
      }).connect({
        host: this.host,
        username: this.username,
        password: this.password
      });

      client.on("error", reject);
    });
  }
}

module.exports = WindowsPlatform;
