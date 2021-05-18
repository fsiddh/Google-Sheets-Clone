let save = document.querySelector(".download");
let clear = document.querySelector(".new");
let open = document.querySelector(".open");
let input = document.querySelector(".inputButton");

save.addEventListener("click", function () {
	const data = JSON.stringify(sheetDB);
	// blob
	// excel -> npm xlsx hw
	const blob = new Blob([data], { type: "application/json" }); // converts data to file of this type
	const url = window.URL.createObjectURL(blob); // creates file to url

	let a = document.createElement("a");
	// download
	a.download = "file.json"; // downloads in this file
	a.href = url; // url contains data
	a.click();
});

// OPEN
/* <input type="file" class="open-file"> */
input.addEventListener("change", function () {
	let files = input.files;
	let reqFileObj = files[0];

	var fr = new FileReader();
	fr.readAsBinaryString(reqFileObj);
	// fr.readAsText(reqFileObj);

	fr.addEventListener("load", function () {
		let data = fr.result;
		// let newWorkDB = XLSX.read(data, { type: "binary" });

		let activeSheet = document.querySelector(".active-sheet");
		let sheetIdx = activeSheet.getAttribute("sheetidx") - 1;

		let openSheet = JSON.parse(data);
		workSheetDb[sheetIdx] = openSheet;
		setUI(openSheet);
	});

	// let excelData;
	// fr.addEventListener("load", function () {
	// 	// data;
	// 	// excel
	// 	excelData = fr.result;
	// 	let jsonData = JSON.parse(excelData);
	// 	console.log(jsonData);
	// });

	// let jsonData = JSON.parse(excelData);
	// console.log(jsonData);
	// Json parse
	// sheetdB-> current data
	// ui render
});

// NEW
// ui empty ->worksheetDB empty
clear.addEventListener("click", function (e) {
	// console.log(sheetDB);
	initUI();
	let newSheetDB = cleanSheetDB();
	let activeSheet = document.querySelector(".active-sheet");
	let sheetIdx = activeSheet.getAttribute("sheetidx") - 1;
	workSheetDb[sheetIdx]= newSheetDB;
	// console.log(sheetDB);
});

function cleanSheetDB() {
	let newSheetDB = []; // Stores data of all cells present in the sheet
	for (let i = 0; i < 100; i++) {
		let row = [];
		for (let j = 0; j < 26; j++) {
			let cell = {
				bold: false,
				italic: "noraml",
				underline: "none",
				fontFamily: "Arial",
				fontSize: "16",
				halign: "left",
				value: "",
				children: [],
				formula: "",
			};
			row.push(cell);
		}
		newSheetDB.push(row);
	}
	return newSheetDB;
}
