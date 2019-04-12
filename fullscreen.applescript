tell application "System Events" to key code 124 using control down
tell application "Google Chrome"
	activate
	set chromebounds to the bounds of the front window
	if item 2 of chromebounds ³ 23 then
		tell application "System Events" to keystroke "f" using {command down, control down}
	end if
end tell
