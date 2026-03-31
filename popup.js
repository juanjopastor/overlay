const toggleButton = document.getElementById('toggleButton');
const configureButton = document.getElementById('configureButton');
const shortcutText = document.getElementById('shortcutText');

async function sendToggleMessage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { type: 'toggle-overlay' }, () => {
    if (chrome.runtime.lastError) {
      console.warn('No overlay receiver in this tab:', chrome.runtime.lastError.message);
    }
  });
}

function openShortcutSettings() {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
}

function renderShortcut(commands) {
  const toggleCommand = commands.find(cmd => cmd.name === 'toggle-overlay');
  if (!toggleCommand) {
    shortcutText.textContent = 'No definido';
    return;
  }

  shortcutText.textContent = toggleCommand.shortcut || 'Sin asignar';
}

chrome.commands.getAll(renderShortcut);

toggleButton.addEventListener('click', sendToggleMessage);
configureButton.addEventListener('click', openShortcutSettings);
