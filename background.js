// Returns current tab id
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab.id;
} 

// Listenst to message from content-script.js and injects the custom CSS accordingly
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
	if(request.toggle === "on"){
		await chrome.scripting.insertCSS({
			files: ["style.css"],
			target: { tabId: await getCurrentTab() },
		}); 
	}
	if(request.toggle === "off"){
		await chrome.scripting.removeCSS({
			files: ["style.css"],
			target: { tabId: await getCurrentTab() },
		});
	}
})
