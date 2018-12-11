///class for user notification
let notifier = (()=>{
    class Notifier{
        constructor(){
            this.p = document.getElementById('notification');
            this.messageSunk = '*** Sunk ***';
            this.messageHit = '*** Hit ***';
            this.messageMiss = '*** Miss ***';
            this.messageWelcome = '*** Welcome Gamer ***';
            this.messageError = '*** Something went wrong ***';
            this.messageLoading = "*** Just hiding the ships ;) ***";
    
        }
        welcome(){
            this.p.innerHTML = this.messageWelcome;
        }
        loading(){
            this.p.innerHTML = this.messageLoading;
        }
        sunk(){
            this.p.innerHTML = this.messageSunk;
        }
        hit(){
            this.p.innerHTML = this.messageHit;
        }
        miss(){
            this.p.innerHTML = this.messageMiss;
        }
        error(){
            this.p.innerHTML = this.messageError;
        }
        endGame(shots){
            this.p.innerHTML = `Well done! You completed the game in ${shots} shots`;
        }
    }

return{
    Notifier
}

})();