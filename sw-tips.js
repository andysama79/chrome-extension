console.log("sw-tips.js");

// fetch tip and save in storage
const updateTip = async () => {
    const response = await fetch('https://extension-tips.glitch.me/tips.json');
    const tips = await response.json();
    const randomIdx = Math.floor(Math.random() * tips.length);
    return chrome.storage.local.set({ tip: tips[randomIdx] });
};

const ALARM_NAME = 'tip';

// check if alarm exists to avoid resetting timer
// alarm might be removed when the browser session restarts

async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);

    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1440
        });
    }
}

createAlarm();

// update tip once in a day
chrome.alarms.onAlarm.addListener(updateTip);