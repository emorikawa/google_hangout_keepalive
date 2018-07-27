const CHECK_INTERVAL_SEC = 2;

function doClick(el) {
  console.log("Ensuring click", el)
  const eargs = {bubbles: true, cancelable: true, view: window}
  const down = new MouseEvent("mousedown", eargs);
  const up = new MouseEvent("mouseup", eargs);
  setTimeout(() => el.dispatchEvent(down), 0)
  setTimeout(() => el.dispatchEvent(up), 0)
}

function findBtnWithText(text) {
  return Array.from(document.querySelectorAll('div[role="button"]')).filter((b) => b.innerText.toLowerCase().trim() == text)[0]
}

function reloadAtMidnight() {
  const now = new Date();
  if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() <= CHECK_INTERVAL_SEC + 1) {
    window.location.reload();
  }
}

function checkLoop() {
  ['join', 'yes', 'try again', 'ok'].forEach((btnText) => {
    const btn = findBtnWithText(btnText)
    if (btn) doClick(btn)
  })
  reloadAtMidnight()
}

setInterval(checkLoop, CHECK_INTERVAL_SEC * 1000)
