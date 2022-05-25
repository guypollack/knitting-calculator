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

function findNumberOfExistingRows() {
    const leftFormInputs = document.getElementById("left-form-inputs");
    return leftFormInputs.getElementsByTagName("input").length / 4;
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
    const newRowNumber = findNumberOfExistingRows() + 1;
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
    const lastRowNumber = findNumberOfExistingRows();

    if (lastRowNumber > 1) {
        document.getElementById(`l-hchange-${lastRowNumber}`).parentNode.remove();
        document.getElementById(`r-hchange-${lastRowNumber}`).parentNode.remove();
    }
}

function findDirection(side,number) {
    if (document.getElementById(id=`${side}-d-${number}`).checked) {
        return "d";
    } else {
        return "i";
    }
}

function extractInputs(side,start,end) {
    const inputs = {};
    for (let i = start; i <= end; i++) {
        inputs[i] = [+document.getElementById(id=`${side}-hchange-${i}`).value,+document.getElementById(id=`${side}-vchange-${i}`).value,findDirection(side,i)];
    }
    return inputs;
}

function calculateInstructions() {

    const swatchStitches = +document.getElementById(id="swatch-stitches").value;
    const swatchRows = +document.getElementById(id="swatch-rows").value;
    const castOn = Math.round(+document.getElementById("cast-on").value * swatchStitches) + 1;
    let castOff = castOn;

    const inputRows = findNumberOfExistingRows();

    const inputsL = extractInputs("l",1,inputRows);
    const inputsR = extractInputs("r",1,inputRows);

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

    let stitchTotals = {};

    for (elem of addedStitchesR) {
        if (elem > 0) {
            stitchTotals[elem] = ["  ",`+${addedStitchesR.filter(value => value === elem).length}`];
        }
        else {
            stitchTotals[elem * -1] = ["  ",addedStitchesR.filter(value => value === elem).length * -1];
        }
        
    }

    for (elem of addedStitchesL) {
        if (elem > 0) {
            if (elem in stitchTotals) {
                stitchTotals[elem][0] = `+${addedStitchesL.filter(value => value === elem).length}`;
            } else {
                stitchTotals[elem] = [`+${addedStitchesL.filter(value => value === elem).length}`,"  "];
            }
        }
        else {
            if (elem * -1 in stitchTotals) {
                stitchTotals[elem * -1][0] = addedStitchesL.filter(value => value === elem).length * -1;
            } else {
                stitchTotals[elem * -1] = [addedStitchesL.filter(value => value === elem).length * -1,"  "];
            }
        }
    }

    let resultsArea = document.getElementById("results-area");

    let tableExists = !!document.getElementById("instructions-table");

    if (tableExists) {
        document.getElementById("cast-on-text").remove()
        document.getElementById("line-break").remove()
        document.getElementById("cast-off-text").remove()
        document.getElementById("instructions-table").remove()
    }

    const castOnNode = document.createElement("p");
    castOnNode.setAttribute("class","cast-instruction");
    castOnNode.setAttribute("id","cast-on-text");
    castOnNode.appendChild(document.createTextNode(""));
    resultsArea.appendChild(castOnNode);
    document.getElementById("cast-on-text").innerHTML = `Cast On: <span>${castOn}</span>`;

    const lineBreak = document.createElement("br");
    lineBreak.setAttribute("id","line-break");
    resultsArea.appendChild(lineBreak);

    const castOffNode = document.createElement("p");
    castOffNode.setAttribute("class","cast-instruction");
    castOffNode.setAttribute("id","cast-off-text");
    castOffNode.appendChild(document.createTextNode(""));
    resultsArea.appendChild(castOffNode);
    document.getElementById("cast-off-text").innerHTML = `Cast Off: <span>${castOff}</span>`;   

    let table = document.createElement("table");
    table.setAttribute("id","instructions-table");
    let tableBody = document.createElement("tbody");
    resultsArea.appendChild(table);
    table.appendChild(tableBody);

    for (elem of Object.keys(stitchTotals).sort((a,b) => b-a)) {

        castOff += Number(stitchTotals[elem][0]) + Number(stitchTotals[elem][1]);

        let newRow = tableBody.insertRow();
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
    }    
}
