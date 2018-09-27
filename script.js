/**
 * 
 */


const wordList =  // Each group of 4 is related
	["Merlot", "Shiraz", "Chardonnay", "Cabernet", 
	"Saturn", "Venus", "Jupiter", "Mercury", 
	"France", "England", "Spain", "Germany", 
	"Pecan", "Walnut", "Almond", "Pistachio", 
        
	"Sapphire", "Topaz", "Pearl", "Emerald",  
	"Blimp", "Helicopter", "Airplane", "Balloon", 
	"Safflower", "Canola", "Olive", "Sesame", 
	"Baseball", "Basketball", "Football", "Soccer", 
        
	"Pants", "Shirt", "Socks", "Dress", 
	"Red", "Blue", "Green", "Yellow", 
	"Jazz", "Classical", "Reggae", "Rock", 
	"Breakfast", "Lunch", "Dinner", "Brunch"];

//const sequence = [24,43,17,43,17,27,42,17,6,42,20,17,16,35,34,6,46,
//	6,46,34,16,0,42,42,42,0,16,33,10,42,20,46,44,42,16,35,20,3,46,
//	6,0,35,40,24,15,19,8,35,16,31,19,16,19,42,24,31,6,15,6,35,42,15,10,
//	16,42,6,40,33,16,3,35,16,17,40,21,5,44,3,42,15,34,43,6,15,16,42,6,5,
//	42,31,17,10,20,27,35,42,16,6,15,7,21,19,16,6,16,10,8,6,34,6,6,7,10,20,
//	35,17,46,6,7,0,16,15,42,16,17,15];


$(document).ready(function(){
//		for (var i = 0; i < dataset.length; i++) {
//			dataset[i] = shuffle(dataset[i]);
//		}
//		dataset = shuffle(dataset);
        $(".fade").hide();
        $(".show").hide();
        $(".menubox1").hide();
/*         $("#menu2").hide();
        $("#menu3").hide(); */
	
    $("#menu1").click(function(){
		//makeList(dataset[0]);
		$(".show2").hide();
    	//$(".menubox2").hide();
        $(".fade2").hide();
        $(".show3").hide();
    	//$(".menubox3").hide();
        $(".fade3").hide();
    	$(".show1").show();
    	$(".menubox1").show();
        $(".fade1").fadeTo(500, 1);
        //setTimeout(showSecondMenu, 2000);
        
    });
    
    $("#menu2").click(function(){
    	$(".show1").hide();
    	$(".menubox1").hide();
        $(".fade1").hide();
        $(".show3").hide();
    	//$(".menubox3").hide();
        $(".fade3").hide();
    	$(".show2").show();
        $(".fade2").fadeTo(500, 1);
        //setTimeout(showThirdMenu, 2000);
        //$("#menu3").delay(2000).show();
    });
    
    $("#menu3").click(function(){
    	$(".show2").hide();
    	//$(".menubox2").hide();
        $(".fade2").hide();
        $(".show1").hide();
    	$(".menubox1").hide();
        $(".fade1").hide();
    	$(".show3").show();
        $(".fade3").fadeTo(500, 1);
    });
    
});

var menuNum = 1;
var itemName = "Chardonnay";
var userMenu = "-1";
var userItem = "-1";

var start = Date.now();


function getNextMenu(menu) {
    if(menu === 1) {
        if(Math.random() > 0.5) {
            return 2;
        }
        else {
            return 3;
        }
    }
    if(menu === 2) {
        if(Math.random() > 0.5) {
            return 1;
        }
        else {
            return 3;
        }
    }
    if(menu === 3) {
        if(Math.random() > 0.5) {
            return 1;
        }
        else {
            return 2;
        }
    }
}


function getRandItem(menu) {
    index = 16*(menu-1) + Math.floor(Math.random() * 15);
    return wordList[index];
}


function updatePrompt() {
    if(document.getElementById("prompt") !== null) {
        menuNum = getNextMenu(menuNum);
        itemName = getRandItem(menuNum);
        document.getElementById("prompt").innerHTML = "Menu " + menuNum +  ", " + itemName;
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
        console.log(userItem, itemName);
        console.log(userItem.length, itemName.length);
        if(userItem === itemName + " ") {
            console.log("Correct");
            updatePrompt();
        }
    }
}

document.onclick = clickListener;
	