# 🚀 Quick Production Deployment Guide

## ⚡ สำหรับคนรีบ

### 📋 Pre-Deployment Checklist
```bash
# 1. แก้ไข .env.production (ถ้าจำเป็น)
nano .env.production

# 2. Build
npm run build

# 3. รอจนเสร็จ (ประมาณ 1-2 นาที)
```

### 📤 Deploy to Server

#### Option 1: Local Server (MAMP/XAMPP)
```bash
# Copy ทั้งหมดจาก dist/ ไปยัง
# d:\MAMP\htdocs\intsys\onsiteservice\
```

#### Option 2: Remote Server (FTP/SSH)
```bash
# Upload ไฟล์ทั้งหมดใน dist/ ไปยัง:
# /path/to/public_html/intsys/onsiteservice/
```

#### Option 3: Git Deploy
```bash
# บน server
cd /path/to/intsys/onsiteservice
git pull origin master
npm install
npm run build
```

### 🔧 ตั้งค่า .htaccess

**Copy ไฟล์:**
```bash
cp .htaccess.example dist/.htaccess
```

**หรือสร้างใหม่ใน dist/.htaccess:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /intsys/onsiteservice/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /intsys/onsiteservice/index.html [L]
</IfModule>
```

### ✅ ทดสอบ

1. **เปิดเบราเซอร์:**
   ```
   https://intranet.saleecolour.com/intsys/onsiteservice/
   ```

2. **ตรวจสอบ Console (F12):**
   - ไม่มี error สีแดง
   - ไฟล์ CSS/JS โหลดครบ

3. **ทดสอบ Features:**
   - [ ] Login ทำงาน (ใช้ intranet session)
   - [ ] หน้าหลักแสดงข้อมูล
   - [ ] สร้างรายการใหม่ได้
   - [ ] Logout ทำงาน

---

## ⚠️ สิ่งที่ต้องแก้ไข (กรณี Deploy ที่ Path อื่น)

### ถ้า Deploy ที่ `/app/onsite/` แทน

**1. แก้ไข `.env.production`:**
```env
VUE_APP_BASE_URL=/app/onsite/
```

**2. แก้ไข `vue.config.js`:**
```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/app/onsite/' : '/'
```

**3. แก้ไข `src/main.js` บรรทัด 31:**
```javascript
case 'production': return '/app/onsite/'
```

**4. แก้ไข `.htaccess` ใน dist/:**
```apache
RewriteBase /app/onsite/
RewriteRule . /app/onsite/index.html [L]
```

**5. Build ใหม่:**
```bash
npm run build
```

---

## 🔥 Common Issues

### ปัญหา: Blank Page
```bash
# ตรวจสอบ Console → หา error
# มักเกิดจาก publicPath ผิด

# แก้ไข: rebuild ด้วย publicPath ที่ถูกต้อง
```

### ปัญหา: 404 Not Found
```bash
# ตรวจสอบว่ามีไฟล์ .htaccess หรือไม่
# ตรวจสอบว่า mod_rewrite เปิดใช้งานหรือไม่

# Test:
curl -I https://your-server.com/intsys/onsiteservice/
```

### ปัญหา: API ไม่ทำงาน
```bash
# ตรวจสอบ Network tab
# ดูว่า API endpoint ถูกต้องหรือไม่
# ตรวจสอบว่า backend ทำงานอยู่หรือไม่
```

---

## 📊 Deployment Matrix

| File | Development | Production |
|------|-------------|------------|
| Port | 8081 | 80/443 |
| Base URL | `/` | `/intsys/onsiteservice/` |
| API Calls | Through Proxy | Direct |
| Session | Local/Intranet | Intranet Only |
| Build | No | Yes (`npm run build`) |

---

## 💾 Backup ก่อน Deploy

```bash
# Backup current version
cd /path/to/server
cp -r intsys/onsiteservice intsys/onsiteservice.backup_$(date +%Y%m%d)

# Deploy new version
cd intsys/onsiteservice
# ... deploy steps ...
```

---

## 📝 Post-Deployment Checklist

- [ ] ทดสอบ login
- [ ] ทดสอบ logout
- [ ] ทดสอบ create new request
- [ ] ทดสอบ view request detail
- [ ] ทดสอบ edit request
- [ ] ทดสอบ cancel request
- [ ] ทดสอบ reports/graphs
- [ ] ตรวจสอบ mobile responsive
- [ ] แจ้งทีมงานว่า deploy เรียบร้อย

---

## 🆘 Emergency Rollback

```bash
# หาก deploy ใหม่มีปัญหา
cd /path/to/server/intsys
rm -rf onsiteservice
mv onsiteservice.backup_YYYYMMDD onsiteservice
```

---

**Need help?** ดู [DEPLOYMENT.md](./DEPLOYMENT.md) สำหรับรายละเอียดเพิ่มเติม
