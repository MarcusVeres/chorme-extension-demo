// -------------------------------------------------------------------
// Context Menu Code

console.log( "version 0.0.0.018" );


// -------------------------------------------------------------------
// Application Functions 

    var functions = 
    {
        // perform a search query on a website
        generic_search : function()
        {
            var _args = arguments[0];
            var info = _args['info'];
            var query = _args['caller']['query_root'] || 'http://google.com/search?q=';

            // sanitize the query
//             query.replace(/%20/, ' ');

            query += info.selectionText;
            console.log("query is:" , query);
            chrome.tabs.create({ "url" : query });
        }
    }

    // General Functions

    function generic_click_event( info , tab )
    {
        console.log("item" , info.menuItemId , "was clicked");
        console.log("info:" , JSON.stringify(info));
        console.log("tab:" , JSON.stringify(tab));
    }

    // Selection Functions

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
// Arrays / Data

var data_object = 
{
    "menu_items" : 
    [
        {   
            "name" : "google",
            "query_root" : "http://google.com/search?q=",
            "title" : "Search on Google",
            "function_name" : "generic_search",
            "contexts" : ["selection"],
            "parent_id" : "select_parent"
        },
        {   
            "name" : "google_maps",
            "query_root" : "http://maps.google.com/maps?q=",
            "title" : "Search on Google Maps",
            "function_name" : "generic_search",
            "contexts" : ["selection"],
            "parent_id" : "select_parent"
        },
        {   
            "name" : "stack_overflow",
            "query_root" : "http://stackoverflow.com/search?q=",
            "title" : "Search on Stack Overflow",
            "function_name" : "generic_search",
            "contexts" : ["selection"],
            "parent_id" : "select_parent"
        },
        {   
            "name" : "wikipedia",
            "query_root" : "http://wikipedia.com/w/index.php?search=",
            "title" : "Search on Wikipedia",
            "function_name" : "generic_search",
            "contexts" : ["selection"],
            "parent_id" : "select_parent"
        }
    ]

} // END - data object


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


// Loop through the children
// iterate through the data object and generate a function for each one
for( var i = 0 , length = data_object.menu_items.length ; i < length ; i++ )
{
    (function()
    {
        var index = i;
        var args = arguments[0];       
 
        var root = data_object.menu_items[i];
        // console.log( root.name , " : " , root.query_root , " : " , root.title );
        //console.log( "i is ", i );
        //console.log( "arguments be" , arguments );

        chrome.contextMenus.create({
            "title": root.title,
            "parentId" : window[root.parent_id], // TODO: avoid polluting the global namespace + update this
            "contexts" : root.contexts,
            "onclick" : function( info , tab ){
                // get the function from the set of functions
                // feed it an object as an argument 
                functions[root.function_name]({ 
                    "info" : info , "caller" : root 
                });
            }
            // This is not dynamic ; would have to create a separate loop for all functionality
            /* 
            "onclick": function(info){
                var query = root.query_root + info.selectionText;
                chrome.tabs.create({ "url" : query });
            }
            */

        });   

    }).apply( this , [{ "something" : "wong" , "anything" : "white" , "i_value" : i  }]);

} 


// -------------------------------------------------------------------
// Define the Children

    // Regular Children

    var child_1 = chrome.contextMenus.create({
        "title": "Log Event Info",
        "parentId": regular_parent,
        "onclick": generic_click_event
    });

    // Selection Children
    // ( see above )

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



