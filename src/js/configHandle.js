const { ipcMain } = require("electron");
const fs = require("fs");

function setupHandlers() {
  ipcMain.on("save-json", async (event, data) => {
    const jsonFilePath = "./user-config.json";

    try {
      await fs.promises.writeFile(jsonFilePath, data, "utf-8");
      event.reply("json-save-success");
    } catch (error) {
      console.error("Erro ao salvar Json: ", error);
      event.reply("json-save-error");
    }
  });

  ipcMain.on("read-json", async (event) => {
    const jsonFilePath = "./user-config.json";

    try {
      const fileContent = await fs.promises.readFile(jsonFilePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      console.log(JSON.stringify(jsonData) + '1');
      event.reply("json-data", JSON.stringify(jsonData));
      
    } catch (error) {
      console.error("Erro ao ler Json: ", error);
      event.reply("json-data", null);
    }
  });
}

module.exports = {
  setupHandlers,
};
