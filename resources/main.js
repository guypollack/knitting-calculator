function stitches(hLength, vLength, direction, totalRows, swatchStitches, swatchRows) {
    const totalStitchesToAdd = Math.round(hLength * swatchStitches);
    const rowsInSection = Math.round(vLength * swatchRows);
    const stitchAddingInterval = rowsInSection / totalStitchesToAdd;
    let stitchesArray = [];
    let i = 1;
    while (i * stitchAddingInterval <= rowsInSection) {
        if (Math.round(i * stitchAddingInterval) === 0) {
            stitchesArray.push(totalRows + 1);
        } else {
            stitchesArray.push(totalRows + Math.round(i * stitchAddingInterval));
        }
        i++;
    }
    if (direction === "d") {
        stitchesArray = stitchesArray.map(elem => elem * -1);
    }
    return [stitchesArray,rowsInSection];
}

function findNumberOfExistingRows(id,divisor) {
    const div = document.getElementById(id);
    return div.getElementsByTagName("input").length / divisor;
}

function createInputElement(type,id,_name,_class) {
    const element = document.createElement("input");
    element.setAttribute("type",type);
    element.setAttribute("id",id);
    element.setAttribute("name",_name);
    element.setAttribute("class",_class);
    return element
}

function addStyling(element) {
    let _class = element.classList;
    _class = String(_class);

    switch (_class) {
        case "col-left":
            element.setAttribute("style","margin-left:-3px");
            break;
        case "col-mid":
            element.setAttribute("style","margin-left:14.5px");
            break;
        case "i-col-right":
            element.setAttribute("style","margin-left:14.5px");
            break;
        case "d-col-right":
            element.setAttribute("style","margin-left:14.5px");
            break;
        default:
            window.alert("Style not applied");
            break;
    }
}

function addInputRow() {
    const newRowNumber = findNumberOfExistingRows("left-form-inputs",4) + 1;
    const leftFormDiv = document.getElementById("left-form-inputs");
    const rightFormDiv = document.getElementById("right-form-inputs");
    
    let newLeftInputRowLabelText = ""
    if (newRowNumber < 10) {
        newLeftInputRowLabelText = `${newRowNumber}. `
    } else {
        newLeftInputRowLabelText = `${newRowNumber}.`
    }
    let newRightInputRowLabelText = ""
    if (newRowNumber < 10) {
        newRightInputRowLabelText = `${newRowNumber}. `
    } else {
        newRightInputRowLabelText = `${newRowNumber}.`
    }

    const newLeftInputRowContainer = document.createElement("div");
    const newLeftInputRowLabelNode = document.createElement("label");
    const newLeftInputRowLabel = document.createTextNode(`${newLeftInputRowLabelText}`);
    const newRightInputRowContainer = document.createElement("div");
    const newRightInputRowLabelNode = document.createElement("label");
    const newRightInputRowLabel = document.createTextNode(`${newRightInputRowLabelText}`);

    const leftHorInputBox = createInputElement("text",`l-hchange-${newRowNumber}`,`l-hchange-${newRowNumber}`,"col-left");
    addStyling(leftHorInputBox);
    const leftVertInputBox = createInputElement("text",`l-vchange-${newRowNumber}`,`l-vchange-${newRowNumber}`,"col-mid");
    addStyling(leftVertInputBox);
    const leftIRadioButton = createInputElement("radio",`l-i-${newRowNumber}`,`l-i-d-${newRowNumber}`,"i-col-right");
    addStyling(leftIRadioButton);
    const leftDRadioButton = createInputElement("radio",`l-d-${newRowNumber}`,`l-i-d-${newRowNumber}`,"d-col-right");
    addStyling(leftDRadioButton);

    const rightHorInputBox = createInputElement("text",`r-hchange-${newRowNumber}`,`r-hchange-${newRowNumber}`,"col-left");
    addStyling(rightHorInputBox);
    const rightVertInputBox = createInputElement("text",`r-vchange-${newRowNumber}`,`r-vchange-${newRowNumber}`,"col-mid");
    addStyling(rightVertInputBox);
    const rightIRadioButton = createInputElement("radio",`r-i-${newRowNumber}`,`r-i-d-${newRowNumber}`,"i-col-right");
    addStyling(rightIRadioButton);
    const rightDRadioButton = createInputElement("radio",`r-d-${newRowNumber}`,`r-i-d-${newRowNumber}`,"d-col-right");
    addStyling(rightDRadioButton);

    newLeftInputRowContainer.appendChild(newLeftInputRowLabelNode);
    newLeftInputRowLabelNode.appendChild(newLeftInputRowLabel);
    newLeftInputRowContainer.appendChild(leftHorInputBox);
    newLeftInputRowContainer.appendChild(leftVertInputBox);
    newLeftInputRowContainer.appendChild(leftIRadioButton);
    newLeftInputRowContainer.appendChild(leftDRadioButton);
    newLeftInputRowContainer.appendChild(document.createElement("br"));
    leftFormDiv.appendChild(newLeftInputRowContainer)

    newRightInputRowContainer.appendChild(newRightInputRowLabelNode);
    newRightInputRowLabelNode.appendChild(newRightInputRowLabel);
    newRightInputRowContainer.appendChild(rightHorInputBox);
    newRightInputRowContainer.appendChild(rightVertInputBox);
    newRightInputRowContainer.appendChild(rightIRadioButton);
    newRightInputRowContainer.appendChild(rightDRadioButton);
    newRightInputRowContainer.appendChild(document.createElement("br"));
    rightFormDiv.appendChild(newRightInputRowContainer)
}

function removeInputRow() {
    const lastRowNumber = findNumberOfExistingRows("left-form-inputs",4);

    if (lastRowNumber > 1) {
        document.getElementById(`l-hchange-${lastRowNumber}`).parentNode.remove();
        document.getElementById(`r-hchange-${lastRowNumber}`).parentNode.remove();
    }
}

function addDetailRow() {
    const newRowNumber = findNumberOfExistingRows("details-inputs",3) + 1;
    const detailsInputArea = document.getElementById("details-inputs");

    let newDetailInputRowLabelText = ""
    if (newRowNumber < 10) {
        newDetailInputRowLabelText = `${newRowNumber}. `
    } else {
        newDetailInputRowLabelText = `${newRowNumber}.`
    }

    const newDetailInputRowContainer = document.createElement("div");
    const newDetailInputRowLabelNode = document.createElement("label");
    const newDetailInputRowLabel = document.createTextNode(newDetailInputRowLabelText);
    
    const detailInputBox = createInputElement("text",`detail-${newRowNumber}`,`detail-${newRowNumber}`,"col-left");
    detailInputBox.setAttribute("style","margin-left:-3px");
    const detailAboveInputBox = createInputElement("text",`detail-${newRowNumber}-above`,`detail-${newRowNumber}-above`,"col-mid");
    detailAboveInputBox.setAttribute("style","margin-left:14.5px");
    const detailHeightInputBox = createInputElement("text",`detail-${newRowNumber}-height`,`detail-${newRowNumber}-height`,"col-right");
    detailHeightInputBox.setAttribute("style","margin-left:19.5px");
    
    
    newDetailInputRowContainer.appendChild(newDetailInputRowLabelNode);
    newDetailInputRowLabelNode.appendChild(newDetailInputRowLabel);
    newDetailInputRowContainer.appendChild(detailInputBox);
    newDetailInputRowContainer.appendChild(detailAboveInputBox);
    newDetailInputRowContainer.appendChild(detailHeightInputBox);
    //newDetailInputRowContainer.appendChild(document.createElement("br")); Not needed
    detailsInputArea.appendChild(newDetailInputRowContainer)
}

function removeDetailRow() {
    const lastRowNumber = findNumberOfExistingRows("details-inputs",3);

    if (lastRowNumber > 1) {
        document.getElementById(`detail-${lastRowNumber}-height`).parentNode.remove();
        document.getElementById(`detail-${lastRowNumber}`).parentNode.remove();
    }
}

function findDirection(side,number) {
    if (document.getElementById(`${side}-d-${number}`).checked) {
        return "d";
    } else {
        return "i";
    }
}

function extractInputs(side,start,end) {
    const inputs = {};
    for (let i = start; i <= end; i++) {
        inputs[i] = [+document.getElementById(`${side}-hchange-${i}`).value,+document.getElementById(`${side}-vchange-${i}`).value,findDirection(side,i)];
    }
    return inputs;
}

function extractDetails() {
    const details = [];
    for (let i = 1; i <= findNumberOfExistingRows("details-inputs",3); i++) {
        details.push([document.getElementById(`detail-${i}`).value,+document.getElementById(`detail-${i}-above`).value,+document.getElementById(`detail-${i}-height`).value]);
    }
    return details;
}

function calculateRowsUpToSectionInclusive(section,swatchRows) {
    
    if (section > findNumberOfExistingRows("left-form-inputs",4)) return;
    
    let rows = 0;

    for (let i = 1; i <= section; i++) {
        rows += Math.round(+document.getElementById(`l-vchange-${i}`).value * swatchRows); //NB did not just count full vertical length up to & including this row then multiply, because each section is calculated separately for stitch adding elsewhere, and so results between here and elsewhere may not match due to rounding
    }
    return rows;
}

function calculateRibRows(ribLength,swatchRows) {
    return Math.round(ribLength * swatchRows);
}

function calculateInstructions() {

    const swatchStitches = +document.getElementById("swatch-stitches").value;
    const swatchRows = +document.getElementById("swatch-rows").value;
    const castOn = Math.round(+document.getElementById("cast-on").value * swatchStitches) + 1;

    let castOff = castOn;

    let castMultiplier = 1;

    if (document.getElementById("times-2").checked) {
        castMultiplier = 2;
    }

    const ribLength = +document.getElementById("rib").value;

    const ribRows = calculateRibRows(ribLength,swatchRows);

    const inputRows = findNumberOfExistingRows("left-form-inputs",4);

    const inputsL = extractInputs("l",1,inputRows);
    const inputsR = extractInputs("r",1,inputRows);
    const detailsInputs = extractDetails();

    let addedStitchesL = [];
    let totalRowsL = 0;

    for (key of Object.keys(inputsL)) {
        let stitchesResultsL = stitches(inputsL[key][0],inputsL[key][1],inputsL[key][2],totalRowsL,swatchStitches,swatchRows);
        addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
        totalRowsL += stitchesResultsL[1];
    }

    let addedStitchesR = [];
    let totalRowsR = 0;

    for (key of Object.keys(inputsR)) {
        let stitchesResultsR = stitches(inputsR[key][0],inputsR[key][1],inputsR[key][2],totalRowsR,swatchStitches,swatchRows);
        addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
        totalRowsR += stitchesResultsR[1];
    } 

    /*let rowDetails = {
        2: "add button",
        4: "add button",
        15: "detail"
    }*/

    let stitchTotals = {};

    for (elem of addedStitchesR) {
        if (elem > 0) {
            stitchTotals[elem] = ["  ",`+${addedStitchesR.filter(value => value === elem).length}`,"  "];
        }
        else {
            stitchTotals[elem * -1] = ["  ",addedStitchesR.filter(value => value === elem).length * -1,"  "];
        }
        
    }

    for (elem of addedStitchesL) {
        if (elem > 0) {
            if (elem in stitchTotals) {
                stitchTotals[elem][0] = `+${addedStitchesL.filter(value => value === elem).length}`;
            } else {
                stitchTotals[elem] = [`+${addedStitchesL.filter(value => value === elem).length}`,"  ","  "];
            }
        }
        else {
            if (elem * -1 in stitchTotals) {
                stitchTotals[elem * -1][0] = addedStitchesL.filter(value => value === elem).length * -1;
            } else {
                stitchTotals[elem * -1] = [addedStitchesL.filter(value => value === elem).length * -1,"  ","  "];
            }
        }
    }

    /*for (elem of Object.keys(rowDetails)) {
        if (elem in stitchTotals) {
            stitchTotals[elem][2] = rowDetails[elem];
        } else {
            stitchTotals = ["  ","  ",rowDetails[elem]];
        }
    }*/

    for (i = 0; i < detailsInputs.length; i++) {
        const detailRow = Math.round(calculateRowsUpToSectionInclusive(detailsInputs[i][1],swatchRows)) + Math.round(detailsInputs[i][2] * swatchRows);
        if (detailRow > 0) {
            if (detailRow in stitchTotals) {
                console.log(stitchTotals[detailRow][2] === "  ")
                if (stitchTotals[detailRow][2] === "  ") {
                    stitchTotals[detailRow][2] = detailsInputs[i][0];
                } else {
                    stitchTotals[detailRow][2] = `${stitchTotals[detailRow][2]}; ${detailsInputs[i][0]}`;
                }
            } else {
                stitchTotals[detailRow] = ["  ","  ",detailsInputs[i][0]];
            }
        }
    }

    let resultsArea = document.getElementById("results-area");

    let instructionsExist = !!document.getElementById("small-instruction-text");

    if (instructionsExist) {
        document.getElementById("small-instruction-text").remove()
        document.getElementById("line-break").remove()
        document.getElementById("cast-on-off-text").remove()
        document.getElementById("instructions-table").remove()
    }

    if (totalRowsR + totalRowsL === 0) {
        return;
    }

    const smallInstructionsNode = document.createElement("p");
    smallInstructionsNode.setAttribute("class","small-instruction");
    smallInstructionsNode.setAttribute("id","small-instruction-text");
    smallInstructionsNode.setAttribute("style","text-align:left")
    const smallInstructionText = `Name: ${document.getElementById("name").value} \n \
                                    Yarn: ${document.getElementById("yarn").value} \n \
                                    Tension: ${document.getElementById("tension").value} \n \
                                    Ends: ${document.getElementById("ends").value} \n \
                                    Rib: ${ribRows} rows \n \
                                    Notes: ${document.getElementById("notes").value}`
    smallInstructionsNode.appendChild(document.createTextNode(smallInstructionText));
    resultsArea.appendChild(smallInstructionsNode);

    const lineBreak = document.createElement("br");
    lineBreak.setAttribute("id","line-break");
    resultsArea.appendChild(lineBreak);

    for (elem of Object.keys(stitchTotals).sort((a,b) => b-a)) {
        castOff += Number(stitchTotals[elem][0]) + Number(stitchTotals[elem][1]);
    }

    const castOnOffNode = document.createElement("p");
    castOnOffNode.setAttribute("class","cast-instruction");
    castOnOffNode.setAttribute("id","cast-on-off-text");
    castOnOffNode.setAttribute("style","margin-top:16pt");
    castOnOffNode.appendChild(document.createTextNode(""));
    resultsArea.appendChild(castOnOffNode);
    document.getElementById("cast-on-off-text").innerHTML = `Cast On: <span>${castOn} x ${castMultiplier}</span> \n \n \
                                                                Cast Off: <span>${castOff} x ${castMultiplier}</span>`;

    let table = document.createElement("table");
    table.setAttribute("id","instructions-table");
    let tableBody = document.createElement("tbody");
    resultsArea.appendChild(table);
    table.appendChild(tableBody);

    for (elem of Object.keys(stitchTotals).sort((a,b) => b-a)) {

        let newRow = tableBody.insertRow();
        
        let newCell0 = newRow.insertCell();
        newCell0.setAttribute("style","border-top:none ; border-bottom:none ; border-left:none")

        let newCell1 = newRow.insertCell();
        let instructionsL = `${stitchTotals[elem][0]} \t`;
        let newText1 = document.createTextNode(instructionsL);
        if (instructionsL[0] === "+") {
            newCell1.setAttribute("style","color:green");
        }
        else if (instructionsL[0] === "-") {
            newCell1.setAttribute("style","color:orange");
        }
        newCell1.appendChild(newText1);

        let newCell2 = newRow.insertCell();
        let newText2 = document.createTextNode(`${elem} \t`)
        newCell2.appendChild(newText2);

        let newCell3 = newRow.insertCell();
        let instructionsR = `${stitchTotals[elem][1]}`;
        let newText3 = document.createTextNode(instructionsR);
        if (instructionsR[0] === "+") {
            newCell3.setAttribute("style","color:green");
        }
        else if (instructionsR[0] === "-") {
            newCell3.setAttribute("style","color:orange");
        }
        newCell3.appendChild(newText3);

        let newCell4 = newRow.insertCell();
        newCell4.setAttribute("style","font-size:8pt ; border-top:none ; border-bottom:none ; border-right:none")
        let details = stitchTotals[elem][2];
        let newText4 = document.createTextNode(details);
        newCell4.appendChild(newText4);
    }
}

function listAllInputElements() {
    const allElements = ["swatch-stitches","swatch-rows","name","notes","cast-on","times-2","yarn","tension","ends","rib"];
    for (i = 1; i <= findNumberOfExistingRows("left-form-inputs",4); i++) {
        allElements.push(`l-hchange-${i}`,`l-vchange-${i}`,`l-i-${i}`,`l-d-${i}`,`r-hchange-${i}`,`r-vchange-${i}`,`r-i-${i}`,`r-d-${i}`);
    }
    for (i = 1; i <= findNumberOfExistingRows("details-inputs",3); i++) {
        //window.alert(`detail-${i}`,`detail-${i}-above`,`detail-${i}-height`);
        allElements.push(`detail-${i}`,`detail-${i}-above`,`detail-${i}-height`);
    }
    //window.alert(allElements);
    return allElements;
}

function writeTextForFile() {
    
    const allElements = listAllInputElements();
    let text = "";
    let val = "";
    
    for (elem of allElements) {   
        console.log(elem);         
        if (elem.slice(1,4) === "-i-" || elem.slice(1,4) === "-d-" || elem === "times-2") {
            val = document.getElementById(elem).checked;
        } else {
            val = document.getElementById(elem).value;
        }
        console.log(val);
        text += `${elem},${val};`;
    }

    text = text.slice(0,text.length-1);

    return text;

}

function createTextFile() {
 
    let fileNameToSaveAs = prompt("Enter file name to save pattern as, or leave blank to use Name")


    if (fileNameToSaveAs != null) {

        if (fileNameToSaveAs === "") {
            fileNameToSaveAs = document.getElementById("name").value;
        }

        const textToWrite = writeTextForFile();

        //window.alert(textToWrite);

        const textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        
        const downloadLink = document.createElement("a");
        
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    }
}

function addOrRemoveSections(text) {
    const values = text.split(";");
    
    let sectionsInText = 0;
    let detailRowsInText = 0;
    
    for (let i = 0; i < values.length; i++) {
        if (values[i].slice(1,4) === "-i-" || values[i].slice(1,4) === "-d-") {
            sectionsInText++;
        } else if (values[i].slice(0,7) === "detail-") {
            detailRowsInText++
        }
    }

    sectionsInText /= 4;
    detailRowsInText /= 3;
    
    //const sectionsInText = (values.length - 7) / 8; //7 fields at top, 2 sides, 4 inputs in each row on each side
    
    const currentSections = findNumberOfExistingRows("left-form-inputs",4);
    const currentDetailRows = findNumberOfExistingRows("details-inputs",3);

    //console.log(sectionsInText,currentSections);

    if (sectionsInText != currentSections) {
        const sectionDifference = sectionsInText - currentSections;
        if (sectionDifference > 0) {
            for (let i = 1; i <= sectionDifference; i++) {
                addInputRow();
            }
        } else {
            for (let i = 1; i <= Math.abs(sectionDifference); i++) {
                removeInputRow();
            }
        }
    }

    if (detailRowsInText != currentDetailRows) {
        const detailRowsDifference = detailRowsInText - currentDetailRows;
        if (detailRowsDifference > 0) {
            for (let i = 1; i <= detailRowsDifference; i++) {
                addDetailRow();
            }
        } else {
            for (let i = 1; i <= Math.abs(detailRowsDifference); i++) {
                removeDetailRow();
            }
        }
    }
}

function populatePage(text) {
    const values = text.split(";");
    for (i = 0; i < values.length; i++) {
        let elementValueArray = values[i].split(",");
    
        if (elementValueArray[0].slice(1,4) === "-i-" || elementValueArray[0].slice(1,4) === "-d-" || elementValueArray[0] === "times-2") {
            document.getElementById(elementValueArray[0]).checked = elementValueArray[1] === "true";
        } else {
            document.getElementById(elementValueArray[0]).value = elementValueArray[1];
        }
    }
    document.getElementById("submit-button").click();
}

let input = document.getElementById("file-picker");

input.addEventListener("change", () => {
    let files = input.files;

    if (files.length === 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        addOrRemoveSections(file);
        populatePage(file);
    }

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
})
