const conventionTracks = [
    { title: "Social Inclusion & Equity", icon: "🤝", desc: "" },
    { title: "Assistive Technologies", icon: "♿", desc: "" },
    { title: "Smart Wearables", icon: "⌚", desc: "" },
    { title: "AI Healthcare & Rehab", icon: "🏥", desc: "" },
    { title: "Inclusive Infrastructure", icon: "🏘️", desc: "" },
    { title: "Human-Centric AI", icon: "👤", desc: "" },
    { title: "Advanced Communication", icon: "📡", desc: "" },
    { title: "Autonomous Public Safety", icon: "🤖", desc: "" },
    { title: "Underwater Navigation", icon: "🌊", desc: "" },
    { title: "Naval & Aerospace Security", icon: "🚀", desc: "" }
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
