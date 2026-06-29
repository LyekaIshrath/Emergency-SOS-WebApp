
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let countdown = 5;
let timer;
let mode = "whatsapp";

/* ================= SAVE CONTACT ================= */
function saveContact() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!name || !phone) return;

    contacts.push({ name, phone });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    renderContacts();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

/* ================= RENDER ================= */
function renderContacts() {
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    contacts.forEach(c => {
        list.innerHTML += `
        <div style="background:#f3f3f3;margin-top:10px;padding:10px;border-radius:10px;">
            <b>${c.name}</b><br>
            ${c.phone}
        </div>`;
    });
}
renderContacts();

/* ================= SOS ================= */
function triggerSOS(selectedMode) {

    mode = selectedMode;

    document.getElementById("countdownBox").style.display = "block";
    document.getElementById("timer").innerText = countdown;

    timer = setInterval(() => {

        countdown--;
        document.getElementById("timer").innerText = countdown;

        if (countdown === 0) {
            clearInterval(timer);
            countdown = 5;
            document.getElementById("countdownBox").style.display = "none";

            sendSOS();
        }

    }, 1000);
}

/* ================= CANCEL ================= */
function cancelSOS() {
    clearInterval(timer);
    countdown = 5;
    document.getElementById("countdownBox").style.display = "none";
}

/* ================= SEND SOS ================= */
function sendSOS() {

    navigator.geolocation.getCurrentPosition(pos => {

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const location = `https://maps.google.com/?q=${lat},${lon}`;

        const message =
            `🚨 EMERGENCY SOS!\nHelp Needed!\nLocation: ${location}`;

        if (mode === "whatsapp") {
            sendWhatsApp(message);
        } else {
            sendSMS(message);
        }

    });
}

/* ================= WHATSAPP ================= */
function sendWhatsApp(message) {

    contacts.forEach(c => {
        const url = `https://wa.me/${c.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });
}

/* ================= SMS ================= */
function sendSMS(message) {

    contacts.forEach(c => {
        window.location.href = `sms:${c.phone}?body=${encodeURIComponent(message)}`;
    });
}

/* ================= INSTALL BUTTON ================= */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
    deferredPrompt.prompt();
    deferredPrompt = null;
    installBtn.style.display = "none";
});