const CHECK_INTERVAL_SEC = 2;
const EMAIL = ''
const PASSWORD = ''

function doClick(el) {
  if (!el) return
  console.log("Ensuring click", el)
  const eargs = {bubbles: true, cancelable: true, view: window}
  const down = new MouseEvent("mousedown", eargs);
  const up = new MouseEvent("mouseup", eargs);
  const click = new MouseEvent("click", eargs);
  setTimeout(() => el.dispatchEvent(down), 0)
  setTimeout(() => el.dispatchEvent(up), 0)
  setTimeout(() => el.dispatchEvent(click), 0)
}

function findWithText(text, selector='div[role="button"]') {
  return Array.from(document.querySelectorAll(selector)).filter((b) => b.innerText.toLowerCase().trim() == text)[0]
}

function findWithAriaLabel(text, selector='div[role="button"]') {
  return Array.from(document.querySelectorAll(selector)).filter((b) => b.getAttribute('aria-label') == text)[0]
}

function reloadAtMidnight() {
  const now = new Date();
  if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() <= CHECK_INTERVAL_SEC + 1) {
    window.location.reload();
  }
}

function checkLoop() {
  ['join', 'yes', 'try again', 'ok'].forEach((btnText) => {
    const btn = findWithText(btnText)
    if (btn) doClick(btn)
  })
  signIntoGoogle()
  reloadAtMidnight()
}

function signIntoGoogle() {
  if (findWithText('choose an account', '#headingText')) {
    const chooseAccount = findWithText(EMAIL, 'p[role="heading"]')
    doClick(chooseAccount)
  }

  const unmute = findWithAriaLabel('Unmute microphone');
  if (unmute) {
    doClick(unmute)
  }

  const password = document.querySelector('input[type="password"]')
  if (password) {
    const curUser = document.getElementById('profileIdentifier')
    if (curUser && curUser.innerText !== EMAIL) {
      doClick(curUser)
    } else {
      password.value = PASSWORD
      doClick(findWithText('next'))
    }
  }

  if (/interstitials/gi.test(window.location.href)) {
    doClick(findWithText('do this later', 'a'))
  }
}

setInterval(checkLoop, CHECK_INTERVAL_SEC * 1000)
