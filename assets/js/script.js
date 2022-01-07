var timeBlocks = $(".time-block");
var textAreas = timeBlocks.children("textarea");
var currentHour = parseInt(moment().format("HH"));

//We'll use this object to change the background color of our textareas depending
//on whether they're before, after, or equal to currentHour
var hours = {
    "8-am-text": 8,
    "9-am-text": 9,
    "10-am-text": 10,
    "11-am-text": 11,
    "12-pm-text": 12,
    "1-pm-text": 13,
    "2-pm-text": 14,
    "3-pm-text": 15,
    "4-pm-text": 16,
    "5-pm-text": 17,
    "6-pm-text": 18
};
//We'll store the text content of our textareas in this object
//The keys will be the ids of the textareas, and the values will be, well, their values
var agenda = {};


function initialize() {
    var storedAgenda = JSON.parse(localStorage.getItem("agenda"));

    //Setting text of "current day" lead in header appropriately
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    
    //Updating agenda with data from localStorage
    if(storedAgenda !== null) {
        agenda = storedAgenda;
    }
    
    //Looping through all of the text areas on the page and setting their values based on what we have
    //in our agenda object, as well as setting their background colors
    $.each(textAreas, function() {
        //Setting value of textareas based on contents of agenda object
        var areaId = $(this).attr("id");
        if(agenda[areaId] !== null) {
            $(this).val(agenda[areaId])
        }

        //Setting colors of textareas based on current hour
        if(hours[areaId] < currentHour){
            $(this).addClass("past");
        } else if(hours[areaId] === currentHour){
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    });
}

function storeAgenda(){
    localStorage.setItem("agenda", JSON.stringify(agenda));
}

function saveNewAgendaItem(event){
    var element = $(event.target);
    var timeBlockEl = element.parent();
    //This if is necessary because the user might click on the floppy disc emoji contained within a p tag
    //in the saveBtn div. In that case, we need to iterate up one parent further to get to the time-block
    //row and have access to the textarea whose value we want to access and store to localStorage
    if(!timeBlockEl.hasClass("time-block")){
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
//Check interval every minute