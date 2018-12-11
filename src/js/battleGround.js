/// Class representing the gameplay field holding it's basic functionality
/// and data like ships, coordinates,hits,misses progress of game

const Notify = new notifier.Notifier();
const field = (() => {
    class BattleGround {
        constructor(width, height, battleShips, destroyers) {
            this.width = width;
            this.height = height;
            this.battleShips = battleShips;
            this.destroyers = destroyers;
            this.ships = [];
            this.crosses = false;
            this.shipsCoordinates = [];
            this.hittedCoordinates = [];
            this.missedCoordinates = [];
        }
        gameInProgress() {
            Notify.loading();
            return requester.getCoordinates()
        }
        createField(data) {

            const table = document.createElement('table');
            const tb = document.createElement('tbody');
            const input = document.createElement('input');
            const tableDiv = document.getElementById("tableHolder");

            ////filling the local data with current game progress on reloading the page

            if (data.hits) this.hittedCoordinates = this.hittedCoordinates.concat(data.hits);
            if (data.ships) this.ships = this.ships.concat(data.ships);
            if (data.misses) this.missedCoordinates = this.missedCoordinates.concat(data.misses);

            //// building the field, creating approporiate id attribute for td elements
            /// so they could be targeted easier

            for (let i = 0; i <= this.height; i++) {
                const tr = document.createElement('tr');
                tb.appendChild(tr);
                for (let j = 0; j <= this.width; j++) {

                    const td = document.createElement('td');
                    td.id = (i + 9).toString(36).toUpperCase() + j;
                    let tdId = td.id;
                    tb.appendChild(td);

                    if (i === 0 && j != 0) td.innerHTML = j;
                    else if (i != 0 && j === 0) td.innerHTML = (i + 9).toString(36).toUpperCase();
                    else if (i != 0 && j != 0
                        && this.hittedCoordinates.indexOf(tdId) === -1
                        && this.missedCoordinates.indexOf(tdId) === -1) {
                        td.innerHTML = ".";
                    }
                    else if (i != 0 && j != 0
                        && this.hittedCoordinates.indexOf(tdId) > -1) {
                        td.innerHTML = "X";
                    }
                    else if (i != 0 && j != 0
                        && this.missedCoordinates.indexOf(tdId) > -1) {
                        td.innerHTML = "-";
                    }
                }
            }
            table.appendChild(tb);
            tableDiv.appendChild(table);
        }

        ////creating as many ships as were specified in the class
        createShips(battleShipSize, destroyerSize) {
            for (let i = 0; i < this.battleShips; i++) {
                const BattleShip = new shipClass.Ship(battleShipSize);
                this.ships.push(BattleShip);
            }
            for (let i = 0; i < this.destroyers; i++) {
                const Destroyer = new shipClass.Ship(destroyerSize);
                this.ships.push(Destroyer);
            }
        }
        createCoordinates() {
            let row = this.generateRandomRow();
            let col = this.generateRandomCol();
            let rowIndex = row.charCodeAt(0);
            let startPoint = row + col;
            let tempCoord = [];

            for (let i = 0; i < this.ships.length; i++) {
                const currentShip = this.ships[i];

                ///////generating starting point for each ship and
                /////// new starting point for duplicate coordinates
                while (this.shipsCoordinates.indexOf(startPoint) != -1 || this.crosses) {
                    row = this.generateRandomRow();
                    col = this.generateRandomCol();
                    rowIndex = row.charCodeAt(0);
                    startPoint = row + col;
                    this.crosses = false;
                }
                ///////place ship right from starting point
                if (this.width - col >= currentShip.size) {
                    for (let j = col; j < currentShip.size + col; j++) {
                        tempCoord.push(row + j)
                    }
                    this.crossingShips(tempCoord, currentShip);

                }
                ///////place ship up  from starting point
                else if (rowIndex - currentShip.size >= 65) {
                    for (let l = rowIndex; l > rowIndex - currentShip.size; l--) {
                        tempCoord.push(String.fromCharCode(l) + col);
                    }
                    this.crossingShips(tempCoord, currentShip);
                }
                ///////place ship left  from starting point
                else if (col >= currentShip.size) {
                    for (let k = col; k > col - currentShip.size; k--) {
                        tempCoord.push(row + k);
                    }
                    this.crossingShips(tempCoord, currentShip);
                }
                ///////place ship down  from starting point
                else if (rowIndex + currentShip.size <= 65 + this.height) {
                    for (let m = rowIndex; m < rowIndex - currentShip.size; m--) {
                        tempCoord.push(String.fromCharCode(m) + col);
                    }
                    this.crossingShips(tempCoord, currentShip);
                }
                //////going back in loop because of crossing ships
                if (this.crosses) {
                    i--;
                }
            }
            return { coord: this.shipsCoordinates, ships: this.ships }
        }
        generateRandomCol() {
            return Math.ceil(Math.random() * this.width);
        }
        generateRandomRow() {
            return Math.ceil(Math.random() * this.height + 9).toString(36).toUpperCase();
        }
        /////// check if ship coordinates duplicate
        crossingShips(arr, ship) {
            arr.map(e => {
                if (this.shipsCoordinates.indexOf(e) != -1) {
                    this.crosses = true;
                }
            })
            if (!this.crosses) {
                ship.location = ship.location.concat(arr);
                this.shipsCoordinates = this.shipsCoordinates.concat(arr);
                arr.length = 0;
            } else {
                arr.length = 0;
            }
        }

    }
    return{
        BattleGround
    }

})()
