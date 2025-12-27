const btn = document.getElementById('toggleBtn');

// Load current state when popup opens
chrome.storage.local.get("focusEnabled", (data) => {
  updateButtonUI(data.focusEnabled);
});

// Toggle state on click
btn.addEventListener('click', () => {
  chrome.storage.local.get("focusEnabled", (data) => {
    const newState = !data.focusEnabled;
    chrome.storage.local.set({ focusEnabled: newState }, () => {
      updateButtonUI(newState);
    });
  });
});

function updateButtonUI(isEnabled) {
  if (isEnabled) {
    btn.innerText = "Focus: ON";
    btn.classList.add('active');
  } else {
    btn.innerText = "Focus: OFF";
    btn.classList.remove('active');
  }
}