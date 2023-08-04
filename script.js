var correctCount = 0;
var score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createTable(n) {
    var table = document.createElement('table');
    var cells = [];

    // Membuat indeks baris dan kolom untuk kotak yang salah
    var wrongRow = getRandomInt(n);
    var wrongCol = getRandomInt(n);

    for (var i = 0; i < n; i++) {
        var row = document.createElement('tr');
        var rowCells = [];
        for (var j = 0; j < n; j++) {
            var cell = document.createElement('td');

            // Menandai kotak yang salah
            if (i === wrongRow && j === wrongCol) {
                cell.dataset.isWrongSquare = 'true';
                console.log('Kotak nomor ' + ((i * n) + j + 1) + ' adalah kotak yang salah.');
            }

            rowCells.push(cell);
            row.appendChild(cell);
        }
        cells.push(rowCells);
        table.appendChild(row);
    }

    return { table, cells };
}

function updateScore() {
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

function handleCellClick(event) {
    var cell = event.target;
    if (cell.tagName === 'TD') {
        if (cell.classList.contains('opened')) {
            // Jika sel sudah dibuka sebelumnya, maka tidak melakukan apa-apa
            return;
        }

        cell.classList.add('opened');

        if (cell.dataset.isWrongSquare === 'true') {
            cell.innerHTML = '💣';
            showLoseModal();
            revealSquares();
        } else {
            cell.innerHTML = getRandomEmoji();
            cell.classList.add('correct');
            correctCount++;
            if (correctCount === n * n - 1) {
                revealSquares();
                showWinModal();
                score += n * 10;
                updateScore();
            }
        }
    }
}

function getRandomEmoji() {
    var emojiCorrect = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '😊', '😎', '🤩', '😍', '🥳'];
    return emojiCorrect[getRandomInt(emojiCorrect.length)];
}

function revealSquares() {
    var table = document.getElementsByTagName('table')[0];
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            cell.classList.remove('opened', 'correct');
            if (cell.dataset.isWrongSquare === 'true') {
                cell.innerHTML = '💣';
            } else {
                cell.innerHTML = getRandomEmoji();
            }
        }
    }
}

function restartGame() {
    correctCount = 0; 
    var container = document.getElementById('container');
    container.innerHTML = '';
    generateTable(n);
}

function generateTable(n) {
    var container = document.getElementById('container');
    var { table, cells } = createTable(n);
    container.appendChild(table);

    table.addEventListener('click', handleCellClick);
}

function startGame() {
    var inputN = document.getElementById('inputN');
    n = parseInt(inputN.value);
    if (isNaN(n) || n < 2 || n > 10) {
        showIsValidN();
        return;
    }

    document.getElementById('container').style.display = "flex";
    document.getElementById('restartBtn').style.display = "block";
    document.getElementById('scoreContainer').style.display = "block";

    correctCount = 0; 
    var container = document.getElementById('container');
    container.innerHTML = '';
    generateTable(n);
}

function showWinModal() {
    winModalScore();
    var winModal = document.getElementById('winModal');
    winModal.style.display = 'block';
}

function hideWinModal() {
    var winModal = document.getElementById('winModal');
    winModal.style.display = 'none';
}

function showLoseModal() {
    var loseModal = document.getElementById('loseModal');
    loseModal.style.display = 'block';
}

function hideLoseModal() {
    var loseModal = document.getElementById('loseModal');
    loseModal.style.display = 'none';
}

function showIsValidN() {
    var isValidN = document.getElementById('isValidN');
    isValidN.style.display = 'block';
}

function hideIsValidN() {
    var isValidN = document.getElementById('isValidN');
    isValidN.style.display = 'none';
}


function winModalScore() {
    var winScoreElement = document.getElementById('winScore');
    winScoreElement.innerHTML = n*10;
}

  


  










  

  