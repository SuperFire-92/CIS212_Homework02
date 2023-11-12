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
        listOfContents.push(
            "<h1>Spider Soup</h1><h2>Spider, 11/10/2023</h2><p>Making spider soup is shockingly easy. It requires ingredients that any spider should have. All you need are two flies, a mosquito, some maggots, and web fluid. Stir al of these into a bowl, and let it cook on low for 20 minutes. Then it's all ready to eat!</p>",
            "<h1>Lion Burgers</h1><h2>Lion, 11/10/2023</h2><p>Are you a lion that needs to make sure his pride is content with his cooking? Well look no further! Today I have a recipe that will blow away all of your mates and cubs. First you'll need to catch an antelope. You can find these out in the wild, or feel free to steal a carcass you find lying around too. You'll cut up the meat into circular shapes, weighing about half a pound each. Grill them, and sprinkle our patented Lion Seasoning onto them (further instruction stored on the product). Place on a bun, with lettuce, tomato, and mayo, and serve.</p>",
            "<h1>Not Chicken Nuggets</h1><h2>Chicken, 11/11/2023</h2><p>Looking for a chicken nugget alternative that doesn't require cannibalism? We've got you covered with these not chicken nuggets! First collect scraps of seeds, plants, and other food you happen to have lying around, along with some bread crumbs. Next, mix this combination with water. Now your gonna crate small patties out of these, and cover them in the bread crumbs. Now you're going to fry them for about 5 minutes each. Now you have some delicious chicken nuggets to enjoy! Thanks for reading!<p>");
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

    //Setting these values to 0 ensures new posts appear at the top of the page.
    var numRows = 0;
    var numCols = 0;
    var row;
    var cell;

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
    //Gets the content of the title input
    var titleContent = "<h1>" + document.getElementById("input_v_p_title").value + "</h1>";
    //Gets the content of the category input
    var categoryContent = "<h3>" + document.getElementById("input_v_p_category").value + ", ";
    //Set up the date
    const date = new Date(Date.now());
    var dateContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "</h3>";
    //Ensure there is something in the title and editor
    if (editorContent != "" && titleContent != "<h1></h1>" && categoryContent != "<h3>, ")
    {
        //Adds them together to create a post in the proper format
        var content = titleContent + categoryContent + dateContent + editorContent;
        //Adds the post into the array
        addPostToArray(content);
        //Wipes the tinymce editor to be empty
        tinymce.activeEditor.setContent("");
        //Wipes the title input to be empty
        document.getElementById("input_v_p_title").value = "";
        document.getElementById("input_v_p_category").value = "";
    }
}

//#endregion post