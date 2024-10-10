
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionsButtons = document.querySelectorAll(".adv-option-button");

let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.querySelector(".text-input-area");

let linkButton = document.querySelector("#link");
let unlinkButton = document.querySelector("#unlink");

let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");

let formatButtons = document.querySelectorAll(".format");

let scriptButtons = document.querySelectorAll(".script");


const fontFamilyList = [
	{ value: "Arial", css: "'Arial', sans-serif" },
	{ value: "Georgia", css: "'Georgia', serif" },
	{ value: "Calibri", css: "'Calibri', sans-serif" },
	{ value: "Comic Sans MS", css: "'Comic Sans MS', cursive" },
	{ value: "Times New Roman", css: "'Times New Roman', serif" },
	{ value: "Courier New", css: "'Courier New', monospace" },
	{ value: "New Amsterdam", css: "'New Amsterdam', sans-serif" },
	{ value: "Matemasie", css: "'Matemasie', sans-serif" },
	{ value: "Nerko One", css: "'Nerko One', cursive" },
];



// Initial Settings

const initializer = () => {
	// highlighter
	highlighter(alignButtons, true);
	highlighter(spacingButtons, true);
	highlighter(formatButtons, false);
	highlighter(scriptButtons, true);

	// options for font-families
	fontFamilyList.map((font) => {
		let option = document.createElement("option");

		option.value = font.value;
		option.style.fontFamily = font.css;
		option.textContent = font.value;
		fontName.appendChild(option);
	});

	// options for font-sizes
	for(let k = 1; k < 9; k++) {
		let option = document.createElement("option");

		option.value = k;
		option.innerHTML = k;
		fontSizeRef.appendChild(option)
	}

	fontSizeRef.value = 3;
};

// modify text
const modifyText = (command, defaultUI, value) => {
	document.execCommand(command, defaultUI, value)
}


// simple format
optionsButtons.forEach((button) => {
	button.addEventListener("click", () => {
		modifyText(button.id, false, null)
	})
})

//advanced format
advancedOptionsButtons.forEach((button) => {
	button.addEventListener("change", () => {
		modifyText(button.id, false, button.value)
	})
})


linkButton.addEventListener("click", () => {
	let userLink = prompt("Enter URL: ");

	if(/http/i.test(userLink)) {
		modifyText(linkButton.id, false, userLink)
	} else {
		userLink = "https://" + userLink;
		modifyText(linkButton.id, false, userLink)
	}
})





// Highlight functions == highlighter
const highlighter = (className, needsRemoval) => {
	className.forEach((button) => {
		button.addEventListener("click", () => {
			if (needsRemoval) {
				let alreadyActive = false;

				if (button.classList.contains("active")) {
					alreadyActive = true;
				}

				highlightRemover(className);

				if (!alreadyActive) {
					button.classList.add("active");
				}
			} else {
				button.classList.toggle("active");
			}
		});
	});
};

const highlightRemover = (className) => {
	className.forEach((button) => {
		button.classList.remove("active");
	});
};

window.onload = initializer;
