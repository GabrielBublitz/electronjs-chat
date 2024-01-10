const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

contextBridge.exposeInMainWorld("exposedAxios", {
  callApi: () => {
    setInterval(getApi, 10000);
  },
});

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

function getApi() {
  axios
    .get("https://pokeapi.co/api/v2/pokemon/ditto")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}
