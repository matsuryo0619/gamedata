// CSSの読み込み
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'mouse.css';
document.head.appendChild(link);

// 要素の生成と設定
const positionDiv = document.createElement('div');
positionDiv.id = 'position';
positionDiv.innerHTML = '<p>X: 0 Y: 0</p>';
document.body.appendChild(positionDiv);

const contextmenuDiv = document.createElement('div');
contextmenuDiv.classList.add('contextmenu');
document.body.appendChild(contextmenuDiv);

const mouseSettingsMenuDiv = document.createElement('div');
mouseSettingsMenuDiv.classList.add('mouse-settings-menu');
document.body.appendChild(mouseSettingsMenuDiv);

// JSONファイルの読み込みと処理
fetch('contextmenu.json')
    .then(response => response.json())
    .then(contextmenuData => {
        // contextmenuの生成
        contextmenuData.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.label;

            if (item.class) {
                div.classList.add(item.class);
            }

            if (item.id) {
                div.id = item.id;
            }


            div.addEventListener('click', () => {
                switch (item.action) {
                    case 'reset':
                        positionDiv.style.left = '5px';
                        positionDiv.style.top = '5px';
                        break;
                    case 'settings':
                        // サブメニューが存在する場合
                        if (item.submenu) {
                            const submenu = document.createElement('div');
                            submenu.classList.add('submenu'); // サブメニューのクラス
                            item.submenu.forEach(subitem => {
                                const subDiv = document.createElement('div');
                                subDiv.textContent = subitem.label;
                                subDiv.addEventListener('click', () => {
                                    document.documentElement.style.cursor = subitem.cursor;
                                    submenu.style.display = 'none'; // サブメニューを閉じる
                                });
                                submenu.appendChild(subDiv);
                            });
                            div.appendChild(submenu); // メニュー項目にサブメニューを追加
                            submenu.style.display = 'block'; // サブメニューを表示
                        }
                        let rect = div.getBoundingClientRect();
                        mouseSettingsMenuDiv.style.left = `${rect.right}px`;
                        mouseSettingsMenuDiv.style.top = `${rect.top}px`;
                        mouseSettingsMenuDiv.classList.add('visible');
                        break;
                }
            });
            contextmenuDiv.appendChild(div);
        });
    });

// JavaScriptの処理 (変更なし)
// ... (上記のJavaScriptコードをそのまま貼り付け)
document.addEventListener('mousemove', function (event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const position = document.getElementById('position');
    position.innerText = `X: ${mouseX} Y: ${mouseY}`;

    if (isDragging) {
        const deltaX = event.pageX - startX - (window.scrollX - startPageX);
        const deltaY = event.pageY - startY - (window.scrollY - startPageY);

        position.style.left = `${offsetX + deltaX}px`;
        position.style.top = `${offsetY + deltaY}px`;
    }
});

const position = document.getElementById('position');
const contextmenu = document.querySelector('.contextmenu');
const mouseSettingsMenu = document.querySelector('.mouse-settings-menu');
// const mouseSettingsButton = document.querySelector('.mouse-settings'); // 不要
// const resetButton = document.querySelector('.reset-position'); // 不要

let isDragging = false;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;
let startPageX = 0, startPageY = 0;
let targetElement = null;

// ドラッグ処理
position.addEventListener('mousedown', function (event) {
    isDragging = true;
    startX = event.pageX;
    startY = event.pageY;
    offsetX = position.offsetLeft;
    offsetY = position.offsetTop;
    startPageX = window.scrollX;
    startPageY = window.scrollY;
});

window.addEventListener('mouseup', function () {
    isDragging = false;
});

document.oncontextmenu = function () {
    return false;
};

document.addEventListener('contextmenu', (e) => {
    targetElement = e.target;
    contextmenu.style.display = 'block';

    let menuWidth = contextmenu.offsetWidth;
    let menuHeight = contextmenu.offsetHeight;
    contextmenu.style.display = 'none';

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let posX = e.pageX - window.scrollX;
    let posY = e.pageY - window.scrollY;

    if (posX + menuWidth > windowWidth) {
        posX = windowWidth - menuWidth;
    }
    if (posY + menuHeight > windowHeight) {
        posY = windowHeight - menuHeight;
    }

    contextmenu.style.left = `${posX}px`;
    contextmenu.style.top = `${posY}px`;
    contextmenu.style.display = 'block';
});

document.addEventListener('mousedown', (e) => {
    if (!contextmenu.contains(e.target) && !mouseSettingsMenu.contains(e.target)) {
        contextmenu.style.display = 'none';
        mouseSettingsMenu.classList.remove('visible');
    }
});

// mouseSettingsButton.addEventListener('mouseenter', (e) => { // 不要
//     let rect = mouseSettingsButton.getBoundingClientRect();
//     mouseSettingsMenu.style.left = `${rect.right - 5}px`; // 右クリメニューに少し被せる
//     mouseSettingsMenu.style.top = `${rect.top}px`;
//     mouseSettingsMenu.classList.add('visible');
// });


// mouseSettingsButton.addEventListener('mouseleave', (e) => { // 不要
//     setTimeout(() => {
//         if (!mouseSettingsMenu.matches(':hover')) {
//             mouseSettingsMenu.classList.remove('visible');
//         }
//     }, 200);
// });

mouseSettingsMenu.addEventListener('mouseleave', () => {
    mouseSettingsMenu.classList.remove('visible');
});

// resetButton.addEventListener('click', () => { // 不要
//     position.style.left = '5px';
//     position.style.top = '5px';
// });

const mouseOptions = document.querySelectorAll('.mouse-settings-menu .mouse-option'); // mouse-settings-menu 内の要素を取得

mouseOptions.forEach(option => {
    option.addEventListener('click', () => {
        const cursorStyle = option.dataset.cursor;
        document.documentElement.style.cursor = cursorStyle; // body全体のカーソルを変更
        // または、特定の要素のカーソルを変更する場合
        // position.style.cursor = cursorStyle;
    });
});
