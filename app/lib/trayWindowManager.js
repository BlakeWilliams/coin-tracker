import { screen as desktopScreen } from "electron";

const BODY_MARGIN = 10;

class TrayWindowManager {
  constructor(tray, window) {
    this.tray = tray;
    this.window = window;

    tray.on("click", () => this.toggle());
    tray.on("double-click", () => this.toggle());

    window.on("blur", () => this.hide());
    window.on("show", () => tray.setHighlightMode("always"));
    window.on("hide", () => tray.setHighlightMode("never"));
  }

  toggle() {
    if (this.window.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this._showWindow();
  }

  hide() {
    this.window.hide();
  }

  _showWindow() {
    const position = this._getIconCenter();
    this.window.setPosition(position.x, position.y, false);
    this.window.show();
  }

  _getIconCenter() {
    const windowBounds = this.window.getBounds();
    const trayBounds = this.tray.getBounds();

    const x = this._getXForWindow(windowBounds, trayBounds);
    const y = Math.round(trayBounds.y + trayBounds.height);

    return { x, y };
  }

  _getXForWindow(windowBounds, trayBounds) {
    const { width: screenWidth } = desktopScreen.getPrimaryDisplay().bounds;
    const rightWhenPositionedLeft = trayBounds.x + windowBounds.width;

    if (rightWhenPositionedLeft > screenWidth) {
      return trayBounds.x - windowBounds.width + trayBounds.width + BODY_MARGIN;
    } else {
      return trayBounds.x - BODY_MARGIN;
    }
  }
}

export default TrayWindowManager;
