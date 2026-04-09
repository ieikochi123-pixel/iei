const conventionTracks = [
    { title: "Social Inclusion & Equity", icon: "🤝", desc: "AI & IoT for bridging socio-economic divides[cite: 136, 173]." },
    { title: "Assistive Technologies", icon: "♿", desc: "Intelligent systems for disability independence[cite: 138, 175]." },
    { title: "Smart Wearables", icon: "⌚", desc: "IoT-enabled mobility and health monitoring[cite: 140, 177]." },
    { title: "AI Healthcare & Rehab", icon: "🏥", desc: "Telemedicine for underserved communities[cite: 142, 179]." },
    { title: "Inclusive Infrastructure", icon: "🏘️", desc: "Safe smart homes and public spaces[cite: 144, 181]." },
    { title: "Human-Centric AI", icon: "👤", desc: "Universal design ensuring user inclusiveness[cite: 146, 183]." },
    { title: "Advanced Communication", icon: "📡", desc: "SDR and Laser networks for resilient connectivity[cite: 149, 185]." },
    { title: "Autonomous Public Safety", icon: "🤖", desc: "Robotics for rescue and safety enhancement[cite: 151, 187]." },
    { title: "Underwater Navigation", icon: "🌊", desc: "AI-enabled systems for maritime and coastal safety[cite: 154, 189]." },
    { title: "Naval & Aerospace Security", icon: "🚀", desc: "Intelligent systems for surveillance and UAVs[cite: 156, 191]." }
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