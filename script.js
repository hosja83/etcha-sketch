function createGrid() {
  for (let i = 0; i < gridRowColSize; i++) {
    for (let j = 0; j < gridRowColSize; j++) {
      const gridSquare = document.createElement('div');
      grid.append(gridSquare);
      gridSquare.classList.add('grid-square');
      gridSquare.style.cssText = `grid-area: ${i + 1} / ${j + 1};`;
    }
  }
}

function printHeader() {
  const header = document.createElement('div');
  header.textContent = 'Etch-a-Sketch';
  header.classList.add('header-text');
  document.querySelector('div.header-container').append(header);
}

function printFooter() {
  printCopyrightMessageIcon();
  printCurrentYear();
  githubUsernameLink();
  printGithubLogo();
}

function printCopyrightMessageIcon() {
  const copyrightMessageIcon = document.createElement('span');
  copyrightMessageIcon.textContent = 'Copyright \251';
  footer.appendChild(copyrightMessageIcon);
}

function printCurrentYear() {
  const year = document.createElement('span');
  year.textContent = ` ${new Date().getFullYear()} `;
  footer.appendChild(year);
}

function githubUsernameLink() {
  const usernameLink = document.createElement('a');
  usernameLink.setAttribute('href', 'https://github.com/hosja83/etch-a-sketch');
  usernameLink.setAttribute('target', '_blank');
  usernameLink.textContent = 'hosja83 ';
  footer.appendChild(usernameLink);
}

function printGithubLogo() {
  const githubLogo = document.createElement('i');
  githubLogo.setAttribute('class', 'fa fa-github');
  githubLogo.classList.add('github-logo');
  footer.appendChild(githubLogo);
}

function createSlider() {
  const slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.setAttribute('min', '1');
  slider.setAttribute('max', '100');
  slider.setAttribute('value', '16');
  document.querySelector('div.slider-container').appendChild(slider);
  //slider.classList.add('slider'); slider class added for styling in w3schools example
  //slider.setAttribute('id', 'myRange'); slider id added for styling in w3schools example

  const sliderText = document.createElement('div');
  sliderText.classList.add('slider-text');
  document.querySelector('div.slider-container').insertBefore(sliderText, document.querySelector('div.slider-container').firstChild);
  
  sliderText.textContent = `${slider.value} x ${slider.value}`;
  slider.oninput = updateGridRange;
}

function updateGridRange() {
  document.querySelector('div.slider-container div.slider-text').textContent = `${document.querySelector('input').value} x ${document.querySelector('input').value}`;

  const oldRowColSize = parseInt(gridRowColSize, 10);
  gridRowColSize = document.querySelector('input').value;
  const diffRowColSize = oldRowColSize - gridRowColSize;

  if (diffRowColSize < 0) {
    //add diff
    let indexToAdd = oldRowColSize;
    for (let i = 0; i < oldRowColSize; i++) {
      if (i != 0) {
        indexToAdd += parseInt(gridRowColSize, 10);
      }
      let count = 0;
      for (let j = oldRowColSize; j < gridRowColSize; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.cssText = `grid-area: ${parseInt(i, 10) + 1} / ${parseInt(j, 10) + 1};`;
        grid.insertBefore(gridSquare, grid.children[parseInt(indexToAdd, 10) + count++]);
      }
    }
    for (let i = oldRowColSize; i < gridRowColSize; i++) {
      for (let j = 0; j < gridRowColSize; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.cssText = `grid-area: ${parseInt(i, 10) + 1} / ${parseInt(j, 10) + 1};`;
        grid.append(gridSquare);
      }
    }
  }
  if (diffRowColSize > 0) {
    //subtract diff
    let indexToRemove = oldRowColSize * oldRowColSize - 1;
    for (let i = oldRowColSize; i > gridRowColSize; i--) {
      for (let j = oldRowColSize; j > 0; j--) {
        grid.removeChild(grid.children[indexToRemove--]);
      }
    }
    for (let i = gridRowColSize; i > 0; i--) {
      if (i != gridRowColSize) {
        indexToRemove -= gridRowColSize;
      }
      for (let j = oldRowColSize; j > gridRowColSize; j--) {
        grid.removeChild(grid.children[indexToRemove--]);
      }
    }
  }

  // Reset grid and remove random, eraser, and custom grid square event listeners
  resetGridEventListeners();
}

function resetGridEventListeners() {
  clearGrid();
  
  resetButtonStyle(randomButton);
  resetButtonStyle(eraserButton);
  resetButtonStyle(customButton);
  resetButtonStyle(clearButton);

  removeGridSquaresEventListeners();
}

function resetButtonStyle(b) {
  b.style.backgroundColor = 'rgba(239,239,239,1)';
  b.style.border = '2px solid rgba(118,118,118,1)';
  b.style.borderRadius = '8px';
}

function createClear() {
  const clear = document.createElement('button');
  clear.textContent = 'CLEAR';
  document.querySelector('div.clear-container').append(clear);

  clear.addEventListener('click', clearGrid);
}

function clearGrid() {
  let count = 0;
  for (let i = 0; i < gridRowColSize; i++) {
    for (let j = 0; j < gridRowColSize; j++) {
      grid.children[count++].style.cssText = `grid-area: ${i + 1} / ${j + 1};background-color: #fefefe;`;
    }
  }
}

function createRandomMode() {
  const random = document.createElement('button');
  random.textContent = 'RANDOM';
  document.querySelector('div.random-color-container').append(random);

  random.addEventListener('click', activateRandomColorMode);
}

function activateRandomColorMode() {
  randomButton.style.backgroundColor = '#efe09c';
  eraserButton.style.backgroundColor = 'rgba(239,239,239,1)';
  customButton.style.backgroundColor = 'rgba(239,239,239,1)';

  removeGridSquaresEventListeners();

  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].addEventListener('mouseover', randomColor);
  }
}

function randomColor(event) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  event.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  event.target.style.border = 'none';
}

function createEraser() {
  const eraser = document.createElement('button');
  eraser.textContent = 'ERASER';
  document.querySelector('div.eraser-container').append(eraser);

  eraser.addEventListener('click', activateEraserMode);
}

function activateEraserMode() {
  eraserButton.style.backgroundColor = '#efe09c';
  randomButton.style.backgroundColor = 'rgba(239,239,239,1)';
  customButton.style.backgroundColor = 'rgba(239,239,239,1)';

  removeGridSquaresEventListeners();

  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].addEventListener('mouseover', erase);
  }
}

function erase(event) {
  event.target.style.backgroundColor = 'rgba(254,254,254,1)';
  event.target.style.border = '.91px solid rgb(0 0 0 / 4%)';
}

function displayCustomColors() {
  const custom = document.createElement('button');
  custom.textContent = 'CUSTOM';
  const customColorContainer = document.querySelector('div.custom-color-container');
  customColorContainer.insertBefore(custom, customColorContainer.firstChild);

  createColorPicker();

  custom.addEventListener('click', activateCustomColorMode);
}

function createColorPicker() {
  const colorPicker = document.createElement('input');
  colorPicker.setAttribute('type', 'color');
  document.querySelector('div.custom-color-picker').append(colorPicker);
}

function activateCustomColorMode() {
  customButton.style.backgroundColor = '#efe09c';
  randomButton.style.backgroundColor = 'rgba(239,239,239,1)';
  eraserButton.style.backgroundColor = 'rgba(239,239,239,1)';

  removeGridSquaresEventListeners();

  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].addEventListener('mouseover', drawCustomColor);
  }
}

function drawCustomColor(event) {
  const colorPicker = document.querySelector('div.custom-color-picker input');
  event.target.style.backgroundColor = `${colorPicker.value}`;
  event.target.style.border = 'none';
}

function removeGridSquaresEventListeners() {
  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].replaceWith(grid.children[i].cloneNode(true));
  }
}

printHeader();

let gridRowColSize = 16;
const grid = document.querySelector('div.grid-container');
createGrid();
createSlider();
createClear();
createRandomMode();
createEraser();
displayCustomColors();

const randomButton = document.querySelector('div.random-color-container button');
const eraserButton = document.querySelector('div.eraser-container button');
const customButton = document.querySelector('div.custom-color-container button');
const clearButton = document.querySelector('div.clear-container button');

const footer = document.querySelector('div.footer-container');
printFooter();