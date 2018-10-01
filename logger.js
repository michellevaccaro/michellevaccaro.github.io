var start = Date.now();

function getTimeStamp() {
    // return new Date().getTime();
    return Date.now() - start;
}

var arrayWithElements = new Array();

function clickListener(e) 
{   
    var clickedElement=(window.event)
                        ? window.event.srcElement
                        : e.target,
        tags=document.getElementsByTagName(clickedElement.tagName);
        // Element in list
        if(clickedElement.tagName == 'LI') {
            console.log(clickedElement.innerHTML + ':  ' + getTimeStamp());
        }
        // Blank HTML
        else {
            console.log(clickedElement.tagName + ':  ' + getTimeStamp());
        }

    for(var i=0;i<tags.length;++i)
    {
      if(tags[i]==clickedElement)
      {
        arrayWithElements.push({tag:clickedElement.tagName,index:i}); 
      }    
    }
}

document.onclick = clickListener;