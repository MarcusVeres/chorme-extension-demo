// Append our tutorial as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', function () 
{    
    var para = document.createElement('p');
    var string = "Right click on words in HTML pages to search for them. Select text and right click click to bring up a context menu."
    para.innerHTML=string;
    document.body.appendChild( para );
});

