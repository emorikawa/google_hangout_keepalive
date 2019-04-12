tell application "System Events" to key code 124 using control down
tell application "Chrome"
  activate
  delay 2
  set isfullscreen to false
  tell application "System Events" to tell process "Chrome"
    activate
    set isfullscreen to value of attribute "AXFullScreen" of window 1
  end tell
  -- display dialog "var " & isfullscreen

  if isfullscreen is false then
    tell application "System Events" to keystroke "f" using { command down, control down }
    delay 2
  end if
end tell
