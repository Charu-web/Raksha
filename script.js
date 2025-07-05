function saveContact() {
  const contact = document.getElementById("contactInput").value.trim();
  if (contact) {
    localStorage.setItem("emergencyContact", contact);
    document.getElementById("contactStatus").textContent = "✅ Contact saved!";
  } else {
    document.getElementById("contactStatus").textContent = "❌ Please enter a phone number.";
  }
}

// Handle SOS button click
document.getElementById("sosBtn").addEventListener("click", function () {
    localStorage.setItem("emergencyContact",contact)
  const savedContact = localStorage.getItem("emergencyContact");
  if (!savedContact) {
    alert("⚠ No emergency contact saved. Please add one first.");
    return;
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  document.getElementById("status").textContent = "📍 Fetching location...";

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const googleMapLink = https://maps.google.com/?q=${lat},${lon};

    // Show link on page
    document.getElementById("status").innerHTML = `
      ✅ Location fetched! <br>
      <a href="sms:${savedContact}?body=I am in danger. Here's my location: ${googleMapLink}" target="_blank">
        📩 Click here to send SOS SMS
      </a>
    `;

    // Optional browser notification
    showNotification("SOS Alert", Location ready. Click link to send SMS.);

  }, () => {
    document.getElementById("status").textContent = "❌ Unable to get your location.";
  });
});

// Browser notification
function showNotification(title, body) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}
document.getElementById("sosBtn").addEventListener("click", function() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    document.getElementById("status").textContent = "Fetching location...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const googleMapLink = https://maps.google.com/?q=${lat},${lon};
            const emergencyContact = localStorage.getItem("emergencyContact") || "911234567890";

            // Show SOS SMS link
            document.getElementById("status").innerHTML = `
                ✅ Location fetched! <br>
                <a href="sms:${emergencyContact}?body=I am in danger. Here is my location: ${googleMapLink}" target="_blank">
                    📍 Click here to send SoS
                </a>
            `;

            // Show live Google Map iframe
            document.getElementById("map").innerHTML = `
    <iframe
      width="100%"
      height="250"
      style="border:0; border-radius: 15px; margin-top:15px;"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lon}&zoom=16&maptype=roadmap">
    </iframe>
`;
          
            `;

            showNotification("🚨 SOS Alert", "Tap to open your emergency SMS.");
        },
        () => {
            document.getElementById("status").textContent = "❌ Unable to get your location.";
        }
    );
});
