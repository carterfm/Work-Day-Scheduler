//We'll store the text content of our textareas in this object
//The keys will be the ids of the textareas, and their values will be, well, their values
var agenda = {}


function initialize() {
    var storedAgenda = JSON.parse(localStorage.getItem("agenda"));

    //Setting text of "current day" lead in header appropriately
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    
    if (storedAgenda !== null){
        agenda = storedAgenda;
    }
    
    


    //TODO: insert stuff about color-coding spreadsheet
}

function storeAgenda(){
    localStorage.setItem("agenda", JSON.stringify(agenda));
}

initialize();
//$('#test-textarea').val('bepis');