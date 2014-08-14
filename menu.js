// -------------------------------------------------------------------
// Context Menu Code


// -------------------------------------------------------------------
// Application Functions

    // General Functions

    function generic_click_event( info , tab )
    {
        console.log("item" , info.menuItemId , "was clicked");
        console.log("info:" , JSON.stringify(info));
        console.log("tab:" , JSON.stringify(tab));
    }

    // Selection Functions

    function search_google(info)
    {
        var query = "http://google.com/search?q=" + info.selectionText;
        chrome.tabs.create({
            "url" : query
        });
    }

    function search_google_maps(info)
    {
        var searchstring = info.selectionText;
        chrome.tabs.create({url: "http://maps.google.com/maps?q=" + searchstring})
    }


// -------------------------------------------------------------------
// Define the Parents

var select_parent = chrome.contextMenus.create({
    "title": "Menu for Selected Text",
    "contexts": ["selection"]
});

var regular_parent = chrome.contextMenus.create({
    "title": "Menu for Regular Use"
});


// -------------------------------------------------------------------
// Define the Children

    // Regular Children

    var child_1 = chrome.contextMenus.create({
        "title": "Log Event Info",
        "parentId": regular_parent,
        "onclick": generic_click_event
    });

    // Selection Children

    var child_query_google = chrome.contextMenus.create({
        "title": "Find on Google",
        "parentId" : select_parent,
        "contexts": ["selection"],
        "onclick": search_google
    });

    var child_query_google_maps = chrome.contextMenus.create({
        "title": "Find on Google Maps",
        "parentId": select_parent,
        "contexts": ["selection"],      // lets chrome know we're using the selection
        "onclick": search_google_maps   // function to call
    });


// -------------------------------------------------------------------
// Some other crap at the bottom



// alert("boll");

// right click on link event

/*
function searchgooglemaps(info)
{
 var searchstring = info.selectionText;
 chrome.tabs.create({url: "http://maps.google.com/maps?q=" + searchstring})
}

chrome.contextMenus.create({title: "Search Google Maps", contexts:["selection"], onclick: searchgooglemaps});
*/

