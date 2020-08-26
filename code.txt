(function() {

    window.promotionPopup = function () {
        let promotionCookie = 'isPromotionViewed', mobileAutoPopup;

        const makePopup = (className) => {
            $('body').append(`
                <style>
                    .modal-active {
                        min-height: 100%;
                        overflow: hidden;
                    }
                    .modal {    
                        display: none; 
                        box-sizing: border-box; 
                        background: #4c4c4c; 
                        padding: 50px 20px; 
                        position: fixed;
                        top: 0;
                        left:0; 
                        width: 100%; 
                        height: 100%; 
                        font-family: sans-serif;
                        z-index: 9999999999;
                    }
                    .modal.active {
                        display: block
                    }
                    .modal * {
                        box-sizing: border-box;
                    }
                    .modal-wrapper {
                        max-width: 96%;
                        width: 100%;
                        margin: auto;
                        display: flex;
                        background: #ffd101;
                        padding: 40px 20px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .text-center {
                        text-align: center;
                    }
                    .modal-wrapper .btn-close {
                        position: absolute;
                        background: none;
                        border: none;
                        color: #030000;
                        font-size: 40px;
                        line-height: 30px;
                        padding: 5px 10px;
                        right: 0;
                        top: 0;
                        opacity: .8;
                        outline: none;
                    }
                    .modal-wrapper .btn-close:hover {
                        opacity: 1;
                    }
                    .input-group {
                        margin: 0 0 12px;
                    }
                    .input-group .form-input {
                        background: #FFF;
                        width: 100%;
                        padding: 25px 28px;
                        border: none;
                        outline: none;
                    }
                    .modal-wrapper__form h3 {
                        font-size: 4vw;
                        margin: 0 0 3px;
                        text-align: center;
                    }
                    .modal-wrapper__form p {
                        margin: 0 0 20px;
                        font-size: 4vw;
                        text-align: center;
                    }
                    .modal-wrapper__form .newsletter-box {
                        display: block;
                        font-size: 3vw;
                        margin: 0 0 35px;
                    }
                    .modal-wrapper__form .newsletter-box input {
                        margin-left: 0;
                    }
                    .modal-wrapper__form .btn-submit {
                        width: 100%;
                        border: none;
                        display: block;
                        background: black;
                        color: #FFF;
                        padding: 28px 15px;
                        margin: 0 0 20px;
                    }
                    .modal-wrapper__form .btn-link {
                        font-size: 10px;
                        color: black;
                    }
                    .modal_warpper__img {
                        padding: 0px 0px 20px 40px;
                        display: none;
                    }
                    .modal-wrapper__form {
                        width: 100%;
                    }
                    @media screen and (min-width: 992px) {
                        .modal {
                            padding: 50px;
                        }
                        .modal_warpper__img {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center
                        }
                        .modal-wrapper__form {
                            max-width: 500px;
                        }
                        .modal-wrapper {
                            max-width: 970px;
                            padding: 70px 25px 40px 60px;
                        }
                        .modal-wrapper__form h3 {
                            font-size: 25px;
                        }
                        .modal-wrapper__form p {
                            font-size: 25px;
                        }
                        .modal-wrapper__form .newsletter-box {
                            font-size: 16px;
                            margin: 0 0 20px;
                        }
                        .modal-wrapper__form .btn-submit {
                            margin: 0 0 5px;
                        }
                        .modal_warpper__img img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            background: #eac002;
                        }
                    }
                    @media screen and (orientation:landscape) and (max-width: 767px) {
                        .modal.active {
                            overflow: auto;
                        }
                        .modal-wrapper {
                            position: static;
                            transform: translate(0, 0);
                        }
                    }
                </style>
                <div class="modal" id="modalWindow">
                    <div class="modal-wrapper">
                        <button type="button" class="btn-close" id="closeModal">&times;</button>
                        <div class="modal-wrapper__form">
                            <h3>GET $10 OFF WHEN YOU SIGN UP FOR</h3>
                            <p>SAVINGS, NEWS, UPDATES AND MORE</p>
                            <form method="post" onsubmit="return false;" novalidate>
                                <div class="input-group">
                                    <input type="text" name="username" class="form-input" placeholder="your name" required>
                                </div>
                                <div class="input-group">
                                    <input type="email" name="email" class="form-input" placeholder="email address" required>
                                </div>
                                <label class="newsletter-box">
                                    <input type="checkbox" value="1">
                                    Check this box to recieve monthly newsletter.
                                </label>
                                <button type="submit" class="btn-submit" id="submitForm">SIGN UP</button>
                                <div class="text-center">
                                    <a href="javascript:void(0)" class="btn-link">PRIVACY POLICY</a>
                                </div>
                            </form>
                        </div>
                        ${(!isMobile()) ? '<div class="modal_warpper__img"><img src="/sale.jpg" alt="Save up to 50%" /></div>' : ''}
                    </div>
                </div>`);
        }

        const close = () => {
            const modal = document.getElementById('modalWindow');
            if(modal) {
                modal.classList.remove('active');
                if(!isMobile) {
                    setCookie(promotionCookie, true);
                }
            }
            document.body.classList.remove('modal-active');
        }

        const validateEmail = (mail) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            return (false)
        }

        const formValidate = inputs => {
            const length = inputs.length;
            let inputsValid = true;
            for (let i = 0; i < length; i++) {
                const input = inputs[i];
                const isRequired = input.hasAttribute('required');
                const isEmpty = input.value.length ? false : true;
                const inputType = input.getAttribute('name');
                if(isRequired && isEmpty) {
                    alert(inputType + " is required");
                    input.focus();
                    inputsValid = false;
                    break;
                }
                if(inputType === 'username' && input.value.match(/[0-9]+/g)) {
                    alert("Numbers is not allowed in username");
                    input.focus();
                    inputsValid = false;
                    break;
                }
                if(inputType === 'email' && !validateEmail(input.value)) {
                    alert("You have entered an invalid email address!")
                    input.focus();
                    inputsValid = false;
                    break;
                }
            }
            return inputsValid;
        }

        const formSubmit = () => {
            const inputs = document.querySelectorAll('input.form-input');
            if(formValidate(inputs)) {
                if(isMobile) {
                    clearInterval(mobileAutoPopup);
                    setCookie(promotionCookie, true);
                }
                close();
            }
        }

        const setCookie = (cname, cvalue, exdays = 100) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        const getCookie = cname => {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        const bindEvents = () => {
            const closeBtn = document.getElementById('closeModal')
            if(closeBtn) {
                closeBtn.addEventListener('click', close)
            }
            const submitBtn = document.getElementById('submitForm');
            if(submitBtn) {
                submitBtn.addEventListener('click', formSubmit)
            }
        }

        const isMobile = () => {
            return (/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
        }
        
        const show = () => {
            const popup = document.getElementById('modalWindow');
            document.body.classList.add('modal-active');
            if(popup) {
                popup.classList.add('active')    
            } else {
                makePopup();
                document.getElementById('modalWindow').classList.add('active')
            }
            bindEvents();
        }
        
        const init = () => {
            if(!getCookie(promotionCookie)) {
                if(isMobile()) {
                    mobileAutoPopup = setInterval(function (argument) {
                        show()
                    }, 5000)
                } else {
                    window.addEventListener('beforeunload', function (e) {
                        show()
                        e.preventDefault();
                        e.returnValue = "why are you leaving?";
                    });
                }
            }
        }

        return {
            init,
            show,
            close
        }
    }();

    promotionPopup.init();

}());