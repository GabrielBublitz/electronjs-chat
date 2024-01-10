document.getElementById("closeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("close");
});

document.getElementById("maximizeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("maximize");
});

document.getElementById("minimizeBtn").addEventListener("click", () => {
  window.ipcRenderer.send("minimize");
});

document.addEventListener("DOMContentLoaded", () => {
  window.exposedAxios.callApi();
});

var form = document.getElementById("myForm");

form.addEventListener("submit", (e) =>{
  e.preventDefault();
});
