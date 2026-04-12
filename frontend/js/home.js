/**
 * IE(I) KOCHI - HOME PAGE DATABASE ENGINE
 * Purpose: Syncs the Home Page UI with Supabase via the Node.js Backend.
 * Version: Phase 3 Dynamic (Final Schema Alignment)
 */

async function fetchHomeContent() {
    const noticeList = document.getElementById('notices-list');
    const committeeGrid = document.getElementById('committee-grid');
    const galleryGrid = document.getElementById('gallery-grid');
    const eventWrapper = document.getElementById('dynamic-events');

    try {
        const response = await fetch('/api/home-content');
        
        if (!response.ok) throw new Error("Backend connection failed");
        
        const data = await response.json();

        // 1. Render Notices (Mapped to: title and file_url)
        if (noticeList) {
            noticeList.innerHTML = data.notices && data.notices.length > 0 
                ? data.notices.map(n => `
                    <div class="notice-item" style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">
                        <p>▹ ${n.title} <small style="color:var(--gold); margin-left: 10px;">${n.file_url || ''}</small></p>
                    </div>
                `).join('')
                : '<p>No current notices.</p>';
        }

        // 2. Render Committee Grid (Mapped to: name, designation, photo_url)
        if (committeeGrid) {
            committeeGrid.innerHTML = data.committee && data.committee.length > 0
                ? data.committee.map(m => `
                    <div class="glass-card" style="text-align: center;">
                        <img src="${m.photo_url || 'assets/images/logo.png'}" 
                             style="width: 110px; height: 110px; border-radius: 50%; border: 3px solid var(--electric); margin-bottom: 15px; object-fit: cover;"
                             onerror="this.src='assets/images/logo.png'">
                        <h3 style="font-family: Montserrat; margin-bottom: 5px;">${m.name}</h3>
                        <p style="color: var(--electric); font-weight: bold; margin: 0;">${m.designation}</p>
                    </div>
                `).join('')
                : '<p>Updating committee details...</p>';
        }

        // 3. Render Gallery Grid (Mapped to: image_url)
        if (galleryGrid) {
            galleryGrid.innerHTML = data.gallery && data.gallery.length > 0
                ? data.gallery.map(img => `
                    <div class="gallery-item">
                        <img src="${img.image_url}" alt="IEI Activity" onerror="this.src='assets/images/logo.png'">
                    </div>
                `).join('')
                : '<p>Gallery photos coming soon.</p>';
        }

        // 4. Render Dynamic Events (Mapped to: title, venue)
        if (eventWrapper) {
            eventWrapper.innerHTML = data.events && data.events.length > 0
                ? data.events.map(e => `
                    <div class="glass-card event-card" style="margin-top: 15px;">
                        <h3 style="color: var(--electric);">${e.title}</h3>
                        <p>${e.venue || ''}</p>
                    </div>
                `).join('')
                : '';
        }

    } catch (error) {
        console.error("Critical Sync Error:", error);
        if (noticeList) noticeList.innerHTML = '<p style="color:red;">Error connecting to database. Please refresh.</p>';
    }
}

function handleNavScroll() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const element = document.getElementById(targetId);
                if (element) {
                    window.scrollTo({
                        top: element.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchHomeContent();
    handleNavScroll();
});