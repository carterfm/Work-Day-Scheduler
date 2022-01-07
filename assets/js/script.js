var timeBlocks = $(".time-block");
var textAreas = timeBlocks.children("textarea");
//We'll store the text content of our textareas in this object
//The keys will be the ids of the textareas, and their values will be, well, their values
var agenda = {}


function initialize() {
    var storedAgenda = JSON.parse(localStorage.getItem("agenda"));

    //Setting text of "current day" lead in header appropriately
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    
    if(storedAgenda !== null) {
        agenda = storedAgenda;
    }
    
    //Looping through all of the text areas on the page and setting their values based on what we have
    //in our agenda object
    $.each(textAreas, function() {
        if(agenda[$(this).attr("id")] !== null) {
            $(this).val(agenda[$(this).attr("id")])
        }
    })
    //TODO: insert stuff about color-coding spreadsheet
}

function storeAgenda(){
    localStorage.setItem("agenda", JSON.stringify(agenda));
}

//TODO: How might we do this if we want the user to be able to click this """button"""
//By clicking anywhere in the .saveBtn tag? Just throw in if statements to handle that?
//Because this is some LOW-BROW STUFF that I'm doing right now
function saveNewAgendaItem(event){
    var element = $(event.target);
    var timeBlockEl = element.parent();
    //THE INNER MACHINATIONS OF MY MIND ARE AN ENIGMA
    while(!timeBlockEl.hasClass("time-block")){
        timeBlockEl = timeBlockEl.parent();
    }
    var textAreaEl = timeBlockEl.children("textarea");

    agenda[textAreaEl.attr("id")] = textAreaEl.val().trim();
    storeAgenda();
}

//Adding event listeners to listen for a click on every save button on the page
$.each(timeBlocks, function(){
    $(this).on("click", ".saveBtn", saveNewAgendaItem);
})

initialize();
