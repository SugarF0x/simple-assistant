$(() => {
  let input = $('#betInput');

  chrome.storage.sync.get("baseline", bet => {
    input.val(bet.baseline);
  });

  input.on("change paste keyup", () => {
    chrome.storage.sync.set({baseline: input.val()});
    chrome.storage.sync.set({current: input.val()});
  });
});