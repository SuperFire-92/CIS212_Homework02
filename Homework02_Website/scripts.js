var listOfPosts;
var listOfTitles;
var listOfContents;
var hasAddedPosts = false;

function onStart()
{
    listOfContents = new Array();
    loadPresetTitles();

    
}

//Load the two preset posts
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
    
    for (var i = 0; i < listOfContents.length; i++)
    {
        addFullPostToTable(listOfContents[i]);
    }
}

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
    cell = row.insertCell(numCols);

    //Insert the header and paragraph into the cell
    cell.appendChild(header);
    cell.appendChild(paragraph);

    //Tell future runs that there are posts
    hasAddedPosts = true;
}

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
    cell = row.insertCell(numCols);

    //Insert the content into the cell
    cell.innerHTML = content;

    //Tell future runs that there are posts
    hasAddedPosts = true;
}

function addPostToArray(content)
{
    listOfContents.push([content]);
}

function loadAllTitles()
{
    //Wipe the current table
    wipeTable();

    //Load the preset titles
    loadPresetTitles();
}

function loadPost()
{
    //Wipe the current table
    wipeTable();

    //Load the post section
    var col = document.getElementById("col_v_u_posts");

    var post = document.createElement("form");
    post.setAttribute("method","post");

    var textBox = document.createElement("textarea");
    textBox.setAttribute("class","mytextarea");
    textBox.setAttribute("id","mytextarea");

    post.append(textBox);
    col.append(post);

    tinymce.init({
        selector: '.mytextarea',
        plugins: [
          'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
          'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
          'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
        ],
        toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
      });

    var button = document.createElement("button");
    button.setAttribute("onclick","addPostButton()");
    button.innerText = "Post";

    var lineBreak = document.createElement("br");

    col.append(lineBreak);
    col.append(button);
}

function wipeTable()
{
    var col = document.getElementById("col_v_u_posts");
    col.innerHTML = "";
    hasAddedPosts = false;

    if (document.getElementsByClassName("tox tox-silver-sink tox-tinymce-aux")[0] != null)
    {
        const element = document.getElementsByClassName("tox tox-silver-sink tox-tinymce-aux");
        element[0].remove();
    }
}

function addPostButton()
{
    var editorContent = tinymce.get("mytextarea").getContent();
    addPostToArray(editorContent);
}
