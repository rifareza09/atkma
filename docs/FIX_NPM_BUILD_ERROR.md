# ⚡ QUICK FIX: "Could not determine Node.js install directory" Error

## 🚨 PROBLEMA

```
> npm run build
Could not determine Node.js install directory
Error: Command failed with exit code 1
```

---

## ✅ SOLUSI (Pick One)

### **OPSI 1: Quick Reset (Recommended)** ⭐ (5 menit)

**Step 1: Close VS Code Completely**
```
1. Close all VS Code windows
2. Wait 10 seconds
3. Close any npm/node processes
```

**Step 2: Clear npm Cache**
```powershell
# Open NEW PowerShell window
cd C:\Users\user\Herd\atkma

# Clear npm cache
npm cache clean --force --legacy-peer-deps

# Or manual clear (if above fails)
Remove-Item -Path $env:APPDATA\npm-cache -Recurse -Force -ErrorAction Ignore
```

**Step 3: Reinstall Dependencies**
```powershell
# Delete lock files
Remove-Item package-lock.json, node_modules -Recurse -Force -ErrorAction Ignore

# Reinstall
npm install --legacy-peer-deps

# Build
npm run build
```

---

### **OPSI 2: Update npm Properly** (10 menit)

```powershell
# Check current npm version
npm --version

# Update npm safely
npm install -g npm --legacy-peer-deps

# Or reinstall Node.js from https://nodejs.org
# Download LTS version and reinstall completely
```

---

### **OPSI 3: Use Yarn Instead** (Alternative) (8 menit)

```powershell
# Install yarn globally
npm install -g yarn

# Use yarn instead of npm
yarn install
yarn build
```

---

### **OPSI 4: Complete Reset (Nuclear Option)** ⚠️ (15 menit)

**If everything else fails:**

**Step 1: Uninstall Node.js**
```
1. Go to Control Panel → Add/Remove Programs
2. Find "Node.js"
3. Click Uninstall → Follow wizard
```

**Step 2: Delete npm/node folders**
```powershell
# Remove npm cache and modules
Remove-Item -Path $env:APPDATA\npm -Recurse -Force -ErrorAction Ignore
Remove-Item -Path $env:APPDATA\npm-cache -Recurse -Force -ErrorAction Ignore
Remove-Item -Path C:\Users\user\AppData\Local\npm -Recurse -Force -ErrorAction Ignore
```

**Step 3: Reinstall Node.js**
```
1. Download LTS from https://nodejs.org
2. Install fresh copy
3. Restart computer
4. Run: npm install
5. Run: npm run build
```

---

## 🎯 STEP-BY-STEP BEST APPROACH

**Di VSCode, buka Terminal BARU:**

```powershell
# 1. Check location
Get-Location
# Should output: C:\Users\user\Herd\atkma

# 2. Kill any hanging npm processes
Get-Process node -ErrorAction Ignore | Stop-Process -Force -ErrorAction Ignore

# 3. Wait 5 seconds
Start-Sleep -Seconds 5

# 4. Clear cache
npm cache clean --force

# 5. Delete old modules
Remove-Item -Path node_modules -Recurse -Force -ErrorAction Ignore
Remove-Item -Path package-lock.json -Force -ErrorAction Ignore

# 6. Fresh install
npm install

# 7. Try building
npm run build
```

---

## 📋 CHECKLIST

```
✅ Close VS Code completely
✅ Open NEW terminal (Ctrl+Shift+`)
✅ Kill node processes
✅ Clear npm cache
✅ Delete node_modules
✅ Delete package-lock.json
✅ Run npm install
✅ Run npm run build
```

---

## 🆘 Jika Masih Gagal

**Beritahu me dengan output:**

```
1. npm --version
2. node --version
3. npm run build 2>&1 (lengkap errornya)
```

Then saya bisa debug lebih detail! 🔧

---

## 💡 TIPS

- **Never use `sudo` or run as admin** (bisa corrupt npm install)
- **Use `--legacy-peer-deps` flag** jika ada peer dependency warning
- **Check antivirus** (sometimes blocks npm)
- **Check disk space** (need at least 5GB free)

---

**Try OPSI 1 first. Kalau gak berhasil, report output dari Step 1-3 ke saya!** 🚀
