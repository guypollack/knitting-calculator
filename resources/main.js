function stitches(hLength, vLength, direction, totalRows, swatchStitches, swatchRows) {
    const totalStitchesToAdd = Math.round(hLength * swatchStitches);
    const rowsInSection = Math.round(vLength * swatchRows);
    //console.log(totalStitchesToAdd,rowsInSection);
    const stitchAddingInterval = rowsInSection / totalStitchesToAdd;
    //console.log(stitchAddingInterval);
    let stitchesArray = [];
    let i = 1;
    while (i * stitchAddingInterval <= rowsInSection) {
        //console.log(i);
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
    //console.log(stitchesArray);
    return [stitchesArray,rowsInSection];
}

function display_a() {

    let a = document.getElementById(id="swatch-stitches").value;

    window.alert(a==="");
}

function radioAlert() {

    window.alert(document.getElementById(id="l-i-1").checked)
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

    const inputsL = extractInputs("l",1,8);
    const inputsR = extractInputs("r",1,8);

    let addedStitchesL = [];
    let totalRowsL = 0;

    for (key of Object.keys(inputsL)) {
        let stitchesResultsL = stitches(inputsL[key][0],inputsL[key][1],inputsL[key][2],totalRowsL,swatchStitches,swatchRows);
        addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
        totalRowsL += stitchesResultsL[1];
    }

    /*
    stitchesResultsL = stitches(6.2,30,"i",totalRowsL,swatchStitches,swatchRows);
    addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
    totalRowsL += stitchesResultsL[1];

    stitchesResultsL = stitches(1,2,"i",totalRowsL,swatchStitches,swatchRows);
    addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
    totalRowsL += stitchesResultsL[1];

    stitchesResultsL = stitches(0,2,"i",totalRowsL,swatchStitches,swatchRows);
    addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
    totalRowsL += stitchesResultsL[1];

    stitchesResultsL = stitches(6,2,"d",totalRowsL,swatchStitches,swatchRows);
    addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
    totalRowsL += stitchesResultsL[1];

    stitchesResultsL = stitches(1,7,"i",totalRowsL,swatchStitches,swatchRows);
    addedStitchesL = addedStitchesL.concat(stitchesResultsL[0]);
    totalRowsL += stitchesResultsL[1];
    */

    //console.log(addedStitchesL);


    let addedStitchesR = [];
    let totalRowsR = 0;

    //window.alert(Object.keys(inputsR));

    for (key of Object.keys(inputsR)) {
        let stitchesResultsR = stitches(inputsR[key][0],inputsR[key][1],inputsR[key][2],totalRowsR,swatchStitches,swatchRows);
        addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
        totalRowsR += stitchesResultsR[1];
    }

    /*
    stitchesResultsR = stitches(6.2,30,"i",totalRowsR,swatchStitches,swatchRows);
    addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
    totalRowsR += stitchesResultsR[1];

    stitchesResultsR = stitches(3,2,"i",totalRowsR,swatchStitches,swatchRows);
    addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
    totalRowsR += stitchesResultsR[1];

    stitchesResultsR = stitches(4,2,"d",totalRowsR,swatchStitches,swatchRows);
    addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
    totalRowsR += stitchesResultsR[1];

    stitchesResultsR = stitches(0,2,"i",totalRowsR,swatchStitches,swatchRows);
    addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
    totalRowsR += stitchesResultsR[1];

    stitchesResultsR = stitches(1,2,"i",totalRowsR,swatchStitches,swatchRows);
    addedStitchesR = addedStitchesR.concat(stitchesResultsR[0]);
    totalRowsR += stitchesResultsR[1];
    */

    

    let stitchTotals = {};

    for (elem of addedStitchesR) {
        if (elem > 0) {
            stitchTotals[elem] = ["  ",`+${addedStitchesR.filter(value => value === elem).length}`];
            //castOff += Number(stitchTotals[elem][1]);
        }
        else {
            stitchTotals[elem * -1] = ["  ",addedStitchesR.filter(value => value === elem).length * -1];
            //castOff += Number(stitchTotals[elem * -1][1]);
        }
        
    }

    for (elem of addedStitchesL) {
        if (elem > 0) {
            //console.log(elem);
            if (elem in stitchTotals) {
                stitchTotals[elem][0] = `+${addedStitchesL.filter(value => value === elem).length}`;
            } else {
                stitchTotals[elem] = [`+${addedStitchesL.filter(value => value === elem).length}`,"  "];
            }
            //castOff += Number(stitchTotals[elem][0]);
        }
        else {
            if (elem in stitchTotals) {
                stitchTotals[elem * -1][0] = addedStitchesL.filter(value => value === elem).length * -1;
            } else {
                stitchTotals[elem * -1] = [addedStitchesL.filter(value => value === elem).length * -1,"  "];
            }
            //castOff += Number(stitchTotals[elem * -1][0]);
        }
    }

    //console.log(stitchTotals);


    
    

    //let tableRowsAdded = 0;

    let resultsArea = document.getElementById("results-area");

    let tableExists = !!document.getElementById("instructions-table");

    if (tableExists) {
        document.getElementById("cast-on-text").remove()
        document.getElementById("cast-off-text").remove()
        document.getElementById("instructions-table").remove()
    }

    let table = document.createElement("table");
    table.setAttribute("id","instructions-table");
    let tableBody = document.createElement("tbody");
    resultsArea.appendChild(table);

    for (elem of Object.keys(stitchTotals).sort((a,b) => b-a)) {

        //tableRowsAdded++;

        //Use to add to different tables:
        //let tableBody = document.getElementById(`results-table-body-${Math.ceil(tableRowsAdded / 20)}`);
        
        /*
        window.alert(elem);
        window.alert(stitchTotals[elem][0]);
        window.alert(stitchTotals[elem][0].isNan());
        window.alert(stitchTotals[elem][1]);
        window.alert(stitchTotals[elem][1].isNan());
        */
        
        castOff += Number(stitchTotals[elem][0]) + Number(stitchTotals[elem][1]);
        
        table.appendChild(tableBody);

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

        //node.appendChild(textnode);


        //document.getElementById("results-area").appendChild(node);
    }
    //window.alert(castOff);
    //console.log(instructions);
    const castOnNode = document.createElement("p");
    castOnNode.setAttribute("class","cast-instruction");
    castOnNode.setAttribute("id","cast-on-text");
    castOnNode.appendChild(document.createTextNode(""));
    
    const castOffNode = document.createElement("p");
    //castOffNode.setAttribute("style","color:red");
    castOffNode.setAttribute("class","cast-instruction");
    castOffNode.setAttribute("id","cast-off-text");
    //const castOffText = document.createTextNode(`${castOff}`);
    //const castOffText = document.createTextNode("");
    castOffNode.appendChild(document.createTextNode(""));
    const parentDiv = document.getElementById("instructions-table").parentNode;
    const tableElement = document.getElementById("instructions-table");
    parentDiv.insertBefore(castOnNode,tableElement);
    document.getElementById("cast-on-text").innerHTML = `Cast On: <span>${castOn}</span>`;
    parentDiv.insertBefore(castOffNode,tableElement);
    document.getElementById("cast-off-text").innerHTML = `Cast Off: <span>${castOff}</span>`;
}

/*
let doc = new jsPDF();

doc.setFont("Courier");
doc.text(instructions, 10, 10);
//doc.save('a4.pdf');
*/