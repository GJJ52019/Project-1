//cached items 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const $state = $('#state');
const $billTitle = $('#bill-title');
const $billNumber = $('#bill-number');
const $lastActionDate = $('#last-action-date');
const $lastAction = $('#last-action');
const $billText = $('#bill-text');
const $querySearched = $('#query-searched')
const $input = $('input[type="text"]');
let $stateID = "";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
    $querySearched.text(userInput);



    $.ajax({
        url: 'https://api.legiscan.com/?key=064d811d52b70be6cd88415100845f4f&op=search&state='+ $stateID +'&query=' + userInput
        //'https://www.omdbapi.com/?apikey=1ab46e65&t=' + userInput

    }).then(
        (data) => {
            render(data);
        },
        (error) => {
            alert("Oops something went wrong: ", error)
        }
    );

    // $.ajax({
    //     url: 'https://api.legiscan.com/?key=064d811d52b70be6cd88415100845f4f&op=getBillText&id=2417056'

    //     }).then(
    //     (data2) => {
    //         console.log(data2);
    //         render2(data2);
    //     },
    //     (error) => {
    //         console.log("Oops something went wrong: ", error)
    //     }
    // );
}

function render(data) {

    $state.text('State: ' + data.searchresult[0].state);
    $billTitle.text('Bill Title: ' + data.searchresult[0].title);
    $billNumber.text('Bill Number: ' + data.searchresult[0].bill_number);
    $lastActionDate.text('Date of Last Action: ' + data.searchresult[0].last_action_date);
    $lastAction.text('Last Action Taken: ' + data.searchresult[0].last_action);
    $billText.html(`Bill Text URL: <a href="${data.searchresult[0].text_url}" target="_blank">${data.searchresult[0].text_url}</a>`);

}

// function render2(data2){
//     $billText.text(data2.text.doc)
// }


//targets form in html and on submit runs handleGetData
//** on submit allows the user to just press enter *********************************************/
$('form').on('submit', handleGetData);