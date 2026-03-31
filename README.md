# Overlay Box Chrome Extension

A simple Chrome extension that adds a movable, resizable overlay box to the current tab.
This extension is intended for language learners who want to hide and unhide embedded subtitles while watching videos on YouTube or other streaming sites. The overlay can be used as a manual subtitle cover so you can practice listening without losing track of the subtitle area.

## Features

- Opens a black overlay box on the active tab
- Drag the overlay by its header
- Resize from the bottom-right handle
- Close the overlay with the orange close button
- Toggle the overlay with a keyboard shortcut
- Configure the shortcut in Chrome extensions settings

## Files

- `manifest.json` - extension manifest
- `background.js` - handles action click and keyboard shortcut commands
- `content.js` - creates and manages the overlay UI in the page
- `popup.html` / `popup.js` - extension popup for opening the overlay and showing the hotkey
- `style.css` - overlay styles
- `README.md` - this file

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select the `overlay` folder

## Usage

- Click the extension icon to open the popup
- Click `Open overlay` to show the overlay on the active tab
- Position the box over subtitles in videos to hide them while you listen
- Click the close button `×` to hide the overlay and reveal subtitles again
- Drag the overlay by its header
- Resize the overlay from the bottom-right corner

## Shortcut

The default hotkey is:

- `Ctrl+Shift+Y` on Windows/Linux
- `Command+Shift+Y` on macOS

To change it:

1. Open `chrome://extensions/shortcuts`
2. Find the command `Toggle overlay`
3. Assign a different hotkey

You can also change the shortcut through the extension popup GUI by clicking `Configure shortcut`.

## Default position and size

The overlay default position and size are defined in `style.css`:

- `top` and `left` control the starting position
- `width` and `height` control the initial size

Example:

```css
#chrome-overlay-box {
  top: 80px;
  left: 80px;
  width: 280px;
  height: 160px;
}
```

## Notes

- The content script runs on all pages, but some Chrome internal pages (like `chrome://`) do not support content scripts.
- If the popup button is pressed on an unsupported page, the extension will fail gracefully without crashing.
