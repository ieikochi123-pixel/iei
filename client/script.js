// client/script.js
async function loadIEI() {
    const res = await fetch('https://your-render-app.onrender.com/api/members');
    const members = await res.json();
    
    const grid = document.getElementById('member-grid');
    grid.innerHTML = members.map(m => `
        <div class="card" style="background: #003366; border: 2px solid #FFCC00; color: white; padding: 20px;">
            <h3 style="color: #FFCC00;">${m.full_name}</h3>
            <p>${m.role_title}</p>
        </div>
    `).join('');
}
loadIEI();