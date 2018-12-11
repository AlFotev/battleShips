
/////Object building the communication between user and app

const targetCoord = document.getElementById('coord');
const div = document.getElementById("tableHolder");
const inputHolder = document.getElementById("inputHolder");
const link = document.createElement('a');
let dbId = localStorage.getItem('id');
link.setAttribute("href", "#");
link.innerHTML = "Play again?";

const action = (() => {
    let shots = 0;
    let end = false;
    /// function checks for hits , misses  or end of game,
    /////and sending approporiate notifier, trigger show functionality
    function shoot(coordinates, hits, misses, ships) {
        let missle = targetCoord.value.toUpperCase();
        ///triggering show functionality
        if (missle === "SHOW") {
            this.show(coordinates);
            return;
        }
        let target = document.getElementById(missle);
        ///checking for hit 
        if (coordinates.indexOf(missle) != -1
            && hits.indexOf(missle) === -1
            && misses.indexOf(missle) === -1) {
            hits.push(missle)
            target.innerHTML = "X";
            ships.map((e, i) => {
                if (e.location.indexOf(missle) > -1) {
                    e.size--;
                    e.size === 0 ? Notify.sunk() : Notify.hit();
                }
            });
            ////checking for end of game (all targets has been hit)
            if (hits.length === coordinates.length) {
                this.shots = hits.length + misses.length;
                this.end = true;
            }

        }
        ////checking for missed shot and invalid input
        else if (misses.indexOf(missle) === -1 && hits.indexOf(missle) === -1) {
            if (target === null || target.id.indexOf("0") === 1 ||
               !isNaN(target.innerHTML) && target.innerHTML != '') {
                Notify.error();
            } else {
                misses.push(missle);
                target.innerHTML = "-";
                Notify.miss();
            }
        }
    }
    ////show funcionality for debug
    /// misses all td's that are coordinates 
    ///or empty ( the elements id is not among the coordinats array)
    function show(coordinates) {
        let tdCollection = document.getElementsByTagName('td');
        for (let i = 0; i < tdCollection.length; i++) {
            let currentTd = tdCollection[i];
            if (currentTd.id.indexOf("0") === 1 || !isNaN(currentTd.innerHTML)) continue;
            else if (coordinates.indexOf(currentTd.id) > -1) currentTd.innerHTML = "X";
            else currentTd.innerHTML = "";
        }
    }
    /////finishing the game
    /////clearing the db, current div elements and adding approporiate notifier
    ////also addink link wich reloads the game
    function finish() {
        requester.clearData(dbId)
            .then(success => {
                Notify.endGame(this.shots);
                div.innerHTML = '';
                inputHolder.innerHTML = '';
                div.appendChild(link);
                link.addEventListener('click', () => {
                    location.reload();
                })
            })
    }
    return {
        shoot,
        show,
        finish
    }
})()