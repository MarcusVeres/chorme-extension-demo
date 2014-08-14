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
        chrome.tabs.create({ "url" : query });
    }

    function search_google_maps(info)
    {
        var query = "http://maps.google.co.m/maps?q=" + info.selectionText;
        chrome.tabs.create({ url: query })
    }

    function search_stack_overflow(info)
    {
        var query = "http://stackoverflow.com/search?q=" + info.selectionText;
        chrome.tabs.create({ "url" : query });
    }

    // Link Functions

    function open_link(info)
    {
        console.log("you clicked this");
        var url = info.linkUrl;
        console.log(url);
        chrome.tabs.create({
            "url" : url
        });
    }


// -------------------------------------------------------------------
// Define the Parents
    
    // Select Text
    var select_parent = chrome.contextMenus.create({
        "title": "Menu for Selected Text",
        "contexts": ["selection"]
    });

    // Click somewhere on the page
    var regular_parent = chrome.contextMenus.create({
        "title": "Menu for Regular Use"
    });

    // Right Click on a Link
    var link_parent = chrome.contextMenus.create({
        "title": "Menu for Links",
        "contexts": ["link"]
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

    var child_query_stack_overflow = chorome.contextMenus.create({
        "title": "Stack Ovelflow",
        "parentId" : select_parent,
        "contexts" : ["selection"],
        "onclick" : search_stack_overflow
    });

    // Link Children
    var child_link_open = chrome.contextMenus.create({
        "title": "Open in a new tab",
        "parentId" : link_parent,
        "contexts" : ["link"],
        "onclick" : open_link
    });    

// -------------------------------------------------------------------
// Some other crap at the bottom

// alert("boll");

/*

chrome.contextMenus.create({  
     title: "Open link in new tab",  
     contexts: ["link"],  
     onclick: function search(OnClickData) {  
       chrome.tabs.create ({url: OnClickData.linkUrl}) }
  });

*/



