// Window control
document.getElementById("closeBtn").addEventListener("click", () => {
  ipcRenderer.send("close");
});

document.getElementById("maximizeBtn").addEventListener("click", () => {
  ipcRenderer.send("maximize");
});

document.getElementById("minimizeBtn").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});

// Default behaviors

document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

// Features

document.addEventListener("DOMContentLoaded", () => {
  // exposedAxios.callApi();
});

function saveToJson() {
  var inputValue = document.getElementById("inputValue").value;
  var portValue = document.getElementById("inputPort").value;

  var jsonData = {
    address: inputValue,
    port: portValue,
  };

  var jsonString = JSON.stringify(jsonData);

  ipcRenderer.send("save-json", jsonString);
}

function readJsonFile() {
  ipcRenderer.send("read-json");
}

ipcRenderer.on("json-data", (jsonData) =>{
  var preview = document.getElementById("preview");

  preview.textContent = jsonData;
  
});

document.getElementById("btnConfirm").addEventListener("click", (event) => {
  event.preventDefault();
  saveToJson();
});

document
  .getElementById("inputValue")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      saveToJson();
    }
  });

document.getElementById("btnPreview").addEventListener("click", (event) => {
  event.preventDefault();
  readJsonFile();
});
