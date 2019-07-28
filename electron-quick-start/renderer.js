// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')  //可以向 main 发送事件

window.addEventListener('DOMContentLoaded',()=>{
    ipcRenderer.send('message','hello from renderer')
    ipcRenderer.on('replay',(e,arg)=>{
        document.getElementById('message').innerHTML = arg
    })
})