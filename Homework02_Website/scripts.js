var listOfPosts;
var listOfTitles;
var hasAddedPosts = false;

function loadPresetTitles()
{
    listOfTitles = new Array("Test1","Test2");
    listOfPosts = new Array("This is the first test","This is a sequel to test1");

    for (var i = 0; i < listOfPosts.length; i++)
    {
        addPostToTable(listOfTitles[i],listOfPosts[i]);
    }
    
}

function addPostToTable(title, post)
{
    //Get the table
    var table = document.getElementById("table_v_u_postList");

    if (hasAddedPosts)
    {
        var numRows = table.rows.length;
        var numCols = table.rows[0].cells.length - 1;
        var row;
        var cell;
    }
    else
    {
        var numRows = 0;
        var numCols = 0;
        var row;
        var cell;
    }


    var header = document.createElement("h1");
    header.innerText = title;

    var paragraph = document.createElement("p");
    paragraph.innerText = post;

    row = table.insertRow(numRows);
    cell = row.insertCell(numCols);

    cell.appendChild(header);
    cell.appendChild(paragraph);
}

function loadAllTitles()
{
    var table = document.getElementById("table_v_u_postList");
    table.innerHTML = '';
    loadPresetTitles();
}

function openHomeTab()
{
    
}

function scream()
{
    console.log("AAAAAAH button pressed :)");
}