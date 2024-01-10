// Window control
document.getElementById("closeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("close");
});

document.getElementById("maximizeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("maximize");
});

document.getElementById("minimizeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("minimize");
});

// Default behaviors

document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

// Features

document.addEventListener("DOMContentLoaded", () => {
  // window.exposedAxios.callApi();
});

function saveToJson() {
  var inputValue = document.getElementById("inputValue").value;
  var portValue = document.getElementById("inputPort").value;

  var jsonData = {
    address: inputValue,
    port: portValue
  };

  var jsonString = JSON.stringify(jsonData);

  window.ipcRenderer.send("save-json", jsonString);
}

function readJsonFile() {
  var preview = document.getElementById("preview");

  var json = window.ipcRenderer.send("read-json");
  console.log(json);
  
  preview.textContent = json;
}

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

document.getElementById("btnPreview").addEventListener('click', (event) =>{
  event.preventDefault();
  readJsonFile();
})