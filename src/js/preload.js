const { contextBridge, ipcRenderer, ipcMain } = require("electron");
// const axios = require("axios");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("ipcMain", ipcMain);

// contextBridge.exposeInMainWorld("exposedAxios", {
//   callApi: () => {
//     setInterval(getApi, 10000);
//   },
// });

// function getApi() {
//   axios
//     .get("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log("Error: " + error);
//     });
// }
