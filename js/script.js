// Palabra a adivinar seleccionada al azar
const wordToGuess = selectRandomWord(wordDatabase);
pista = document.getElementById("pista")
// alert(pista)
// Estado del juego
let wordState = Array(wordToGuess.length).fill('_'); // Inicializa para representar las letras adivinadas
let attemptsLeft = 6; // Número de intentos permitidos
let guessedLetters = []; // Almacena las letras adivinadas

// Elementos del DOM
const wordContainer = document.getElementById('word-container'); // Elemento para mostrar la palabra a adivinar
const guessContainer = document.getElementById('guess-container'); // Elemento para mostrar letras adivinadas
const attemptsLeftSpan = document.getElementById('attempts-left'); // Elemento para mostrar los intentos restantes
const message = document.getElementById('message'); // Elemento para mostrar mensajes

estructura = document.getElementById("globos"); // Pinguino flotando
cayendo = document.getElementById("pinguinocayendo"); // Pinguino cayendo

// const ordenGlobos = [0, 1, 2, 3, 4, 5]; // Orden en el que se ocultarán los globos
globoIndex = 0


// Elementos de los globos
const globos = document.querySelectorAll('.globo'); // Elementos que representan los globos
explosiones = document.querySelectorAll('.explosion') // Explosiones de los globos
let globosOcultos = 0; // Número de errores
let globosDisponibles = Array.from({ length: globos.length }, (_, index) => index); //globos disponibles

// Función para seleccionar una palabra al azar de la base de datos
function selectRandomWord(database) {
    const randomIndex = Math.floor(Math.random() * database.length);
    pista.innerHTML = "Pista: " + database[randomIndex]["tema"];
    // pista.innerHTML = database[44]["tema"];
    // pista.innerHTML = "UwU"
    // alert(database[randomIndex]["palabra"])
    // return database[44]["palabra"];
    return database[randomIndex]["palabra"];
}

// Función para actualizar la pantalla
function updateDisplay() {
    wordContainer.textContent = wordState.join(' '); // Actualiza la palabra a adivinar
    guessContainer.textContent = guessedLetters.join(' '); // Actualiza las letras adivinadas
    attemptsLeftSpan.textContent = attemptsLeft; // Actualiza el número de intentos
}

// Función para verificar si se ha ganado el juego
function checkWin() {
    // alert("hola")
    // alert(wordState.join('') + "==" + wordToGuess)
    if (wordState.join('') == wordToGuess) {
        message.textContent = 'Molt bé!';
        confettiEffect();
        document.removeEventListener('keydown', handleKeyPress); // Detiene los eventos de teclado
    }
}

// Función para manejar la entrada desde el teclado
function handleKeyPress(event) {
    if (attemptsLeft === 0) {
        return; // Si ya perdiste, no se permiten más intentos
    }

    const key = event.key.toLowerCase();

    if (!/^[a-z]$/.test(key)) {
        return; // Ignorar teclas que no son letras
    }

    if (guessedLetters.includes(key)) {
        message.textContent = 'Ja has endevinat aquesta lletra'; // Si se vuelve a elegir una letra ya pulsada
        setTimeout(function () {
            message.textContent = '';
        }, 1000);
        return;
    }

    guessedLetters.push(key);

    if (wordToGuess.includes(key)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === key) {
                wordState[i] = key; // Actualiza el estado de la palabra adivinada
            }
        }
    } else {
        // Si hay un error, oculta un globo aleatorio
        if (globosDisponibles.length > 0) {
            // const globoIndex = ordenGlobos.shift(); // Toma el próximo índice del ordenGlobos
            explosiones[globoIndex].style.visibility = "visible"
            setTimeout(globoExplotar, 200)
            globosOcultos++;
        }
        attemptsLeft--; // Reduce el número de intentos restantes
    }

    updateDisplay(); // Actualiza la pantalla después de cada intento
    checkWin(); // Verifica si el jugador ha ganado

    if (attemptsLeft == 0) {
        message.textContent = 'Ja no hi ha més intents. La paraula era: ' + wordToGuess + '.';
        document.removeEventListener('keydown', handleKeyPress); // Detiene la escucha de eventos de teclado al perder
        
        // Animación
        estructura.style.visibility = "hidden"
        cayendo.style.visibility = "visible"

        cayendo.classList.replace("flotar", "hidden");
    }
}

// Eventos de teclado
document.addEventListener('keydown', handleKeyPress);

// Inicialización del juego
updateDisplay();

// Reiniciar el juego
function reset() {
    location.reload();
}
function globoExplotar(index) {
    globos[globoIndex].style.visibility = 'hidden'; // Oculta un globo
    explosiones[globoIndex].style.visibility = "hidden"
    globoIndex++
}
