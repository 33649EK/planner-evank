//Fires function when document is fully loaded
$(document).ready(function () {

    // Displays current date and time to the page header when page initially loads
    var dateTime = dayjs().format("MMM D, YYYY [at] hh:mm a");
    $("#currentDay").text(dateTime);

    //Saves text content and id of each time block to local storage
    $('.saveBtn').click(function () {
        // Fetches the text content of the target time block
        var textContent = $(this).siblings().eq(1).val();
        console.log(textContent);
        // Fetches the id of the target time block
        var blockId = $(this).parent('.time-block').attr('id');
        console.log(blockId)
        // Sets the text content to storage using the id as a key
        localStorage.setItem(blockId, textContent);
    });

    // Fetches the current hour of the day for the purpose of comparing it against
    // time block id
    var timeOfDay = dayjs().format('[hour-]HH')
    console.log('Current hour: ' + timeOfDay)

    //Compares the current hour of the day to each planner div and applies a class to each
    $('.time-block').each(function () {
        // Fetches time block id
        var domTimeBlock = $(this).attr('id');
        console.log(domTimeBlock);

        // Determines what class to add to each block
        if (timeOfDay === domTimeBlock) {
            $(this).addClass('present');
        } else if (timeOfDay > domTimeBlock) {
            $(this).addClass('past');
        } else {
            $(this).addClass('future');
        }
    })

    //Prints local storage
    $('.description').each(function () {
        // Fetches time block id
        var blockId = $(this).parent('.time-block').attr('id');
        // Fetches stored text content based on the blockId key
        var storedText = localStorage.getItem(blockId);
        console.log(storedText);
        // If this time block has stored text, print that data to the time block
        if (storedText) {
            $(this).text(storedText);
        } else {
            $(this).text('');
        }
    })

    $('.deleteBtn').click(function () {
        localStorage.clear()
        location.reload()
    })
});
