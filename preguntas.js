function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function displayPreguntas(preguntasJson) {
    const container = document.getElementById('preguntas-container');
    container.innerHTML = ''; 
  
    shuffleArray(preguntasJson).forEach((pregunta, index) => {
      const card = document.createElement('div');
      card.className = 'card mb-3';
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const preguntaTitulo = document.createElement('h5');
      preguntaTitulo.className = 'card-title';
      preguntaTitulo.textContent = `${index + 1}. ${pregunta.pregunta}`;
  
      cardBody.appendChild(preguntaTitulo);
  
      const opcionesKeys = shuffleArray(Object.keys(pregunta.opciones));
  
      opcionesKeys.forEach(key => {
        const opcionDiv = document.createElement('div');
        opcionDiv.className = 'form-check';
  
        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = pregunta.id;
        input.id = key;
  
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = key;
        label.textContent = pregunta.opciones[key];
  
        opcionDiv.appendChild(input);
        opcionDiv.appendChild(label);
  
        cardBody.appendChild(opcionDiv);
  
        input.addEventListener('click', () => {
          handleAnswerSelection(key, pregunta.respuestaCorrecta, cardBody);
        });
      });
  
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  }
  
  function handleAnswerSelection(selectedOption, correctOption, cardBody) {
    const existingMessage = cardBody.querySelector('.respuesta-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  
    const message = document.createElement('p');
    message.className = 'respuesta-message mt-2';
    message.textContent = selectedOption === correctOption ? '¡Correcto!' : 'Incorrecto';
    message.style.color = selectedOption === correctOption ? 'green' : 'red';
  
    cardBody.appendChild(message);
  }
  
  fetch('preguntas.json')
    .then(response => response.json())
    .then(data => displayPreguntas(data))
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
  