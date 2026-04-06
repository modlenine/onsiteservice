# 🚀 Onsite Service - Deployment Guide

## 📋 สารบัญ
1. [Development Setup](#development-setup)
2. [Production Deployment](#production-deployment)
3. [Configuration Files](#configuration-files)
4. [API Endpoints](#api-endpoints)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Development Setup

### Prerequisites
- Node.js 14+ และ npm
- MAMP/XAMPP (PHP 8.0+)
- Git

### ขั้นตอนการตั้งค่า

#### 1. Clone Repository
```bash
cd d:\vue
git clone <repository-url> onsiteservice
cd onsiteservice
```

#### 2. ติดตั้ง Dependencies
```bash
npm install
```

#### 3. Configuration Files

**ตรวจสอบไฟล์ `.env.development`:**
```env
VUE_APP_BASE_URL=/
VUE_APP_API_BASE_URL=/intsys/onsiteservice/onsite_backend/api
VUE_APP_BACKEND_PORT=8080
NODE_ENV=development
```

#### 4. เริ่ม Development Server
```bash
npm run serve
```

เปิดเบราเซอร์ที่: **http://localhost:8081**

### 🔄 Proxy Configuration

Development mode ใช้ **Webpack Dev Server Proxy** สำหรับ:
- แก้ปัญหา CORS
- Forward API requests ไปยัง MAMP (localhost:80)
- ทดสอบการ share session กับ intranet

**การทำงานของ Proxy:**
```
Browser → http://localhost:8081/intsys/... 
         ↓ (Proxy Forward)
      → http://localhost:8080/intsys/...
         ↓
      → MAMP → Backend API
```

ดู configuration ใน `vue.config.js`:
```javascript
devServer: {
    port: 8081,
    proxy: {
        '/intranet': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false
        },
        '/intsys': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false
        }
    }
}
```

---

## 🌐 Production Deployment

### ขั้นตอนการ Build

#### 1. ตรวจสอบ Environment Variables

**แก้ไข `.env.production`:**
```env
VUE_APP_BASE_URL=/intsys/onsiteservice/
VUE_APP_API_BASE_URL=/intsys/onsiteservice/onsite_backend/api
NODE_ENV=production
```

#### 2. Build สำหรับ Production
```bash
npm run build
```

ไฟล์ที่ build จะอยู่ในโฟลเดอร์ `dist/`

#### 3. Deploy ไปยัง Server

**วิธีที่ 1: Manual Upload**
```bash
# คัดลอกไฟล์ทั้งหมดจาก dist/ ไปยัง:
d:\MAMP\htdocs\intsys\onsiteservice\
```

**วิธีที่ 2: Using Git on Server**
```bash
# บน server
cd /path/to/intsys/onsiteservice
git pull origin master
npm install
npm run build
```

#### 4. ตั้งค่า Apache/Nginx

**สำหรับ Apache (.htaccess):**
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

---

## 📁 Configuration Files

### `vue.config.js`
```javascript
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' 
        ? '/intsys/onsiteservice/' 
        : '/',
    
    devServer: {
        port: 8081,
        proxy: {
            '/intranet': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false
            },
            '/intsys': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
```

### Environment Files
| ไฟล์ | ใช้เมื่อ | คำอธิบาย |
|------|---------|----------|
| `.env` | ทุกครั้ง | ค่าเริ่มต้นทั่วไป |
| `.env.local` | ทุกครั้ง | Override ค่าท้องถิ่น (ไม่ commit) |
| `.env.development` | `npm run serve` | Development mode |
| `.env.production` | `npm run build` | Production build |

---

## 🔌 API Endpoints

### Base URLs

**Development:**
```
Frontend: http://localhost:8081
Backend:  http://localhost:8080/intsys/onsiteservice/onsite_backend
API:      http://localhost:8080/intsys/onsiteservice/onsite_backend/api
```

**Production:**
```
Frontend: https://intranet.saleecolour.com/intsys/onsiteservice/
Backend:  https://intranet.saleecolour.com/intsys/onsiteservice/onsite_backend
API:      https://intranet.saleecolour.com/intsys/onsiteservice/onsite_backend/api
```

### Authentication Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/checklogin` | POST | Local login |
| `/api/checksession` | POST | Check session from intranet |
| `/api/logout` | POST | Logout and destroy session |

### Data Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/api_loadOnsiteList` | POST | Load onsite list (DataTables) |
| `/api/api_getViewData` | POST | Get single onsite data |
| `/api/api_saveDataMain` | POST | Create new onsite request |
| `/api/api_saveEditDataMain` | POST | Update onsite request |
| `/api/api_canceldata` | POST | Cancel request |
| `/api/api_saveInprocess` | POST | Update in-process status |
| `/api/api_saveAction` | POST | Save action/comment |

---

## 🔍 Troubleshooting

### ปัญหา: API ไม่ทำงานใน Dev Mode

**Symptom:** Network error หรือ 404 Not Found

**Solutions:**
1. ตรวจสอบ MAMP ว่าเปิดอยู่หรือไม่
2. ตรวจสอบ port ของ MAMP (ควรเป็น 80)
3. ตรวจสอบ proxy config ใน `vue.config.js`
4. เปิด Network tab ใน DevTools ดูว่า request ถูก forward ถุกต้องหรือไม่

```bash
# ทดสอบว่า backend ทำงานหรือไม่
curl http://localhost:8080/intsys/onsiteservice/onsite_backend/
```

### ปัญหา: CORS Policy Error

**Symptom:** "Access to XMLHttpRequest has been blocked by CORS policy"

**Solutions:**
1. ตรวจสอบว่าใช้ proxy ใน dev mode (ควรไม่เจอ CORS)
2. ตรวจสอบ backend ว่ามี CORS headers หรือไม่:
   ```php
   // index.php
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Credentials: true");
   ```

### ปัญหา: Session ไม่ทำงาน

**Symptom:** Login แล้วไม่เห็น session

**Solutions:**
1. ตรวจสอบ cookies ใน DevTools → Application → Cookies
2. ควรเห็น `PHPSESSID` cookie
3. ตรวจสอบว่า backend session config ถูกต้อง
4. ตรวจสอบว่า `ci_sessions` table มีข้อมูล

### ปัญหา: Production Blank Page

**Symptom:** Production แสดงหน้าขาว ๆ

**Solutions:**
1. ตรวจสอบ `publicPath` ใน `vue.config.js`
2. เปิด DevTools Console ดู error
3. ตรวจสอบว่า path ของ static files ถูกต้อง
4. Rebuild:
   ```bash
   npm run build
   ```

### ปัญหา: Assets ไม่โหลด

**Symptom:** CSS/JS ไฟล์ไม่โหลดใน production

**Solutions:**
1. ตรวจสอบ `publicPath` ให้ตรงกับ path บน server
2. ตรวจสอบว่าไฟล์ใน `dist/` ถูก copy ถูกต้อง
3. ตรวจสอบ permissions ของไฟล์

---

## 📝 Checklist ก่อน Deploy

### Development
- [ ] ติดตั้ง dependencies แล้ว (`npm install`)
- [ ] MAMP/XAMPP ทำงานปกติ (port 80)
- [ ] ไฟล์ `.env.development` ถูกต้อง
- [ ] Proxy config ใน `vue.config.js` ถูกต้อง
- [ ] ทดสอบ login/logout
- [ ] ทดสอบ session sharing กับ intranet

### Production
- [ ] แก้ไข `.env.production` ให้ถูกต้อง
- [ ] Build production (`npm run build`)
- [ ] ตรวจสอบไฟล์ใน `dist/` ครบถ้วน
- [ ] Copy ไฟล์ไปยัง server
- [ ] ตั้งค่า `.htaccess` ให้ถูกต้อง
- [ ] ทดสอบบนเบราเซอร์จริง
- [ ] ตรวจสอบ Console ไม่มี error
- [ ] ทดสอบ authentication flow
- [ ] ทดสอบทุก features หลัก

---

## 🔐 Security Notes

1. **ไม่ commit sensitive files:**
   - `.env.local`
   - `.env.production.local`
   - ไฟล์ที่มี credentials

2. **ใช้ HTTPS ใน production**

3. **ตรวจสอบ session timeout** (default 4 hours)

4. **เปิดใช้ CSRF protection** ใน CodeIgniter

---

## 📞 Support

หากพบปัญหา กรุณาติดต่อ:
- IT Department (DeptCode: 1002)
- Email: it@saleecolour.com

---

**Last Updated:** April 6, 2026  
**Version:** 1.0.0
