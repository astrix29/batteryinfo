// Variables Start
const progressBar = document.getElementById('progressBar')
let batteryLevel, isChargin
const unsupported = document.querySelector('.unsupported')
const supported = document.querySelector('.supported')
let chargingText = document.getElementById('chargingText')
let toggleIcon = document.querySelector('.toggle-icon')
toggleIcon.addEventListener('click', toggleTheme)
// Variable ends

// Functions Start
function toggleTheme() {
	document.body.classList.toggle("white-bg")
}

let oldClassName; // undefined
function changeBatteryColor(level) {
	let className
	if (level >= 75 && level <= 100) className = 'bg-success' // Green
	else if (level >= 50 && level <= 75) className = 'bg-info' // Blue
	else if (level >= 25 && level <= 50) className = 'bg-warning' // Green
	else if (level >= 0 && level <= 25) className = 'bg-danger' // Red
	oldClassName = className 
	return className
}

function changeChargingAnimation(isCharging) {
	if (isCharging) {
		progressBar.classList.add('progress-bar-animated')
		chargingText.classList.remove('d-none')
	} else {
		progressBar.classList.remove('progress-bar-animated')
		chargingText.classList.add('d-none')
	} 


}

function changeLevel(battery) {
	batteryLevel = `${battery.level * 100}%`
	progressBar.setAttribute("aria-valuenow", batteryLevel)
	progressBar.style.width = batteryLevel
	progressBar.textContent = batteryLevel
	if (oldClassName) progressBar.classList.remove(oldClassName)
	changeChargingAnimation(battery.charging)
	progressBar.classList.add(changeBatteryColor(battery.level * 100))
}
// Functions end

// get data of battery
async function showBattery() {
	const battery = await navigator.getBattery()
	// console.log(navigator)
	// console.log(battery)
	isCharging = battery.charging 
	changeLevel(battery)
}

if ('getBattery' in navigator) {
	// Update the battery life every second
	setInterval(showBattery, 1000)
} else {
	unsupported.styel.display = 'block'
	supported.style.display = none 
}

