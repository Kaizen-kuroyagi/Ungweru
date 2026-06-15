// Timezone configurations
const timezones = [
    { id: 'ny', name: 'New York', timezone: 'America/New_York', timeId: 'ny-time', dateId: 'ny-date' },
    { id: 'london', name: 'London', timezone: 'Europe/London', timeId: 'london-time', dateId: 'london-date' },
    { id: 'tokyo', name: 'Tokyo', timezone: 'Asia/Tokyo', timeId: 'tokyo-time', dateId: 'tokyo-date' },
    { id: 'sydney', name: 'Sydney', timezone: 'Australia/Sydney', timeId: 'sydney-time', dateId: 'sydney-date' },
    { id: 'dubai', name: 'Dubai', timezone: 'Asia/Dubai', timeId: 'dubai-time', dateId: 'dubai-date' },
    { id: 'la', name: 'Los Angeles', timezone: 'America/Los_Angeles', timeId: 'la-time', dateId: 'la-date' }
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
 * @returns {object} - Object containing hours, minutes, seconds, and formatted date
 */
function getTimeInTimezone(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false
        });
        
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false
        }).formatToParts(new Date());
        
        const values = {};
        parts.forEach(part => {
            values[part.type] = part.value;
        });
        
        return {
            hours: values.hour,
            minutes: values.minute,
            seconds: values.second,
            date: `${values.month}/${values.day}/${values.year}`
        };
    } catch (error) {
        console.error(`Error getting time for timezone ${timezone}:`, error);
        return {
            hours: '--',
            minutes: '--',
            seconds: '--',
            date: '--/--/----'
        };
    }
}

/**
 * Update all clock displays
 */
function updateClocks() {
    timezones.forEach(tz => {
        const timeData = getTimeInTimezone(tz.timezone);
        const timeString = `${timeData.hours}:${timeData.minutes}:${timeData.seconds}`;
        const dateString = timeData.date;
        
        const timeElement = document.getElementById(tz.timeId);
        const dateElement = document.getElementById(tz.dateId);
        
        if (timeElement && dateElement) {
            timeElement.textContent = timeString;
            dateElement.textContent = dateString;
            
            // Add pulse animation
            timeElement.classList.remove('updated');
            // Trigger reflow to restart animation
            void timeElement.offsetWidth;
            timeElement.classList.add('updated');
        }
    });
    
    // Update last updated time
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const now = new Date();
        const hours = formatTime(now.getHours());
        const minutes = formatTime(now.getMinutes());
        const seconds = formatTime(now.getSeconds());
        lastUpdateElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Initialize clocks immediately
updateClocks();

// Update clocks every second
setInterval(updateClocks, 1000);

// Log initialization
console.log('Digital Clock initialized with', timezones.length, 'timezones');