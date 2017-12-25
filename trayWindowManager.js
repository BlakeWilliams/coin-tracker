class TrayWindowManager {
  constructor(tray, window) {
    this.tray = tray;
    this.window = window;
    this.visible = false;

    tray.on('click', () => this.toggle());
    window.on('blur', () => this.hide());
  }

  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this._showWindow();
    this.tray.setHighlightMode('always')
    this.visible = true;
  }

  hide() {
    this.window.hide();
    this.tray.setHighlightMode('never')
    this.visible = false;
  }

  _showWindow() {
    const position = this._getIconCenter()
    this.window.setPosition(position.x, position.y, false)
    this.window.show()
    this.window.focus()
  }

  _getIconCenter() {
    const windowBounds = this.window.getBounds()
    const trayBounds = this.tray.getBounds()

    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    const y = Math.round(trayBounds.y + trayBounds.height)

    return { x, y };
  }
}

export default TrayWindowManager;
