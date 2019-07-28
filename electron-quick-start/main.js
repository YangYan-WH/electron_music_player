const { app, BrowserWindow, ipcMain ,dialog} = require("electron");
const DataStore = require('./renderer/MusicDataStore')
// 持久化存储
const Store = require('electron-store');
const store = new Store();

const myStore = new DataStore({
  'name':'Music Data'
})

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true //可以使用 nodejs API
      }
    }
    const finalConfig = {...basicConfig , ...config}
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show',()=>{
      this.show()
    })
  }
}
app.on("ready", () => {
  const mainWindow = new AppWindow({} , "./renderer/index.html")

  ipcMain.on("add-music-window", (event, arg) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    } , "./renderer/add.html");
  });
  ipcMain.on('add-tracks', (event,tracks) =>{
    
    const updateTracks = myStore.addTracks(tracks).getTracks()
    console.log(updateTracks)
  })
  ipcMain.on('open-music-file',(event)=>{
    dialog.showOpenDialog({
      properties:['openFile','multiSelections'],
      filters:[{name:'Music',extensions: ['mp3']}]
    }, (files)=>{
      console.log(111)
      if(files){
        event.sender.send('selected-files', files)
      }
    })
  })
});
