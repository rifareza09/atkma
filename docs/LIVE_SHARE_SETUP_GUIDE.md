# 🚀 SETUP LIVE SHARE + PORT FORWARDING - TEAM COLLABORATION GUIDE

## 📋 QUICK OVERVIEW

Kamu punya 2 cara untuk team collaborate:

### **Opsi 1: VS Code Live Share** (Recommended untuk coding bersama)
- Real-time code editing
- Shared terminal
- Shared debugging
- Follow active editor

### **Opsi 2: Port Forwarding** (Untuk akses aplikasi dari local network)
- Share localhost URLs ke team
- Bisa test aplikasi bareng
- Live viewing pada browser

Saya rekomendasikan **Keduanya** untuk workflow terbaik! ✨

---

## 🔧 SETUP 1: VS CODE LIVE SHARE (RECOMMENDED)

### **A. Install Live Share Extension**

1. **Buka VS Code**
2. **Extensions** (Ctrl+Shift+X)
3. **Cari**: "Live Share"
4. **Install**: "Live Share Extension Pack" oleh Microsoft
   - Includes: Live Share + Live Share Audio

```
Publisher: Microsoft
ID: ms-vsliveshare.vsliveshare-pack
Version: 1.0.5886
```

### **B. Share Session dengan Team**

**Step 1: Start Live Share Session**
```
Ctrl+Shift+P → "Live Share: Start Collaboration Session"
```

**Step 2: Copy Link**
- Akan generate link seperti: `https://prod.liveshare.vscode.dev/join/...`
- **COPY dan KIRIM ke team** via Slack/WhatsApp/Email

**Step 3: Team Joins**
- Team buka link yang kamu share
- Pilih "Open in VS Code"
- Automatic join to session

### **C. VS Code Live Share Options**

Klik icon di sidebar untuk access options:

```
┌─────────────────────────┐
│ 🎯 LIVE SHARE PANEL     │
├─────────────────────────┤
│ 👥 Participants         │ → Lihat siapa yg join
│ 🎤 Audio Call           │ → Voice chat bersama
│ 🔗 Share Server         │ → Forward ports
│ ⚙️  Settings            │ → Akses control
└─────────────────────────┘
```

---

## 🌐 SETUP 2: PORT FORWARDING (SERVER ACCESS)

### **YOUR PORTS SETUP:**

**Development Servers Running:**

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| **Laravel Herd** | Auto (8000-9000) | http://atkma.test | Backend API |
| **Vite Dev Server** | 5173 | http://localhost:5173 | Frontend hot reload |
| **MySQL** | 3306 | 127.0.0.1:3306 | Database |

### **Find Your Herd Port**

```bash
# Open Laravel Herd Dashboard
# Click on your project "atkma"
# Look for "URL" - eg: http://atkma.test:8888 or just http://atkma.test
```

### **Option A: Port Forward via VS Code Live Share** ⭐

**EASIEST METHOD - Recommended!**

1. **Start Live Share Session** (like above)
2. **Click "Share Server" button**
3. **Configure ports:**

```
🔗 Share Server Button
    ↓
+ Add Port
    ↓
Port: 5173 (Vite)
Access Level: Public
Description: "Vite Dev Server"
    ↓

+ Add Port
    ↓
Port: 8000 (or guesses port for Herd)
Access Level: Public
Description: "Laravel Herd"
    ↓

+ Add Port
    ↓
Port: 3306 (MySQL - optional, for DB tools)
Access Level: Restricted (password protected)
Description: "MySQL Database"
```

**Share Link Generated:**
- Vite: `https://prod.liveshare.vscode.dev/sharedServers/...`
- Laravel: `https://prod.liveshare.vscode.dev/sharedServers/...`

**Send to Team** ➜ They click → Automatic port forward!

---

### **Option B: Manual Port Forwarding (Windows)**

**Jika Live Share port forward tidak mau:**

#### **Step 1: Find Your Machine IP**

```powershell
# Di Terminal PowerShell:
ipconfig
```

**Look for:**
```
Ethernet adapter / Wi-Fi adapter:
   IPv4 Address: 192.168.1.XXX
```

Example: `192.168.1.50`

#### **Step 2: Configure Windows Firewall**

**PowerShell (Run as Administrator):**

```powershell
# Open port 5173 (Vite)
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=tcp localport=5173

# Open port 8000 (Laravel Herd)
netsh advfirewall firewall add rule name="Laravel Herd" dir=in action=allow protocol=tcp localport=8000

# Check rules
netsh advfirewall firewall show rule name=all
```

#### **Step 3: Share with Team**

**Tell team to access:**
- **Vite**: `http://192.168.1.50:5173`
- **Laravel**: `http://192.168.1.50:8000` (or Herd's port)
- **Database**: `mysql://root@192.168.1.50:3306/ma`

---

### **Option C: Use ngrok (Best for Remote/External Network)**

**For accessing dari luar office/network:**

#### **Step 1: Install ngrok**

```bash
# Download dari https://ngrok.com/download
# Or via Chocolatey (Windows):
choco install ngrok
```

#### **Step 2: Start ngrok tunnels**

```bash
# Terminal 1 - Forward Vite
ngrok http 5173

# Terminal 2 - Forward Laravel
ngrok http 8000

# Terminal 3 - Forward MySQL (optional)
ngrok tcp 3306
```

**Output:**
```
Session Status                online
Account                       [your email]
Version                       3.3.5
Region                        jp,us
Latency                       25ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xx-xx.ngrok.io -> http://localhost:5173
Forwarding                    https://yyyy-yy-yy.ngrok.io -> http://localhost:8000
```

**Share with Team:**
- **Vite**: `https://xxxx-xx-xx.ngrok.io`
- **Laravel**: `https://yyyy-yy-yy.ngrok.io`

---

## 📋 RECOMMENDED SETUP FOR YOUR TEAM

### **Best Practice Workflow:**

```
┌─────────────────────────────────────────────┐
│  YOU (Developer 1)                          │
├─────────────────────────────────────────────┤
│ 1. Start VS Code Live Share Session         │
│ 2. Add ports (5173, 8000)                   │
│ 3. Copy Live Share link                     │
│ 4. Send to team via Slack                   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  TEAM (Aldi, Rendra, Farras)                │
├─────────────────────────────────────────────┤
│ 1. Click Live Share Link                    │
│ 2. Open in VS Code                          │
│ 3. Access shared Vite/Laravel URLs          │
│ 4. Code + view changes real-time            │
│ 5. Use shared terminal if needed            │
└─────────────────────────────────────────────┘
```

---

## 🎮 STEP-BY-STEP: START LIVE SHARE NOW

### **Quick Start (5 minutes):**

1. **Buka VS Code**
   ```
   Ctrl+Shift+P → "Live Share: Start Collaboration Session"
   ```

2. **Tunggu generate link** (takes 10-30 seconds)

3. **Auto-open di browser** - Copy link dari popup

4. **Add ports:**
   - Click Live Share icon (bottom left)
   - Look for "Shared Servers" section
   - Click "+" to add port 5173 (Vite)
   - Click "+" to add port 8000 (Laravel)

5. **Kirim link ke team:**
   ```
   "Halo teman, sini Live Share link untuk collaborate:
   https://prod.liveshare.vscode.dev/join/XXX..."
   ```

6. **Team click link → automatic connect!**

---

## ⚙️ LIVE SHARE SETTINGS TO CONFIGURE

### **Access Rights** (Click Live Share icon → ⚙️ Settings)

```
🔐 Who can join?
   ├─ Anyone with link (Public) ← RECOMMENDED
   ├─ Anyone in org (Organization)
   └─ Invite only (Private)

📝 Who can edit?
   ├─ Anyone (Allow all edits) ← RECOMMENDED
   ├─ Read-only (View only)
   └─ Guests can not edit

🎤 Audio/Video
   ├─ Enable audio calls
   └─ Share screen
```

### **Recommended Settings for Team:**
```javascript
{
  "liveshare.presence": true,           // Show cursor positions
  "liveshare.focusOnOpen": false,        // Don't auto-follow
  "liveshare.launcherClient": "web",     // Use web client
  "liveshare.languages": [
    "typescript",
    "javascript",
    "jsx",
    "tsx",
    "php",
    "markdown"
  ]
}
```

---

## 🚨 TROUBLESHOOTING

### **Problem 1: Team Can't Join Live Share**

```
❌ Error: "Connection failed"
```

**Solutions:**

a) **Check Internet Connection**
   - Restart router
   - Check Microsoft servers status

b) **Sign in to VS Code Account**
   ```
   Ctrl+Shift+P → "Live Share: Sign in"
   → Sign with Microsoft/GitHub account
   ```

c) **Firewall Blocking**
   ```powershell
   # Allow VS Code through firewall
   netsh advfirewall firewall add rule name="vs code" dir=in action=allow program="C:\...\Code.exe"
   ```

---

### **Problem 2: Port Forward Not Working**

```
❌ Error: "Cannot access http://192.168.1.50:5173"
```

**Check:**

```bash
# Terminal 1: Check if Vite running
netstat -ano | findstr :5173

# If listening, check firewall
netsh advfirewall firewall show rule name="Vite Dev Server"

# If empty, add rule again
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=tcp localport=5173
```

---

### **Problem 3: Live Share Server Not Listed**

```
❌ "Share Server" button greyed out
```

**Solutions:**

a) **Restart VS Code**
   - Close all windows
   - Reopen VS Code

b) **Extension issue**
   ```
   Ctrl+Shift+X → Disable ALL extensions
   → Enable only "Live Share Extension Pack"
   → Restart VS Code
   ```

c) **Update extension**
   ```
   Ctrl+Shift+X → Search "Live Share"
   → Click "Update" if available
   → Restart
   ```

---

## 📱 USING LIVE SHARE.VSCODE.DEV (WEB VERSION)

**Jika team tidak mau install VS Code (Web browser only):**

```
1. Start Live Share di VS Code (desktop)
2. Copy link: https://prod.liveshare.vscode.dev/join/XXX
3. Share ke team
4. Team buka di browser (ANY browser)
5. Can view code, chat, but limited editing
```

---

## 💡 BEST PRACTICES FOR TEAM COLLABORATION

### **1. Clear Role Assignment**
```
Driver (Code Writer): Kamu
Navigator (Reviewer): Aldi/Rendra
Observers: Others viewing only
```

### **2. Communication**
```
🎤 Use Live Share Audio
💬 Use terminal for notes
📝 Type comments in code
```

### **3. Screen Usage**
```
Share Screen Only:
Ctrl+Shift+P → "Live Share: Share Screen"
(vs sharing full project)
```

### **4. Work Sessions**
```
✅ DO:
- 2-4 person max per session (performance)
- Use @mentions in comments
- Document decisions

❌ DON'T:
- Share sensitive keys/passwords
- Leave session open unattended
- Accept random connection requests
```

---

## 🔐 SECURITY TIPS

### **For Production/Sensitive Code:**

```
❌ DON'T use Live Share for:
   - Sharing API keys
   - Exposing database passwords
   - Production server access

✅ DO:
   - Use "read-only" mode for viewers
   - Limit to "invite only"
   - End session when done
   - Clear browser history
```

### **Remove Ports When Done:**
```
1. Click Live Share icon
2. Hover over port
3. Click X to remove
4. End session: "Live Share: Stop Collaboration Session"
```

---

## 📞 ALTERNATIVE: SCREEN SHARING (If Live Share not working)

```
Tools untuk screen sharing:
1. VS Code Remote SSH (if on same network)
2. TeamViewer (full desktop)
3. Discord Screen Share (real-time collaboration)
4. Zoom Screen Share (professional)
```

---

## 🎯 QUICK REFERENCE CARD

```
┌────────────────────────────────────────────┐
│ LIVE SHARE QUICK COMMANDS                  │
├────────────────────────────────────────────┤
│ Start Session                              │
│ Ctrl+Shift+P → "Stop Collaboration"       │
│                                            │
│ Share Server Port                          │
│ Click Live Share icon → "Share Server"    │
│                                            │
│ Toggle Read-only                           │
│ Click participant → "Make Collaborator"   │
│                                            │
│ Stop Session                               │
│ Click Live Share icon → "Stop Session"    │
│                                            │
│ Join Session                               │
│ Click link → Click "Open in VS Code"      │
└────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST - READY FOR TEAM?

Before sending Live Share link to team:

- [ ] VS Code Live Share Extension Pack installed
- [ ] Logged in with Microsoft/GitHub account
- [ ] Live Share session started
- [ ] Port 5173 (Vite) added to shared servers
- [ ] Port 8000 (Laravel) added to shared servers
- [ ] Access level set to "Anyone with link"
- [ ] Edit permissions configured
- [ ] Link copied and ready to share
- [ ] Windows Firewall configured (if needed)
- [ ] Internet connection stable

---

## 🚀 YOUR SETUP SPECIFICALLY:

**Based on your .env:**

```env
APP_URL=http://atkma.test
DB_HOST=127.0.0.1
DB_PORT=3306
```

**Team should access:**

```
🎯 APPLICATION:
   Frontend (Vite): http://localhost:5173 (via Live Share)
   Backend (Herd):  http://atkma.test (when on your Live Share)
   
📊 DATABASE:
   Host: 127.0.0.1
   Port: 3306
   User: root
   Pass: (blank)
   DB: ma
   
💾 FILES:
   All shared via Live Share → No file copy needed!
```

---

## 📚 REFERENCES

- **VS Code Live Share Docs**: https://learn.microsoft.com/en-us/visualstudio/liveshare/
- **Live Share Features**: https://code.visualstudio.com/learn/collaboration/live-share
- **VS Code Port Forwarding**: https://code.visualstudio.com/docs/editor/port-forwarding

---

**Need help setting up? Ask team to:**
1. Install VS Code + Live Share Extension
2. Wait for your Live Share link
3. Join session
4. Start collaborating!

Good luck with team collaboration! 🎉
