// Load contacts natively on initialize setup
window.onload = function () {
    displayContacts();
};

let countdownInterval;

// -------------------- SAVE CONTACT --------------------
function saveContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        alert("Please enter a valid name and phone number");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, phone });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    let savedStatus = document.getElementById("saved");
    savedStatus.innerText = "Contact Saved Successfully!";
    setTimeout(() => { savedStatus.innerText = ""; }, 3000);

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";

    displayContacts();
}

// -------------------- DISPLAY CONTACTS --------------------
function displayContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let list = document.getElementById("contactList");

    list.innerHTML = "";

    if(contacts.length === 0) {
        list.innerHTML = `<p style="color:#9ca3af; font-size:13px; font-style:italic; margin:15px 0;">No contacts added yet.</p>`;
        return;
    }

    contacts.forEach((c, index) => {
        list.innerHTML += `
            <div class="contact-item">
                <div class="contact-avatar"><i class="fa-solid fa-user"></i></div>
                <div class="contact-details">
                    <p class="c-name">${c.name}</p>
                    <p class="c-phone">${c.phone}</p>
                </div>
                <div class="contact-actions">
                    <button class="btn-edit" onclick="editContact(${index})"><i class="fa-solid fa-pen"></i> Edit</button>
                    <button class="btn-delete" onclick="deleteContact(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
    });
}

// -------------------- DELETE CONTACT --------------------
function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}

// -------------------- EDIT CONTACT --------------------
function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let c = contacts[index];

    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;

    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts();
}

// -------------------- SOS BUTTON (COUNTDOWN) --------------------
function getLocation() {
    let seconds = 5;

    document.getElementById("output").innerHTML = `
        <div class="sos-countdown-container">
            <h3>⚠️ SOS WILL BE SENT IN <span id="timer" style="font-size:18px; font-weight:800;">${seconds}</span> SECONDS</h3>
            <button onclick="cancelSOS()" class="btn-save" style="background:#4b5563;">Cancel SOS</button>
        </div>
    `;

    countdownInterval = setInterval(() => {
        seconds--;

        let timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerText = seconds;
        }

        if (seconds <= 0) {
            clearInterval(countdownInterval);
            triggerSOS();
        }
    }, 1000);
}

// -------------------- CANCEL SOS --------------------
function cancelSOS() {
    clearInterval(countdownInterval);
    document.getElementById("output").innerHTML = "<span style='color:#16a34a; font-weight:700;'>✅ SOS CANCELLED</span>";
    setTimeout(() => {
        document.getElementById("output").innerText = "Press SOS button in emergency.";
    }, 3000);
}

// -------------------- TRIGGER SOS --------------------
function triggerSOS() {
    // 📳 Vibration Alert sequence
    if (navigator.vibrate) {
        navigator.vibrate([500, 300, 500, 300, 1000]);
    }

    // 📍 Geolocation Check
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendAlert, (error) => {
            alert("Error obtaining location. Sending SOS with fallback parameters.");
            sendAlert(null);
        });
    } else {
        alert("Geolocation not supported on this framework. Sending fallback alert.");
        sendAlert(null);
    }
}

// -------------------- SEND ALERT --------------------
function sendAlert(position) {
    let lat = position ? position.coords.latitude : "0";
    let lon = position ? position.coords.longitude : "0";

    // Fixed functional URI string map syntax error from base code
    let locationLink = `https://maps.google.com/?q=${lat},${lon}`;

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let phone = contacts.length > 0 ? contacts[0].phone : "";

    let message = encodeURIComponent(
        "🚨 EMERGENCY ALERT 🚨\n\n" +
        "I need help immediately!\n\n" +
        "📍 My Location:\n" +
        locationLink
    );

    let whatsappURL = `https://wa.me/${phone}?text=${message}`;
    let smsURL = `sms:${phone}?body=${message}`;

    document.getElementById("output").innerHTML = `
        <div style="padding:5px;">
            <h3 style="color:#dc2626; margin: 0 0 10px 0;">🚨 SOS CHANNELS INITIALIZED</h3>
            <div class="sos-links-container">
                <a href="${locationLink}" class="sos-link loc" target="_blank"><i class="fa-solid fa-location-dot"></i> View Coordinates</a>
                <a href="${whatsappURL}" class="sos-link wa" target="_blank"><i class="fa-brands fa-whatsapp"></i> Dispatch WhatsApp SOS</a>
                <a href="${smsURL}" class="sos-link sms"><i class="fa-solid fa-comment-sms"></i> Dispatch Native SMS</a>
            </div>
        </div>
    `;
}