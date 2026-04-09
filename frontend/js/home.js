// Function to render events on the homepage
async function displayEvents() {
    // 1. Fetch events from Arjun's API
    const response = await fetch('http://localhost:5000/api/events');
    const events = await response.json();
    
    const eventContainer = document.getElementById('event-list');

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        // 2. Logic: If it's a convention, point to the futuristic folder
        const linkPath = event.is_convention ? 'convention/index.html' : `event-details.html?id=${event.id}`;
        
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.venue}</p>
            <a href="${linkPath}" class="${event.is_convention ? 'btn-neon-trigger' : 'btn-normal'}">
                ${event.is_convention ? 'ENTER PORTAL' : 'View Details'}
            </a>
        `;
        
        eventContainer.appendChild(eventCard);
    });
}