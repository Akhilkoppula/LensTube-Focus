function applyFocusMode(isEnabled) {
  // Selectors for Sidebar, Comments, and Chat
  const selectors = ['#secondary', '#comments', 'ytd-live-chat-frame', '#related'];
  
  selectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.display = isEnabled ? 'none' : '';
    }
  });

  // Adjust the primary video container to center it
  const primary = document.querySelector('#primary');
  if (primary) {
    primary.style.maxWidth = isEnabled ? '100%' : '';
    primary.style.paddingRight = isEnabled ? '0' : '';
    primary.style.margin = isEnabled ? '0 auto' : '';
  }
}

// Check storage when a video page loads
chrome.storage.local.get("focusEnabled", (data) => {
  // Wait a moment for YouTube's heavy DOM to load
  setTimeout(() => applyFocusMode(data.focusEnabled), 500);
});

// Watch for changes while the user is on the page
chrome.storage.onChanged.addListener((changes) => {
  if (changes.focusEnabled) {
    applyFocusMode(changes.focusEnabled.newValue);
  }
});