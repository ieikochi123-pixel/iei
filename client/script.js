// 1. THE ADDRESS: Point this to Arjun's local server (Port 5000)
const API_URL = "http://localhost:5000/api";

async function fetchMembers() {
    const grid = document.getElementById('member-grid');
    
    // Safety check: only run if the 'member-grid' exists on this HTML page
    if (!grid) return; 

    try {
        // 2. THE CALL: Fetching data from Arjun's Node.js server
        const response = await fetch(`${API_URL}/members`);
        
        if (!response.ok) throw new Error("Server is not responding");

        const members = await response.json();

        // 3. THE UI: Generating the Navy & Gold cards dynamically
        grid.innerHTML = members.map(m => `
            <div class="member-card" style="border: 1px solid #003366; padding: 20px; border-radius: 10px; text-align: center; background: white;">
                <img src="${m.image_url || 'assets/default.png'}" 
                     style="width:120px; height:120px; border-radius:50%; object-fit: cover; border: 3px solid #FFD700;">
                <h3 style="color: #003366; margin-top:15px; font-family: 'Arial', sans-serif;">${m.full_name}</h3>
                <p style="font-weight:bold; color:#B8860B; margin-top:5px;">${m.role_title}</p>
            </div>
        `).join('');

    } catch (err) {
        console.error("Fetch Error:", err);
        grid.innerHTML = `
            <div style="text-align:center; color: red; padding: 20px;">
                <p>⚠️ Connection Failed: Make sure Arjun has run 'node index.js' in the terminal.</p>
            </div>
        `;
    }
}

// Initialize when the browser finishes loading the page
window.onload = () => {
    fetchMembers();
};