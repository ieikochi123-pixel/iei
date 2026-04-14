const conventionTracks = [
    { title: "Social Inclusion & Equity", icon: "🤝", desc: "AI & IoT for bridging socio-economic divides" },
    { title: "Assistive Technologies", icon: "♿", desc: "Intelligent systems for disability independence" },
    { title: "Smart Wearables", icon: "⌚", desc: "IoT-enabled mobility and health monitoring" },
    { title: "AI Healthcare & Rehab", icon: "🏥", desc: "Telemedicine for underserved communities" },
    { title: "Inclusive Infrastructure", icon: "🏘️", desc: "Safe smart homes and public spaces" },
    { title: "Human-Centric AI", icon: "👤", desc: "Universal design ensuring user inclusiveness[cite" },
    { title: "Advanced Communication", icon: "📡", desc: "SDR and Laser networks for resilient connectivity" },
    { title: "Autonomous Public Safety", icon: "🤖", desc: "Robotics for rescue and safety enhancement" },
    { title: "Underwater Navigation", icon: "🌊", desc: "AI-enabled systems for maritime and coastal safety" },
    { title: "Naval & Aerospace Security", icon: "🚀", desc: "Intelligent systems for surveillance and UAVs" }
];

function initPortal() {
    const container = document.getElementById('tracks-container');
    container.innerHTML = conventionTracks.map(t => `
        <div class="track-card">
            <div style="font-size: 3.5rem; margin-bottom: 20px;">${t.icon}</div>
            <h3 style="font-family: Montserrat;">${t.title}</h3>
            <p>${t.desc}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', initPortal);
