
const hitButton = document.getElementById('hit');
const input = document.getElementById('coord');

////// Creating the playground with required params - size and battleships

const Field = new field.BattleGround(10, 10, 1, 2);


/////// Checking is there a game in progress , so that the data 
//////// doesn't dissapear on page refresh, then render according to the database
//////// keeping the id of database in the locale storage of the browser
//////// if is a new game, the page will be clean as baby

Field.gameInProgress()
    .then(response => {
        let data = response.data;
        if (data.length > 0) {

            //////rendering the page according to the current progress of game
            let allCoordinates = data[0];
            dbId = allCoordinates._id;
            localStorage.setItem('id', allCoordinates._id)
            Field.createField(allCoordinates)
            Field.shipsCoordinates = data[0].coordinates;
            if (allCoordinates.hits) Field.hittedCoordinates = allCoordinates.hits;
            if (allCoordinates.misses) Field.missedCoordinates = allCoordinates.misses;
            if (allCoordinates.ships) Field.ships = allCoordinates.ships;
            Notify.welcome();
        } else {

            /////creating brand new game
            Field.createShips(5, 4);
            requester.postCoordinates(Field.createCoordinates())
                .then(response => {
                    let data = response.data;
                    dbId = data._id;
                    localStorage.setItem('id', data._id)
                    Field.createField(data);
                    Notify.welcome();
                }).catch(err => {
                    Notify.error();
                })
        }
    });

///////////////////  user action

////adding click and enter press functionality
hitButton.onclick = () => {
    hit()
}
input.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) hitButton.click();
});

///// function checks if there is accurate shot,then updates the coordinates that were missed or hit
///// also checks is the game over
function hit() {
    action.shoot(Field.shipsCoordinates, Field.hittedCoordinates, Field.missedCoordinates, Field.ships)
    if (!action.end) {
        requester.updateCoordinates(dbId, Field.shipsCoordinates, Field.hittedCoordinates, Field.missedCoordinates, Field.ships)
    } else {
        action.finish();
    }
    input.value = '';
}