const electron = require('electron');
const storage = require('electron-json-storage');


// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

//const material = require('material-design-lite');


function createWindow () {

  storage.get('window', function(error, data) {

    if (error) throw error;

    console.log(data);

    // Create the browser window.
    mainWindow = new BrowserWindow({
  		  //title:'Electron Video Player',
  		  'accept-first-mouse':true,
  		  width: data.width || 640,
  		  height: data.height || 480,
        minHeight: 100,
        minWidth: 100,
        x: data.x || null,
        y: data.y || null,
        alwaysOnTop: true,
        resizable: true,
        transparent: true,
  		  frame: false,
        kiosk: false,
  		  //icon:__dirname+'/img/logo-256.png',
  		  //'text-areas-are-resizable':false
  	  });

      // and load the index.html of the app.
      mainWindow.loadURL(`file://${__dirname}/player.html`);

      if (data.maximized) {

       mainWindow.maximize();

      }

      // Open the DevTools.
      //mainWindow.webContents.openDevTools()

      // Emitted when the window is closed.

      mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.

/*
        var bounds = mainWindow.getBounds();

        storage.set("window", {

         x: bounds.x,

         y: bounds.y,

         width: bounds.width,

         height: bounds.height,

         maximized: mainWindow.isMaximized()

       }, function(error) {

          if (error) throw error;

       });
       */

        mainWindow = null
      });





  });




}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
