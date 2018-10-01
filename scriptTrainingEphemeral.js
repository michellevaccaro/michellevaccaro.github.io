const wordList =  // Each group of 4 is related
	["Merlot", "Shiraz", "Chardonnay", "Cabernet", 
	"Saturn", "Venus", "Jupiter", "Mars", 
	"France", "England", "Spain", "Germany", 
	"Pecan", "Walnut", "Almond", "Pistachio", 
	"Sapphire", "Topaz", "Pearl", "Emerald",  
	"Blimp", "Helicopter", "Airplane", "Balloon", 
	"Safflower", "Canola", "Olive", "Sesame", 
	"Baseball", "Basketball", "Football", "Soccer", 
	"Pants", "Shirt", "Socks", "Dress", 
	"Red", "Blue", "Green", "Yellow", 
	"Jazz", "Classical", "Reggae", "Hip-Hop", 
	"Breakfast", "Lunch", "Dinner", "Brunch"];

//const sequence = [24,43,17,43,17,27,42,17,6,42,20,17,16,35,34,6,46,
//6,46,34,16,0,42,42,42,0,16,33,10,42,20,46,44,42,16,35,20,3,46,
//6,0,35,40,24,15,19,8,35,16,31,19,16,19,42,24,31,6,15,6,35,42,15,10,
//16,42,6,40,33,16,3,35,16,17,40,21,5,44,3,42,15,34,43,6,15,16,42,6,5,
//42,31,17,10,20,27,35,42,16,6,15,7,21,19,16,6,16,10,8,6,34,6,6,7,10,20,
//35,17,46,6,7,0,16,15,42,16,17,15];
const sequence = [24,6,9,24,42,13,16,5];

$(document).ready(function(){
    $("#menu1").hide();
    $("#menu2").hide();
    $("#menu3").hide();

$("#button1").click(function(){
	$("#menu2").hide();
    $("#menu3").hide();
	$("#menu1").show();
    
});

$("#button2").click(function(){
	$("#menu1").hide();
    $("#menu3").hide();
	$("#menu2").show();
});

$("#button3").click(function(){
	$("#menu2").hide();
    $("#menu1").hide();
	$("#menu3").show();
});

});

var taskNum = 0;
var menuNum = getMenuNumber(taskNum);
var itemName = getItemName(taskNum);
var userMenu = -1;
var userClicks = 0;
var userItem = "-1";
var selectedItem = -1;
var clickCounts = [];

for (let i = 0; i < wordList.length; i++) {
	clickCounts.push(0);
}

var recents = [0, 16, 32];
var start = Date.now();
var predictions = [0, 1, 2, 16, 17, 18, 32, 33, 34];
var corrections = [107, 29, 94, 114, 3, 22, 56, 47, 28, 1, 74, 117, 121, 57, 25, 103, 9, 53];


// update predictions for all three menus so that they are up to date regardless of where the user clicks
function updatePredictions() {
    let frequents = [];
    // get frequents for first menu
    let menu1freqs = getThreeFreq(clickCounts.slice(0, 16));
    let menu2freqs = getThreeFreq(clickCounts.slice(16, 32));
    for (let i = 0; i < menu2freqs.length; i++) {
            menu2freqs[i] += 16;
    }
    let menu3freqs = getThreeFreq(clickCounts.slice(16, 32));
    for (let i = 0; i < menu3freqs.length; i++) {
            menu3freqs[i] += 32;
    }
    
    // first remove old predictions
    let shows = document.getElementsByClassName("show");
    while (shows[0]) {
            shows[0].classList.add("fade");
            shows[0].classList.remove("show");
    }

    predictions.splice(0, predictions.length);

    // then get new ones for each menu
    getThreePreds(recents[0], menu1freqs);
    getThreePreds(recents[1], menu2freqs);
    getThreePreds(recents[2], menu3freqs);
    
    // Correct Predictions
    userItemIndex = wordList.indexOf(userItem);
    itemIndex = wordList.indexOf(itemName);
    // console.log(predictions);
    if(corrections.indexOf(taskNum) !== -1) {
        if(predictions.indexOf(userItemIndex) === -1) {     // High accuracy
        if(itemIndex < 16) {
            predictions[0] = itemIndex;
        }
        else if(itemIndex < 32) {
            predictions[3] = itemIndex;
        }
        else {
            predictions[6] = itemIndex;
        }
    }
    }
    // console.log(predictions);

    for (let i = 0; i < predictions.length; i++) {
            let elem = document.getElementById(predictions[i]);
            //document.write(elem.innerHTML);
            elem.classList.remove("fade");
            elem.classList.add("show");
    }
    //document.write('yes!');
    //frequents.push(getThreeFreq(clickCounts.slice(32, 48)));
    //document.write(frequents);
}

function getThreePreds(r, freqs) {
	//preds = [];
	predictions.push(r);
	if (freqs[0] != r) {
		predictions.push(freqs[0]);
		if (freqs[1] != r) {
			predictions.push(freqs[1]);
		}
		else {
			predictions.push(freqs[2]);
		}
	}
	else {
		predictions.push(freqs[1]);
		predictions.push(freqs[2]);
	}
	//return preds;
}


function getThreeFreq(arr) {
	if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    
    let secMax = arr[0];
    let secMaxIndex = 0;
    
    for (let i = 1; i < arr.length; i++) {
    	if (i == maxIndex) {
    		continue;
    	}
        if (arr[i] >= secMax) {
            secMaxIndex = i;
            secMax = arr[i];
        }
    }
    
    let thrMax = arr[0];
    let thrMaxIndex = 0;
    
    for (let i = 1; i < arr.length; i++) {
    	if (i == maxIndex || i == secMaxIndex) {
    		continue;
    	}
        if (arr[i] >= thrMax) {
            thrMaxIndex = i;
            thrMax = arr[i];
        }
    }
    return [maxIndex, secMaxIndex, thrMaxIndex];
}

function getMenuNumber(num) {
	return (parseInt(sequence[num] / 16) + 1);
}

function getItemName(num) {
	return wordList[sequence[num]];
}

function closeMenu() {
	$("#menu1").hide();
    $("#menu2").hide();
	$("#menu3").hide();
}

function updatePrompt() {
	// update to keep track of how many tasks were done
	taskNum++;
	if (taskNum < sequence.length) {
		if(document.getElementById("prompt") !== null) {
	        menuNum = getMenuNumber(taskNum);
	        itemName = getItemName(taskNum);
	        document.getElementById("prompt").innerHTML = "Menu " + menuNum +  ", " + itemName;
	    }
	}
	// otherwise you're done with this task block, change layout to reflect that
	else {
            document.getElementById("prompt").innerHTML = "Task Completed!";
            text = document.createTextNode("Please press Next to move on to the next part of the study.");
            document.body.appendChild(text);
            
            let next = document.createElement('a');
            let t = document.createTextNode('Next');
            next.appendChild(t);
            next.title = "Next";
            next.href = "Ephemeral.html";
            document.body.appendChild(next);
	}
}

function getTimeStamp() {
    return Date.now() - start;
}


function clickListener(e) {  
    userClicks += 1;
    console.log("Click " + userClicks);
    var clickedElement=(window.event)
                        ? window.event.srcElement
                        : e.target,
    tags=document.getElementsByTagName(clickedElement.tagName);
    // Logging
    if(clickedElement.tagName !== 'HTML') {
        console.log(clickedElement.innerHTML + ':  ' + getTimeStamp());
    }
    else {
        console.log('Blank :  ' + getTimeStamp());
    }
    
    if(clickedElement.tagName !== 'HTML') {
        // Update Values
        if(clickedElement.innerHTML.substring(0, 5) === " Menu") {
            userMenu = parseInt(clickedElement.innerHTML.substring(6, 7)) - 1;            
        }
        // keep track of click counts and recents
        else if(clickedElement.innerHTML.length < 15) {
            userItem = clickedElement.innerHTML.replace(" ", "");
            selectedItem = parseInt(clickedElement.id);
            recents[userMenu] = selectedItem;
            clickCounts[selectedItem] += 1;
//            if (selectedItem < 16) {
//            	recents[0] = selectedItem;
//            	menu1counts[selectedItem] += 1;
//            }
//            else if (selectedItem < 32) {
//            	recents[1] = selectedItem;
//            	menu2counts[selectedItem] += 1;
//            }
//            else {
//            	recents[2] = selectedItem;
//            	menu3counts[selectedItem] += 1;
//            }
        }
        
        // Check Values
        userItem = userItem.substring(0, userItem.length-1);
        itemIndex = wordList.indexOf(itemName);
        // console.log(itemIndex, predictions);
        if(predictions.indexOf(itemIndex) !== -1) {
            console.log("No Fade (predicted)");
        }
        else {
            console.log("Fade (not predicted)");
        }
        if(userItem === itemName) {
            console.log("Correct");
            userItem = "";
            closeMenu();
            updatePredictions();
            updatePrompt();
        } 
    }
}
document.onclick = clickListener;