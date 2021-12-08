'use strict';
let data = JSON.parse(localStorage.getItem('tasks'));
let tasksArea = document.querySelector('.taskListArea');
let idForDelete = [];
import showMessage from './modules.js';

function tasksRend(data) {
    if (data) {
        data.forEach((elem) => {
            let task = document.createElement('div');
            task.classList.add('task');
            task.dataset.id = elem.id;
            task.innerHTML = `
                    <h3>${elem.title}</h3>
                    <p>${elem.description}</p>
                    <span>Выполнить к:</span>
                    <span class="bold">${elem.date}</span><br>
                    `;

            task.addEventListener('click', () => {
                if (task.classList.contains('activeTask')) {
                    idForDelete.splice(idForDelete.indexOf(elem.id), 1);
                    task.classList.remove('activeTask');
                } else {
                    task.classList.add('activeTask');
                    idForDelete.push(elem.id);
                }
            });

            if (elem.members.length) {
                let membersTitle = document.createElement('span');
                membersTitle.innerText = 'Участники: ';
                let members = document.createElement('span');
                members.classList.add('bold');
                elem.members.forEach((elem) => {
                    members.innerText += `${elem} `;
                });
                task.append(membersTitle, members);
            }
            tasksArea.append(task);
        });
    } else {
        document.createElement('h3').innerText = 'У вас еще нет задач';
        tasksArea.append(msg);
    }
}
tasksRend(data);

let deleteButton = document.querySelector('.deleteButton');
let tasks = document.querySelectorAll('.task');
deleteButton.addEventListener('click', () => {
    tasks.forEach((elem) => {
        idForDelete.forEach((id) => {
            if (+elem.dataset.id === id) {
                elem.remove();
            }
        });
    });
    data = data.filter((elem) => {
        let n = true;
        idForDelete.forEach((id) => {
            if (elem.id === id) {
                n = false;
            }
        });
        return n;
    });

    if (data.length === 0) {
        localStorage.clear();
    } else {
        localStorage.setItem('tasks', JSON.stringify(data));
    }
    showMessage(document.querySelector('.message'), '✔ Удалено ✔', 'ok');
});
