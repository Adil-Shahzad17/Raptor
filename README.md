# Raptor 📸

Modern photo like platform Unsplash and Pexels, powered by the Pexels API for high-quality photos, Appwrite's backend service to handle authentication, and Email.js for sending emails directly from the app. Perfect for creators, designers, and developers who need free, high-quality photos.

## 🚀 Features

- **Image Search & Discovery**  
  Explore millions of high-resolution images using simple search functionality.

- **Free Downloads**  
  Download any image in orignal sizes for personal or commercial use (following Pexels' license terms).

- **User Authentication** 🔒  
  Secure signup/login system using Appwrite's authentication service (Email/Password).

- **Contact Form** 📧  
  User-friendly contact form with direct email delivery via Email.js integration.

- **Responsive Design** 📱  
  Fully responsive layout optimized for desktop, tablet, and mobile devices.

---

## **Getting Started** 🛠️

### Prerequisites

- Pexels API
- Appwrite account (free tier sufficient)

## ⚙️ Installation

**1**. **Clone the repository**

```bash
git clone https://github.com/Adil-Shahzad17/Raptor.git

cd Raptor
```

**2**. **Install dependencies:** 📥

```bash
npm install
```

Visit the **_package.json_** file to view other dependencies used in this project.

**3**. **Appwrite Setup:** 🧰

- Create a new Appwrite project.
- Set up Authentication.
- Enable Email/Password.

**4**. **Integrate Pexels API:** 🌐

- Get API key from **[Pixels](https://www.pexels.com/api/)**.

**5**. **Email.js Configuration:** 📩

- Register at Email.js.
- Create email service and template.

**6**. **Configure Environment Variables:** </>

Create a .env file in the root directory:

```
VITE_PEXELS_API_KEY = "API_KEY"
VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID = project_id
VITE_EMAILJS_SERVICE_ID = service_id
VITE_EMAIL_JS_TEMPLATE_ID = template_id
VITE_EMAIL_JS_PUBLIC_KEY = public_key
```

**7**. **Run the development server:** ⚡

After installing all the dependencies successfully and configuring them, it's time to _run_ the project.

```bash
npm run dev
```

---

### 🤝 **Contributing:**

Contributions are **welcome!**
Please follow these steps:

- Fork the project.
- Create your feature branch `git checkout -b feature/AmazingFeature`
- Commit your changes `git commit -m "Add some AmazingFeature"`
- Push to the branch `git push origin feature/AmazingFeature`
- Open a Pull Request.

Please follow the **code of conduct**.

---

### 🙏 **Acknowledgements**

- React community for excellent documentation and support.
- Pexels for their amazing image API.
- Appwrite for powerful backend services.
- Email.js for seamless email integration.

---
