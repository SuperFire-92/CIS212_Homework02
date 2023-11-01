var listOfPosts;
var listOfTitles;
var listOfContents;
var hasAddedPosts = false;
var numOfPosts = 0;

//#region index

function onIndexStart()
{
    listOfContents = new Array();
    loadPresetTitles();

    if (sessionStorage.getItem("listOfContents") != null)
    {
        listOfContents = JSON.parse(sessionStorage.getItem("listOfContents"));

        for (var i = 0; i < listOfContents.length; i++)
        {
            addFullPostToTable(listOfContents[i]);
        }
    }
    
}

//Loads all titles
function loadPresetTitles()
{
    //Add them to the arrays
    listOfTitles = new Array("Test1","Test2");
    listOfPosts = new Array("This is the first test","This is a sequel to test1");

    //Place the table into the column
    var col = document.getElementById("col_v_u_posts");

    var table = document.createElement("table")
    table.setAttribute("id","table_v_u_postList");

    col.append(table);

    //Add them both
    for (var i = 0; i < listOfPosts.length; i++)
    {
        addPostToTable(listOfTitles[i],listOfPosts[i]);
    }
    //Also add all posts from listOfContents
    for (var i = 0; i < listOfContents.length; i++)
    {
        addFullPostToTable(listOfContents[i]);
    }
}

//For loading the two premade posts
function addPostToTable(title, post)
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

    //Create the header
    var header = document.createElement("h1");
    header.innerText = title;

    //Create the paragraph
    var paragraph = document.createElement("p");
    paragraph.innerText = post;

    //Make the row and cell
    row = table.insertRow(numRows);
    row.setAttribute("onclick","postClick(" + numOfPosts + ")")
    cell = row.insertCell(numCols);

    //Insert the header and paragraph into the cell
    cell.appendChild(header);
    cell.appendChild(paragraph);

    //Tell future runs that there are posts
    hasAddedPosts = true;
    numOfPosts++;
}

//For loading the posts made by the user
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

//Loads every title
function loadAllTitles()
{
    //Load the preset titles
    loadPresetTitles();
}

//Used for the home button
function homeButton()
{
    sessionStorage.setItem("listOfContents", JSON.stringify(listOfContents));

    location.href="index.html";
}

//Used for the post button (for navigating the screen)
function postButton()
{
    sessionStorage.setItem("listOfContents", JSON.stringify(listOfContents));

    location.href="post.html";
}

//Used for pressing on a post
function postClick(num)
{
    console.log("Post " + num + " Clicked!");
}

//#endregion

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
    var editorContent = tinymce.activeEditor.getContent();
    addPostToArray(editorContent);
    tinymce.activeEditor.setContent("");
}

//#endregion post