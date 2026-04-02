const API_URL = "https://your-render-app.onrender.com/api";

async function fetchMembers() {
    const grid = document.getElementById('member-grid');
    if (!grid) return; // Only runs on committee page

    try {
        const response = await fetch(`${API_URL}/members`);
        const members = await response.json();

        grid.innerHTML = members.map(m => `
            <div class="member-card">
                <img src="${m.image_url || 'assets/default.png'}" style="width:100px; height:100px; border-radius:50%;">
                <h3 style="color: #003366; margin-top:10px;">${m.full_name}</h3>
                <p style="font-weight:bold; color:#666;">${m.role_title}</p>
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = "<p>Error loading committee data.</p>";
    }
}

// Initialize based on current page
window.onload = () => {
    fetchMembers();
};