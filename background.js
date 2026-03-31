function sendToggleMessageToActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;

    chrome.tabs.sendMessage(tab.id, { type: 'toggle-overlay' }, () => {
      if (chrome.runtime.lastError) {
        // Content script may not be injected on this page or the page is restricted.
      }
    });
  });
}

chrome.action.onClicked.addListener(() => {
  sendToggleMessageToActiveTab();
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-overlay') {
    sendToggleMessageToActiveTab();
  }
});
