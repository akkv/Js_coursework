'use strict';
let form = document.forms.addTaskForm;
let submit = form.submit;
let membersArea = document.querySelector('.membersArea');
let addMemberButton = document.querySelector('.addMemberButton');
import showMessage from './modules.js';

addMemberButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    let member = document.createElement('div');
    member.classList.add('col-3');

    let input = document.createElement('input');
    input.classList.add('invalid');
    input.type = 'text';
    input.name = 'member';

    addValidationHendler(3, 10, input);
    form.submit.disabled = true;

    let button = document.createElement('button');
    button.classList.add('deleteMember');
    button.innerText = 'X';
    member.append(input, button);
    membersArea.append(member);
    membersArea.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target.className === 'deleteMember') {
            evt.target.parentNode.remove();
        }
    });
});

submit.addEventListener('click', (evt) => {
    evt.preventDefault();
    let dataJSON = localStorage.getItem('tasks');
    let dataParsed = JSON.parse(dataJSON);
    let id = [0];
    dataJSON ? id.push(dataParsed[dataParsed.length - 1].id) : (id = [0]);
    id.push(id[id.length - 1] + 1);

    let task = [
        {
            title: form.title.value,
            description: form.description.value,
            date: form.date.value,
            members: Array.from(document.getElementsByName('member')).map((x) => {
                return x.value;
            }),
            id: id[id.length - 1],
        },
    ];
    if (dataJSON) {
        dataParsed.push.apply(dataParsed, task);
        localStorage.setItem('tasks', JSON.stringify(dataParsed));
    } else {
        localStorage.setItem('tasks', JSON.stringify(task));
    }
    form.reset();
    showMessage(document.querySelector('.message'), '✔ Задача добавлена ✔', 'ok');
    membersArea.innerHTML = '';
    document.querySelector('input[name="title"]').classList.add('invalid');
    document.querySelector('textarea[name="description"]').classList.add('invalid');
    form.submit.disabled = true;
});

// Validation
function addValidationHendler(min, max, elem) {
    elem.addEventListener('input', () => {
        if (elem.value.length >= min && elem.value.length <= max) {
            elem.classList.remove('invalid');
        } else {
            elem.classList.add('invalid');
        }
    });
}
addValidationHendler(5, 100, form.description);
addValidationHendler(3, 50, form.title);
function disableSubmit() {
    form.addEventListener('input', () => {
        if (document.getElementsByName('member').length) {
            let members = Array.from(document.getElementsByName('member')).every(
                (elem) => !elem.classList.contains('invalid')
            );
            if (
                members &&
                !form.title.classList.contains('invalid') &&
                !form.description.classList.contains('invalid')
            ) {
                form.submit.disabled = false;
            } else {
                form.submit.disabled = true;
            }
        } else if (
            !form.title.classList.contains('invalid') &&
            !form.description.classList.contains('invalid')
        ) {
            form.submit.disabled = false;
        } else {
            form.submit.disabled = true;
        }
    });
}
disableSubmit();
