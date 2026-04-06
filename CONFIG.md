# 🔧 Configuration Summary - Onsite Service

## ✅ ไฟล์ที่ได้ Configuration แล้ว

### 1. **vue.config.js** - Webpack & Proxy Configuration
```javascript
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/intsys/onsiteservice/' : '/',
    
    devServer: {
        port: 8081, // Dev port
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

**สิ่งที่ต้องแก้ตอน Production:**
- ✅ `publicPath` ตั้งค่าให้ตรงกับ path บน server แล้ว
- ⚠️ ถ้า deploy ที่ path อื่น ให้แก้ `publicPath`

---

### 2. **src/main.js** - Global Mixin for API URLs
```javascript
Vue.mixin({
  methods: {
    getUrl(){
      if(typeof window !== "undefined"){
          // Development: ใช้ relative path (proxy จะจัดการ)
          // Production: ใช้ absolute URL
          if (process.env.NODE_ENV === 'development') {
              return '/';
          } else {
              return window.location.protocol+"//"+window.location.hostname+"/";
          }
      }
    },
    baseUrl(){
      switch (process.env.NODE_ENV) {
          case 'production': return '/intsys/onsiteservice/'
          case 'development': return '/'
          default: return ''
      }
    }
  }
})
```

**สิ่งที่ต้องแก้ตอน Production:**
- ⚠️ ถ้า server ใช้ port อื่น (ไม่ใช่ 80/443) ต้องแก้ `getUrl()`

---

### 3. **src/store/index.js** - Vuex Store with Session Management
```javascript
async checkSessionFromBackend({ commit }) {
  try {
    const apiUrl = process.env.NODE_ENV === 'development'
      ? '/intsys/onsiteservice/onsite_backend/api/checksession'
      : window.location.protocol + '//' + window.location.hostname + '/intsys/onsiteservice/onsite_backend/api/checksession';
    
    const response = await axios.post(apiUrl);
    // ... session handling
  }
}
```

**สิ่งที่ต้องแก้ตอน Production:**
- ⚠️ ถ้า backend อยู่ที่ domain อื่น ต้องแก้ URL

---

### 4. **src/router/index.js** - Navigation Guards
```javascript
router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem('userData');
  
  if (!userData) {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/intranet/login/logoutCheckSession';
      return;
    }
  }
  
  next();
});
```

**สิ่งที่ต้องแก้ตอน Production:**
- ⚠️ ถ้า intranet อยู่ที่ path อื่น ต้องแก้ redirect URL

---

### 5. **Environment Files**

#### `.env.development`
```env
VUE_APP_BASE_URL=/
VUE_APP_API_BASE_URL=/intsys/onsiteservice/onsite_backend/api
VUE_APP_BACKEND_PORT=80
NODE_ENV=development
```

#### `.env.production`
```env
VUE_APP_BASE_URL=/intsys/onsiteservice/
VUE_APP_API_BASE_URL=/intsys/onsiteservice/onsite_backend/api
NODE_ENV=production
```

**สิ่งที่ต้องแก้ตอน Production:**
- ⚠️ แก้ `VUE_APP_BASE_URL` ให้ตรงกับ path บน server
- ⚠️ แก้ `VUE_APP_API_BASE_URL` ให้ตรงกับ backend path

---

## 🚀 Quick Start Guide

### Development Mode
```bash
# 1. เปิด MAMP/XAMPP (port 80)
# 2. รัน Vue dev server
cd d:\vue\onsiteservice
npm run serve

# 3. เปิดเบราเซอร์
http://localhost:8081
```

### Production Build
```bash
# 1. ตรวจสอบ .env.production
# 2. Build
npm run build

# 3. Deploy ไฟล์จาก dist/ ไปยัง
d:\MAMP\htdocs\intsys\onsiteservice\
```

---

## 📋 Checklist สำหรับ Deploy Production

### ก่อน Build
- [ ] แก้ไข `.env.production` ให้ถูกต้อง
- [ ] ตรวจสอบ `publicPath` ใน `vue.config.js`
- [ ] ตรวจสอบ `baseUrl()` ใน `main.js`
- [ ] ตรวจสอบ redirect URL ใน `router/index.js`

### หลัง Build
- [ ] ตรวจสอบไฟล์ใน `dist/` ครบถ้วน
- [ ] สร้างไฟล์ `.htaccess` (ดูตัวอย่างใน DEPLOYMENT.md)
- [ ] Copy ไฟล์ไปยัง server
- [ ] Set permissions ให้ถูกต้อง (755 for folders, 644 for files)

### Testing
- [ ] เปิดเบราเซอร์ทดสอบ
- [ ] ตรวจสอบ Console ไม่มี error
- [ ] ทดสอบ login
- [ ] ทดสอบ logout
- [ ] ทดสอบ session sharing กับ intranet
- [ ] ทดสอบทุก features หลัก

---

## ⚙️ การแก้ไขค่า Configuration สำหรับ Production

### สถานการณ์ที่ 1: Deploy ที่ path เดิม `/intsys/onsiteservice/`
✅ **ไม่ต้องแก้อะไร** - ใช้ค่า default

### สถานการณ์ที่ 2: Deploy ที่ path อื่น เช่น `/app/onsite/`

**แก้ไข `.env.production`:**
```env
VUE_APP_BASE_URL=/app/onsite/
VUE_APP_API_BASE_URL=/app/onsite/backend/api
```

**แก้ไข `vue.config.js`:**
```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/app/onsite/' : '/'
```

**แก้ไข `main.js` → `baseUrl()`:**
```javascript
case 'production': return '/app/onsite/'
```

### สถานการณ์ที่ 3: Backend อยู่ที่ server อื่น

**แก้ไข `store/index.js`:**
```javascript
const apiUrl = process.env.NODE_ENV === 'development'
  ? '/intsys/onsiteservice/onsite_backend/api/checksession'
  : 'https://api.example.com/onsiteservice/api/checksession'; // แก้เป็น URL จริง
```

**แก้ไขทุกไฟล์ที่เรียก API** - ใช้ full URL แทน relative path

### สถานการณ์ที่ 4: ใช้ HTTPS

✅ **ไม่ต้องแก้ code** - `getUrl()` รองรับแล้ว (ใช้ `window.location.protocol`)

แค่ตรวจสอบว่า:
- SSL certificate ติดตั้งถูกต้อง
- `.htaccess` force HTTPS (ถ้าต้องการ)

---

## 🔍 ตำแหน่งไฟล์ที่ต้องแก้

หากต้องการเปลี่ยน Configuration สำหรับ Production:

| ไฟล์ | บรรทัด | สิ่งที่ต้องแก้ |
|------|--------|----------------|
| `.env.production` | ทั้งหมด | Base URLs |
| `vue.config.js` | 2 | publicPath |
| `src/main.js` | 31 | baseUrl() - case 'production' |
| `src/router/index.js` | 60 | Redirect URL to intranet |
| `src/store/index.js` | 27-29 | API URL for checksession |

---

## 📝 สรุป Port Numbers

| Environment | Vue App | Backend | Database |
|-------------|---------|---------|----------|
| Development | 8081 | 8080 | 3306 |
| Production | 80/443 | 80/443 | 3306 |

---

## 🔐 Security Checklist

### Development
- [x] Proxy configuration ปลอดภัย (localhost only)
- [x] Session sharing ทำงานถูกต้อง
- [x] CORS ไม่เป็นปัญหา (ใช้ proxy)

### Production
- [ ] ใช้ HTTPS
- [ ] CSRF protection เปิดใช้งาน
- [ ] Session timeout ตั้งค่าเหมาะสม
- [ ] Database credentials ปลอดภัย
- [ ] ไฟล์ sensitive ไม่ถูก commit (.env.local)

---

## 📞 หากพบปัญหา

1. ดู **DEPLOYMENT.md** → Troubleshooting section
2. ตรวจสอบ Browser Console (F12)
3. ตรวจสอบ Network tab
4. ตรวจสอบ Backend logs
5. ติดต่อ IT Department

---

**อัพเดตล่าสุด:** April 6, 2026  
**โดย:** Development Team
