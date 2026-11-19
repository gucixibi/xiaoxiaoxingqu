@echo off
chcp 65001 >nul
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 serve.py
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo 没有找到 Python。请直接双击本文件夹的 index.html 使用网页版。
  ) else (
    python serve.py
  )
)
pause
