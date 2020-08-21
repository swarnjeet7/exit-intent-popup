(function() {

    window.exitIntant = function () {
        const makePopup = () => {
            $('body').insertBefore('');
        }

        const showExitIntent = () => {
            console.log("ss");
        }

        const init = () => {
            window.addEventListener('beforeunload', function (e) {
                showExitIntent()
                // Cancel the event
                e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
                // Chrome requires returnValue to be set
                e.returnValue = '';
                return "why are you leaving?";
            });
        }

        return {
            init
        }

    }();

    //exitIntant.init();

}());