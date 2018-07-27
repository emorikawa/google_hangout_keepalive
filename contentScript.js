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

function ensureClicks() {
  const joinBtn = findBtnWithText('join')
  const stillHereBtn = findBtnWithText('yes')

  if (joinBtn) doClick(joinBtn)
  if (stillHereBtn) doClick(joinBtn)
}

setInterval(ensureClicks, 2000)
