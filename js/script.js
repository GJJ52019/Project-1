//cached items 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const $querySearched = $('#query-searched')
let $input = $('input[type="text"]');
let $stateID = "";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//handles the information in the selection box
const select = document.getElementById('edit-state-id')
select.addEventListener('change', function () {
    let index = select.options[select.selectedIndex].value;
  $stateID = index;
})

function handleGetData(event) {
    // prevents the page from reloading on default
    event.preventDefault();

    //getting the user input
    userInput = $input.val();
    $querySearched.text("Recent Bills Regarding " + userInput);

    //gets the ajax and if good criteria then pulls the data requested from the render function
    $.ajax({
        url: 'https://api.legiscan.com/?key=064d811d52b70be6cd88415100845f4f&op=search&state='+ $stateID +'&query=' + userInput
    }).then(
        (data) => {
            render(data);
        },
        (error) => {
            alert("Oops something went wrong: ", error)
        }
    );

}

//grabs the information to display from cached items
function render(data) {
    $("#tbody").empty();
    for(let i =0; i<10;i++){
        const template =`
        <tr>
            <td><strong>State: </strong>${data.searchresult[i].state}</td>
            <td><strong>Bill Title: </strong>${data.searchresult[i].title}</td>
            <td><strong>Bill Number: </strong>${data.searchresult[i].bill_number}</td>
            <td><strong>Date of Last Action: </strong>${data.searchresult[i].last_action_date}</td>
            <td><strong>Last Action Taken: </strong>${data.searchresult[i].last_action}</td>
            <td><strong>Bill Text URL: </strong><a href="${data.searchresult[i].text_url}" target="_blank">${data.searchresult[i].text_url}</a></td>
        </tr>
    `
    //appened the info
    $('tbody').append(template);
    };

        //clears the input search area
   $('#input-area').val('')
}

//targets form in html and on submit runs handleGetData
//** on submit allows the user to just press enter *********************************************/
$('form').on('submit', handleGetData);