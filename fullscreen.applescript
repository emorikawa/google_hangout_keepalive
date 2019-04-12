on run argv
  set theapp to item 1 of argv
  tell application "System Events" to key code 124 using control down
  tell application theapp
    activate
    delay 2
    (* 
      Initially from http://stackoverflow.com/questions/8215501/applescript-use-lion-fullscreen
    *)
    set isfullscreen to false
    tell application "System Events" to tell process theapp
      activate
      set isfullscreen to value of attribute "AXFullScreen" of window 1
    end tell
    -- display dialog "var " & isfullscreen

    if isfullscreen is false then
      tell application "System Events" to keystroke "f" using { command down, control down }
      delay 2
    end if
  end tell
end run
