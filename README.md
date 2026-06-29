🚨 Emergency SOS Web App

A lightweight, browser-based Emergency SOS system that allows users to instantly send their live location to saved emergency contacts via WhatsApp or SMS. Built using HTML, CSS, and JavaScript, this project focuses on real-world safety use cases with a clean UI and fast response system.

----

🔥 Key Highlights

📍 Real-time GPS location tracking (Geolocation API)
⏳ SOS countdown timer with cancel option
📳 Device vibration alert during emergency trigger
💬 WhatsApp SOS message generation
📩 SMS fallback support (mobile devices)
👥 Add / Edit / Delete emergency contacts
💾 Persistent storage using LocalStorage
📱 Fully responsive mobile-first UI
🎨 Modern emergency-themed interface

----

🧠 How It Works

User saves emergency contacts in the app
Data is stored locally in the browser
On pressing SOS Button:
A 5-second countdown begins
User can cancel before sending
Device vibrates for alert feedback
After countdown:
    Live GPS location is fetched
    Google Maps link is generated
    SOS message is created automatically
    Message is sent via:
            WhatsApp (primary)
            SMS (fallback option)

----

🛠️ Tech Stack

Technology	        Purpose
HTML5	            Structure
CSS3	            UI Design & Responsiveness
JavaScript	        Application Logic
Geolocation API	    Live location tracking
Vibration API	    Emergency alert feedback
LocalStorage API	Data persistence

----

📁 Project Structure

emergency-sos-app/
│
├── index.html      # Main UI layout
├── style.css       # Styling and responsive design
├── script.js       # SOS logic and functionality
└── README.md       # Project documentation

----

🚀 Live Demo

After deployment via GitHub Pages:

👉 Replace with your link:

https://your-username.github.io/emergency-sos-app/

⚙️ Installation & Setup

1️⃣ Clone repository

git clone https://github.com/your-username/emergency-sos-app.git

2️⃣ Open project folder

cd emergency-sos-app

3️⃣ Run project

Open index.html in browser
OR
Use VS Code → Live Server extension

----

🔐 Permissions Required

To function properly, the app may request:

    📍 Location access (required for SOS feature)
    📳 Vibration access (supported devices)
    📱 SMS/WhatsApp access (mobile devices)

----

📌 Use Cases

    Personal emergency safety tool
    Student mini-project (Web APIs demo)
    Portfolio project for web development
    Prototype for real-time safety apps

----

🚀 Future Improvements

    🔥 Firebase authentication system
    📡 Live tracking dashboard (real-time updates)
    🚨 Multi-contact broadcast system
    🗺️ Interactive Google Maps UI
    📲 Android APK conversion (WebView / Flutter)

----

👨‍💻 Developer Notes

This project demonstrates practical use of browser APIs for real-world emergency response systems. It focuses on simplicity, speed, and usability in critical situations.

----


⚠️ Disclaimer

This project is built for educational and demonstration purposes only. It should not replace official emergency services or govsernment alert systems.

----
