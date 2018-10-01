/**
 * Javascript file for the control condition. Goes with Control.html
 * Assuming the logging works, I think this is done.
 */

//
const wordList =  // Each group of 4 is related
	["Minotaur", "Sasquatch", "Ogopogo", "Bigfoot",
	"Lake", "Sea", "Pond", "Ocean", 
	"Harvard", "Yale", "Princeton", "Columbia", 
	"Pine", "Maple", "Oak", "Elm",
	"Sofa", "Chair", "Table", "Desk",
	"Rose", "Tulip", "Daffodil", "Lily",
	"Sight", "Touch", "Smell", "Taste",
	"Book", "Magazine", "Newspaper", "Journal",
	"Math", "Science", "History", "English",
	"Shakespeare", "Hemmingway", "Tolstoy", "Dickens",
	"Facebook", "Instagram", "Snapchat", "Twitter",
	"Jalapeno", "Habanero", "Poblano", "Serrano"];

// order of items to be chosen. It is the same as for the adaptive but all shifted over one menu to the right
//const sequence = [40, 11, 33, 11, 33, 43, 10, 33, 22, 10, 36, 33, 32, 
//	3, 2, 22, 14, 22, 14, 2, 32, 16, 10, 10, 10, 16, 32, 1, 26, 10, 36, 
//	14, 12, 10, 32, 3, 36, 19, 14, 22, 16, 3, 8, 40, 31, 35, 24, 3, 32, 
//	47, 35, 32, 35, 10, 40, 47, 22, 31, 22, 3, 10, 31, 26, 32, 10, 22, 
//	8, 1, 32, 19, 3, 32, 33, 8, 37, 21, 12, 19, 10, 31, 2, 11, 22, 31, 
//	32, 10, 22, 21, 10, 47, 33, 26, 36, 43, 3, 10, 32, 22, 31, 23, 37, 
//	35, 32, 22, 32, 26, 24, 22, 2, 22, 22, 23, 26, 36, 3, 33, 14, 22, 
//	23, 16, 32, 31, 10, 32, 33, 31];
const sequence = [40, 37, 21, 12, 19, 10, 31, 2];


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
var userMenu = "-1";
var userItem = "-1";

var start = Date.now();

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
		let par = document.createElement("p");
		let node = document.createTextNode("Please press Next to move on to the next part of the study.");
		par.appendChild(node);
		let div = document.getElementById("div1");
		div.appendChild(par);
		let buttons = document.getElementById("buttons");
		let but1 = document.getElementById("button1");
		let but2 = document.getElementById("button2");
		let but3 = document.getElementById("button3");
		buttons.removeChild(but1);
		buttons.removeChild(but2);
		buttons.removeChild(but3);
		let next = document.createElement('a');
		let t = document.createTextNode('Next');
		next.appendChild(t);
		next.title = "Next";
		next.href = "surveyControl.html";
		document.body.appendChild(next);
	}
}

function getTimeStamp() {
    // return new Date().getTime();
    return Date.now() - start;
}


function clickListener(e) {   
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
        if(clickedElement.innerHTML.substring(0, 4) === "Menu") {
            userMenu = clickedElement.innerHTML;
        }
        else if(clickedElement.innerHTML.length < 15) {
            userItem = clickedElement.innerHTML.replace(" ", "");
        }
        
        // Check Values
        console.log(userItem.length, itemName.length);
        if(userItem === itemName + " ") {
            console.log("Correct");
            closeMenu();
            updatePrompt();
        }
    }
}

document.onclick = clickListener;