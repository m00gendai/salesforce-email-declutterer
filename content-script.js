// Returns current tab id
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab.id;
} 

// Checks the local storage for the on/off state and messages background.js accordingly
(async () => {
	const result = await chrome.storage.local.get(["status"])
	
	if(result.status === undefined || result.status[0] === "0"){
		const response = await chrome.runtime.sendMessage({toggle: "off"});
	}
	if(result.status[0] === "1"){
		const response = await chrome.runtime.sendMessage({toggle: "on"});
	}
})()
