const toggle = document.getElementById("toggle");
const btn = document.getElementById("overlay");
const svg = document.getElementById("offButton");

// Returns current tab id
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab.id;
} 

// Checks local storage and sets the popup element states accordingly
(async () => {
	const result = await chrome.storage.local.get(["status"])
	if(result.status === undefined || result.status[0] === "0"){
		toggle.value = 0
		svg.setAttribute("stroke", "red");
		btn.style.boxShadow = "0px 0px 15px 2px red";

	}
	if(result.status[0] === "1"){
		toggle.value = 1
		svg.setAttribute("stroke", "green");
		btn.style.boxShadow = "0px 0px 15px 5px lime";

	}
})()

// Handles state change of input element and inserts styles accordingly
document.getElementById("overlay").addEventListener("click", async function(){
	if(toggle.value === "0"){
		toggle.value = "1"
		svg.setAttribute("stroke", "green");
		btn.style.boxShadow = "0px 0px 15px 5px lime";
  	}
    else if(toggle.value === "1"){
		toggle.value = "0"
		svg.setAttribute("stroke", "red");
		btn.style.boxShadow = "0px 0px 15px 2px red";
    }
	
	const tab = await getCurrentTab()
	chrome.storage.local.set({ "status": [toggle.value, tab] })
	
	if(toggle.value === "1"){
		await chrome.scripting.insertCSS({
			files: ["style.css"],
			target: { tabId: tab },
		}); 
	}
	if(toggle.value === "0"){
		await chrome.scripting.removeCSS({
			files: ["style.css"],
			target: { tabId: tab },
		});
	}
})
