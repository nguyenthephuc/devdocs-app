const path = require('path')
const electron = require('electron')

const app = electron.app
let tray = null

exports.create = win => {
    if (process.platform === 'darwin' || tray) return;

    const iconPath = path.join(__dirname, 'static/tray.png')

    const toggleWin = () => {
        if (win.isVisible())
            win.hide()
        else
            win.show()
    }

    const contextMenu = electron.Menu.buildFromTemplate([{
            label: 'Toggle',
            click() {
                toggleWin()
            }
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ])

    tray = new electron.Tray(iconPath)
    tray.setToolTip(`${app.getName()}`)
    tray.setContextMenu(contextMenu)
    tray.on('click', toggleWin)
}