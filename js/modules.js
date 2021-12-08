'use strict';
function showMessage(element, message, status) {
    element.innerText = message;
    element.classList.add(`message-${status}`);
    setTimeout(() => {
        element.classList.remove(`message-${status}`);
    }, 3000);
}
export default showMessage;
