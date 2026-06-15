// Timezone configurations for the widget
const timezoneMappings = [
    { id: 'ny', timezone: 'America/New_York', elementId: 'ny-mini' },
    { id: 'london', timezone: 'Europe/London', elementId: 'london-mini' },
    { id: 'tokyo', timezone: 'Asia/Tokyo', elementId: 'tokyo-mini' },
    { id: 'sydney', timezone: 'Australia/Sydney', elementId: 'sydney-mini' }
];

/**
 * Format time with leading zeros
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatTime(num) {
    return String(num).padStart(2, '0');
}

/**
 * Get current time in specific timezone
 * @param {string} timezone - IANA timezone string
 * @returns {string} - Formatted time string (HH:MM)
 */
function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(now);
        let hours = '00';
        let minutes = '00';
        
        parts.forEach(part => {
            if (part.type === 'hour') hours = part.value;
            if (part.type === 'minute') minutes = part.value;
        });
        
        return `${hours}:${minutes}`;
    } catch (error) {
        console.error(`Error getting time for timezone ${timezone}:`, error);
        return '--:--';
    }
}

/**
 * Update all mini clock displays
 */
function updateMiniClocks() {
    timezoneMappings.forEach(mapping => {
        const timeString = getTimeInTimezone(mapping.timezone);
        const element = document.getElementById(mapping.elementId);
        
        if (element) {
            element.textContent = timeString;
        }
    });
}

// Initialize clocks immediately
updateMiniClocks();

// Update clocks every second
setInterval(updateMiniClocks, 1000);

console.log('World Clock Widget initialized');
