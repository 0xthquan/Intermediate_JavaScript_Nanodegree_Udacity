const dinos = [
    {
        species: 'Triceratops',
        weight: 13000,
        height: 114,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'First discovered in 1889 by Othniel Charles Marsh',
    },
    {
        species: 'Tyrannosaurus Rex',
        weight: 11905,
        height: 144,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'The largest known skull measures in at 5 feet long.',
    },
    {
        species: 'Anklyosaurus',
        weight: 10500,
        height: 55,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Anklyosaurus survived for approximately 135 million years.',
    },
    {
        species: 'Brachiosaurus',
        weight: 70000,
        height: 372,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Jurassic',
        fact: 'An asteroid was named 9954 Brachiosaurus in 1991.',
    },
    {
        species: 'Stegosaurus',
        weight: 11600,
        height: 79,
        diet: 'herbivore',
        where: 'North America, Europe, Asia',
        when: 'Late Jurassic to Early Cretaceous',
        fact: 'The Stegosaurus had between 17 and 22 seperate plates and flat spines.',
    },
    {
        species: 'Elasmosaurus',
        weight: 16000,
        height: 59,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.',
    },
    {
        species: 'Pteranodon',
        weight: 44,
        height: 20,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.',
    },
    {
        species: 'Pigeon',
        weight: 0.5,
        height: 9,
        diet: 'herbivore',
        where: 'Worldwide',
        when: 'Holocene',
        fact: 'All birds are living dinosaurs.',
    },
];

/**
 * @description Dino Contructure
 * @param {dinoData} dinoData a single dinosaur data
 */
function Dino(dinoData) {
    this.species = dinoData.species;
    this.weight = dinoData.weight;
    this.height = dinoData.height;
    this.diet = dinoData.diet;
    this.where = dinoData.where;
    this.when = dinoData.when;
    this.fact = dinoData.fact;
}

/**
 * @description Create dino object array from dinos data
 * @return{[Object]} dino object array
 */
function createDinoArray() {
    const dinoArray = [];
    dinos.forEach((dino) => {
        dinoArray.push(new Dino(dino));
    });

    return dinoArray;
}

const humanObject = {};

/**
 *@description Create human object data from form
 */
function getHumanData() {
    humanObject.name = document.getElementById('name').value;
    humanObject.height =
        Number(document.getElementById('feet').value * 12) +
        Number(document.getElementById('inches').value);
    humanObject.weight = document.getElementById('weight').value;
    humanObject.diet = document.getElementById('diet').value;
}

// Create Dino Compare Method
// NOTE: Weight in JSON file is in lbs, height in inches.
const prototypeDino = {
    /**
     * @description compare height between dino and human
     * @return {string} the fact of human and dino height
     */
    compareHeight() {
        const heightRatio = (this.height / humanObject.height).toFixed(2);
        return `${this.species} is ${heightRatio} times as tall as you are`;
    },

    /**
     * @description compare weight between dino and human
     * @return {string} the fact of human and dino weight
     */
    compareWeight() {
        const weightRatio = (this.weight / humanObject.weight).toFixed(2);
        return `${this.species} is ${weightRatio} times as weight as you are`;
    },

    /**
     * @description compare diet between dino and human
     * @return {string} the fact of human and dino diet
     */
    compareDiet() {
        if (this.diet === humanObject.diet.toLowerCase()) {
            return `You and ${this.species} are the ${this.diet}`;
        }
        return `You are the ${humanObject.diet} and ${this.species} is the ${this.diet}`;
    },
};
Dino.prototype = prototypeDino;

/**
 * @description create element dino for front end from dino object
 * @param {Object} dinoData dino object
 * @return {string} element dino for front end
 */
function createElementDino(dinoData) {
    const randomNumber =
        dinoData.species === 'Pigeon' ? 0 : Math.ceil(Math.random() * 5);

    let fact;
    switch (randomNumber) {
        case 0:
            fact = dinoData.fact;
            break;

        case 1:
            fact = dinoData.compareDiet();
            break;

        case 2:
            fact = dinoData.compareHeight();
            break;

        case 3:
            fact = dinoData.compareWeight();
            break;

        case 4:
            fact = `The ${dinoData.species} lived in ${dinoData.where}`;
            break;

        case 5:
            fact = `The ${dinoData.species} lived in the ${dinoData.when} period.`;
            break;

        default:
            break;
    }

    const newDiv = document.createElement('div');
    newDiv.className = 'grid-item';
    newDiv.innerHTML = `<h3>${
        dinoData.species
    }</h3><img src="images/${dinoData.species.toLowerCase()}.png" alt="image of ${
        dinoData.species
    }"><p>${fact}</p>`;

    return newDiv;
}

/**
 * @description create element human for front end from human object
 * @param {Object} humanData human object
 * @return {string} element human for front end
 */
function createHumanElement(humanData) {
    const newDiv = document.createElement('div');
    newDiv.className = 'grid-item';
    newDiv.innerHTML = `<h3>${humanData.name}</h3><img src="images/human.png" alt="image of human"><p> Height: ${humanObject.height} inches, Weight: ${humanObject.weight} pounds, Diet: ${humanObject.diet}</p>`;

    return newDiv;
}

/**
 * @description Update UI after click compare
 * @param {[Object]} dinoArray
 * @param {Object} humanData
 */
function updateUI(dinoArray, humanData) {
    document.getElementById('dino-compare').style.display = 'none';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dinoArray.length; i += 1) {
        // 5th element, index 4 is always the human
        const gridSquare =
            i === 4
                ? createHumanElement(humanData)
                : createElementDino(dinoArray[i], humanData);

        fragment.appendChild(gridSquare);
    }
    document.getElementById('grid').appendChild(fragment);
    document.getElementById('refresh-btn').style.display = 'block';
}

// On button click, prepare and display infographic
/**
 * @description setup data after click compare
 */
function actionCompare() {
    getHumanData();
    const dinoArray = createDinoArray();
    dinoArray.splice(4, 0, 'human');
    updateUI(dinoArray, humanObject);
}

/**
 * @description refresh data and update UI to start again
 */
function refresh() {
    document.getElementById('grid').innerHTML = '';
    document.getElementById('refresh-btn').style.display = 'none';
    document.querySelector('form').style.display = 'block';
    document.getElementById('name').value = '';
    document.getElementById('feet').value = '';
    document.getElementById('inches').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('diet').value = 'Herbivore';
}

(function () {
    document.getElementById('btn').addEventListener('click', actionCompare);
    document.getElementById('refresh-btn').addEventListener('click', refresh);
}());
