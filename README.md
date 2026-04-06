# Onsite Service System

ระบบจัดการคำขอบริการและแจ้งซ่อมอุปกรณ์ IT ภายในองค์กร

## 🚀 Quick Start

### Development
```bash
# ติดตั้ง dependencies
npm install

# รัน development server (port 8081)
npm run serve
```

เปิดเบราเซอร์: **http://localhost:8081**

### Production Build
```bash
# Build สำหรับ production
npm run build

# ไฟล์จะอยู่ในโฟลเดอร์ dist/
```

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - คู่มือ deployment แบบละเอียด
- **[CONFIG.md](./CONFIG.md)** - สรุป configuration และวิธีแก้ไขสำหรับ production

## 🛠 Technology Stack

- **Frontend:** Vue.js 2.6
- **State Management:** Vuex
- **Router:** Vue Router
- **UI Framework:** Bootstrap 5
- **HTTP Client:** Axios
- **Charts:** Highcharts
- **Alerts:** SweetAlert2
- **Backend:** CodeIgniter 3 (PHP 8+)
- **Database:** MySQL

## 🔧 Configuration Files

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables
- `vue.config.js` - Webpack & proxy configuration

## 📦 Project Structure

```
onsiteservice/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, styles
│   ├── components/      # Vue components
│   ├── views/           # Page components
│   ├── router/          # Route configuration
│   ├── store/           # Vuex store
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── dist/                # Production build output
├── vue.config.js        # Vue CLI configuration
├── DEPLOYMENT.md        # Deployment guide
└── CONFIG.md            # Configuration summary
```

## 🔐 Authentication

ระบบใช้ **Single Sign-On (SSO)** ร่วมกับระบบ intranet:
- Dev mode: รองรับ local login
- Production: Share session กับ intranet

## 📝 Features

- ✅ แจ้งคำขอบริการ / ซ่อม
- ✅ ติดตามสถานะงาน
- ✅ จัดการข้อมูลอุปกรณ์
- ✅ รายงานสรุป & Dashboard
- ✅ ระบบแจ้งเตือนผ่าน Telegram
- ✅ Session sharing กับ intranet

## 🌐 API Endpoints

Backend API: `/intsys/onsiteservice/onsite_backend/api/`

### Authentication
- `POST /checklogin` - Local login
- `POST /checksession` - Check session from intranet
- `POST /logout` - Logout

### Data Management
- `POST /api_loadOnsiteList` - List requests
- `POST /api_getViewData` - Get request detail
- `POST /api_saveDataMain` - Create request
- `POST /api_saveEditDataMain` - Update request

ดู API documentation เพิ่มเติมใน DEPLOYMENT.md

## 🔍 Troubleshooting

หากพบปัญหา:
1. ตรวจสอบ Browser Console (F12)
2. ตรวจสอบ Network tab
3. ดู [DEPLOYMENT.md](./DEPLOYMENT.md) → Troubleshooting section

## 📞 Contact

- **IT Department**
- **Email:** it@saleecolour.com
- **DeptCode:** 1002

---

## Development Notes

### Proxy Configuration
Development mode ใช้ webpack dev server proxy:
- Vue App: `http://localhost:8081`
- Backend: `http://localhost:8080` (MAMP)
- Proxy forward: `/intsys/*` → `http://localhost:8080/intsys/*`

### Environment Modes
- **Development:** Proxy enabled, local/intranet session
- **Production:** Direct API calls, intranet session only

---

**Version:** 1.0.0  
**Last Updated:** April 6, 2026
