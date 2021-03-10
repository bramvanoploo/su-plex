const {app, BrowserWindow} = require('electron')
const path = require('path')
const electronLocalshortcut = require('electron-localshortcut');

function createWindow () {
  const mainWindow = new BrowserWindow({
    title: 'Plex',
    icon: './assets/images/logo.png',
    width: 1920,
    height: 1080,
    center: true,
    useContentSize: false,
    fullscreenable: false,
    simpleFullscreen: false,
    backgroundColor: '#1E1E1E',
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://app.plex.tv/desktop#!/', {
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
    webPreferences: {
      plugins: true
    }
  })
  mainWindow.removeMenu()

  // fullscreen on maximize
  mainWindow.on('maximize', () => {
    mainWindow.setFullScreen(true);
  });

  // Fullscreen on Alt+Enter
  electronLocalshortcut.register(mainWindow, 'Alt+Enter', () => {
    mainWindow.setFullScreen(true);
  });

  // exit fullscreen on esc key
  electronLocalshortcut.register(mainWindow, 'Esc', () => {
    mainWindow.setFullScreen(false);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('widevine-ready', createWindow);
