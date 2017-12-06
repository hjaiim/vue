set "sourcePath=%1%"
set "targetPath=%2%"
echo D|xcopy %sourcePath%\*.js  %targetPath% /S /E
echo D|xcopy template %targetPath% /s/e
echo D|xcopy data %targetPath%\data /s/e
echo F|xcopy libs\*.* %targetPath%\libs /Y
