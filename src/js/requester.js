
////requester object, building the communication between db and app
/// holding specific data for Kinvey REST service

const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_rkJtfnlAQ";
const kinveyAppSecret = "4add60c969c0472c96de2d3d16e5e1ab";
const baseUrl = kinveyBaseUrl + `appdata/${kinveyAppKey}/coordinates`;
const headers = {
    "Authorization": 'Basic ' + btoa("Sasheca" + ':' + "123456"),
    "Content-type": "application/json"
};

let requester = (() => {
    /////post the initial coordinates
    function postCoordinates(shipsData) {
        return axios({
            method: 'POST',
            url: baseUrl,
            headers,
            data: {
                coordinates: shipsData.coord,
                ships: shipsData.ships
            }
        });
    }
    ////updating coordinats according to game progress
    function updateCoordinates(id, shipsCoord, hitsCoord, missedCoord, shipsState) {
        return axios({
            method: 'PUT',
            url: baseUrl + `/${id}`,
            headers,
            data: {
                coordinates: shipsCoord,
                hits: hitsCoord,
                misses: missedCoord,
                ships: shipsState
            }
        });
    }
    ///retreive coordinats from db
    function getCoordinates() {
        return axios({
            method: 'GET',
            url: baseUrl,
            headers
        });
    }
    /////deleting all data in db
    function clearData(id) {
        return axios({
            method: 'DELETE',
            url: `${baseUrl}/${id}`,
            headers
        });
    }

    return {
        postCoordinates,
        updateCoordinates,
        getCoordinates,
        clearData
    }

})();