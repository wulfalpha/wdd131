document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navLinks = document.querySelector('#nav-links');

    hamButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Date and Time Update
    const now = new Date();
    document.getElementById('current-date-time').textContent = now.toLocaleString();
    document.querySelector("[data-modified-date]").textContent = document.lastModified;

    // Example Code for Chapter List Management (if applicable)
    const input = document.querySelector('#favchap');
    const button = document.querySelector('#submit');
    const list = document.querySelector('#list');
    let chaptersArray = getChapterList() || [];

    chaptersArray.forEach(chapter => {
        displayList(chapter);
    });

    button.addEventListener('click', () => {
        if (input.value !== '') {
            displayList(input.value);
            chaptersArray.push(input.value);
            setChapterList();
            input.value = '';
            input.focus();
        }
    });

    function displayList(item) {
        let li = document.createElement('li');
        let deleteButton = document.createElement('button');
        li.textContent = item;
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');
        li.append(deleteButton);
        list.append(li);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            deleteChapter(li.textContent);
            input.focus();
        });
    }

    function setChapterList() {
        try {
            const serializedData = JSON.stringify(chaptersArray);
            localStorage.setItem('myFavBOMList', serializedData);
        } catch (e) {
            console.log('Error saving to localStorage', e);
        }
    }

    function getChapterList() {
        const chapters = localStorage.getItem('myFavBOMList');
        return chapters ? JSON.parse(chapters) : [];
    }

    function deleteChapter(chapter) {
        chapter = chapter.slice(0, chapter.length - 1);
        chaptersArray = chaptersArray.filter(item => item !== chapter);
        setChapterList();
    }

    // Weather Widget (if applicable)
    !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0];
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src='https://weatherwidget.io/js/widget.min.js';
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document,'script','weatherwidget-io-js');
});
