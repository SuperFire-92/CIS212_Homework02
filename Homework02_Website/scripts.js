var listOfPosts;
var listOfTitles;
var listOfContents;
var hasAddedPosts = false;
var numOfPosts = 0;

//#region index

function onIndexStart()
{
    listOfContents = new Array();

    //When listOfContents has already been put into the sessionStorage, get it
    if (sessionStorage.getItem("listOfContents") != null)
    {
        listOfContents = JSON.parse(sessionStorage.getItem("listOfContents"));
    }
    //If this is the first time the user has been to this page, set up the array with premade posts
    else
    {
        listOfContents.push("<h1>Test1</h1><p>This is the first test</p>","<h1>Test2</h1><p>This is a sequel to test1</p>");
    }

    //If the postview has passed an item to delete, delete it.
    if (sessionStorage.getItem("deleteItem") != null)
    {
        //Let the console know what was deleted
        console.log("Deleted Item " + sessionStorage.getItem("deleteItem"));
        //Remove the post from the array
        listOfContents.splice(sessionStorage.getItem("deleteItem"), 1);
        //Remove the deleteItem from sessionStorage to avoid this if statement from running again
        sessionStorage.removeItem("deleteItem");
        //Set the new listOfContents into the sessionStorage
        sessionStorage.setItem("listOfContents",JSON.stringify(listOfContents));
    }

    //Place the table into the column
    var col = document.getElementById("col_v_u_posts");

    var table = document.createElement("table")
    table.setAttribute("id","table_v_u_postList");

    col.append(table);

    //Fill the table with the posts
    for (var i = 0; i < listOfContents.length; i++)
    {
        addFullPostToTable(listOfContents[i]);
    }
}

//For putting posts into the table
function addFullPostToTable(content)
{
    //Get the table
    var table = document.getElementById("table_v_u_postList");

    //If this is not the first post
    if (hasAddedPosts)
    {
        //Set the number of rows and columns
        var numRows = table.rows.length;
        var numCols = table.rows[0].cells.length - 1;
        var row;
        var cell;
    }
    //If it is the first post
    else
    {
        //The rows and columns are 0
        var numRows = 0;
        var numCols = 0;
        var row;
        var cell;
    }

    //Make the row and cell
    row = table.insertRow(numRows);
    row.setAttribute("onclick","postClick(" + numOfPosts + ")")
    cell = row.insertCell(numCols);

    //Insert the content into the cell
    cell.innerHTML = content;

    //Tell future runs that there are posts
    hasAddedPosts = true;
    numOfPosts++;
}

//Used for the home button
function homeButton()
{
    if (listOfContents != null)
    {
        sessionStorage.setItem("listOfContents", JSON.stringify(listOfContents));
    }
    
    location.href="index.html";
}

//Used for the post button
function postButton()
{
    if (listOfContents != null)
    {
        sessionStorage.setItem("listOfContents", JSON.stringify(listOfContents));
    }

    location.href="post.html";
}

//Used for pressing on a post
function postClick(num)
{
    sessionStorage.setItem("listOfContents", JSON.stringify(listOfContents));
    sessionStorage.setItem("indexOfContent", num);

    location.href="postview.html";
}

//#endregion

//#region postview

//For when a postview loads
function onPostViewStart()
{
    //Get the index of where the post is in the array
    var index = sessionStorage.getItem("indexOfContent");
    //Get the array
    listOfContents = JSON.parse(sessionStorage.getItem("listOfContents"));

    //Get the column for displaying the post
    var col = document.getElementById("col_v_u_posts");

    //Display the post
    col.innerHTML = listOfContents[index];
}

//For deleting a post
function deletePostButton()
{
    //Get the index of where the post is in the array
    var index = sessionStorage.getItem("indexOfContent");

    //Tell sessionStorage that something needs to be deleted
    sessionStorage.setItem("deleteItem",index);

    //Go to the homepage (from there it will be fully deleted)
    location.href="index.html";
}

//#endregion postview

//#region post

//Gets the list of contents
function onPostStart()
{
    listOfContents = new Array();

    if (sessionStorage.getItem("listOfContents") != null)
    {
        listOfContents = JSON.parse(sessionStorage.getItem("listOfContents"));
    }
}

//Adds a new post to the list of contents
function addPostToArray(content)
{
    listOfContents.push([content]);
}

//Handles the add post button
function addPostButton()
{
    //Gets the content of the tinymce text editor
    var editorContent = tinymce.activeEditor.getContent();
    //Gets the cotent of the title input
    var titleContent = "<h1>" + document.getElementById("input_v_p_title").value + "</h1>";
    //Adds them together to create a post in the proper format
    var content = titleContent + editorContent;
    //Adds the post into the array
    addPostToArray(content);
    //Wipes the tinymce editor to be empty
    tinymce.activeEditor.setContent("");
    //Wipes the title input to be empty
    document.getElementById("input_v_p_title").value = "";
}

//#endregion post