let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Dague"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Dague ', power: 8 },
  { name: ' Épée', power: 30 },
  { name: ' Excalibur', power: 50 },
  { name: ' Lame du Phénix', power: 100 }
];
const monsters = [
  {
    name: "Gobelin",
    level: 2,
    health: 15
  },
  {
    name: "Ogre",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "centre ville",
    "button text": ["Magasin 🏬", "Le Donjon 🏛️", "Combattre le DRAGON 🐉"],
    "button functions": [goStore, goCave, goFightDragon],
    text: "Vous êtes au centre ville 🏘️. Vous voyez un panneau \"Magasin 🏬\".",
    image: 'Ville.jpeg'
  },
  {
    name: "magasin",
    "button text": ["Acheter 10 de vies ❤️ (10 or 🔱)", "Acheter une arme 🗡️ (30 or 🔱)", "Allez au Centre ville 🏘️"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Vous êtes dans le magasin 🏬.",
    image: "Magasin.jpeg"
  },
  {
    name: "grotte",
    "button text": ["Combattre le Gobelin 🧌", "Combattre l'Ogre 🧌", "Allez au Centre Ville 🏘️"],
    "button functions": [fightgobelin, fightBeast, goTown],
    text: "Vous entrez dans le Donjon 🏛️. Vous voyez plusieurs monstres 🧌.",
    image: "Grotte.jpeg"
  },
  {
    name: "fight",
    "button text": ["Attaque ⚔️", "Esquive 💨", "Fuir 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Vous combattez le Gobelin 🧌.",
    image: "Gobelin.jpeg"
  },
  {
    name: "fightDragon",
    "button text": ["Attaque ⚔️", "Esquive 💨", "Fuir 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Vous combattez le Dragon 🐉.",
    image: "Dragon.jpeg"
  },
  {
    name: "fightOgre",
    "button text": ["Attaque ⚔️", "Esquive 💨", "Fuir 🏃"],
    "button functions": [attack, dodge, goTown],
    text: "Vous combattez l'Ogre 🧌.",
    image: "Ogre.jpeg"
  },
  {
    name: "kill monster",
    "button text" : ["Allez au Centre ville 🏘️", "Allez au Centre ville 🏘️", "Allez au Centre ville 🏘️"],
    "button functions": [goTown, goTown, goTown],
    text: `Vous avez battu le monstre 🧌. Vous gagnez de la force 🦾 et trouvez de l'or 🔱.`,
    image: "Victory.jpg"
  },
  {
    name: "lose",
    "button text": ["REJOUER ? 😈", "REJOUER ? 👹", "REJOUER ? 😈"],
    "button functions": [restart, restart, restart],
    text: "Vous êtes mort 💀. Vous n'avez plus de points de vies ☠️.",
    image: "Dead.jpg"
  },
  { 
    name: "win", 
    "button text": ["REJOUER ? 😇 ", "REJOUER ? 😇", "REJOUER ? 😇"], 
    "button functions": [restart, restart, restart], 
    text: "Vous avez vaincu le dragon 🐉! VOUS AVEZ FINI LE JEU! 🎊;",
    image: "Fin.jpg"
  }
];


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function launchConfetti() {
  confetti({
      particleCount: 200,
      spread: 400,
      origin: { y: 0.1 },
      colors: ['#ff0', '#f0f', '#0ff'],
      shapes: ['circle'],
      gravity: 1,
      ticks: 400
  });
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  text.classList.remove('fade-in');
  text.classList.add('fade-out');
  setTimeout(() => {
      text.innerHTML = location.text;
      text.classList.remove('fade-out');
      text.classList.add('fade-in');
  }, 200); 

  const locationImage = document.getElementById('location-image');
  locationImage.classList.remove('fade-in');
  locationImage.src = './img/' + location.image;

}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Vous n'avez pas assez d'or 🔱 pour acheter de la vie ❤️.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Vous avez maitenant comme arme :  " + newWeapon + "." + "\n";
      inventory.push(newWeapon);
      text.innerText += " Dans votre inventaire vous avez : " + inventory + ".";
    } else {
      text.innerText = "Vous n'avez pas assez d'or 🔱 pour acheter une arme 🗡️.";
    }
  } else {
    text.innerText = "Vous avez maitenant l'arme la plus puissante du jeu 🤯" + " (Lame du Phénix) !";
    button2.innerText = "Vendre une arme pour 15 d'or 🔱.";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vous avez vendu : " + currentWeapon +  " + 15 (🔱 or)." + "\n";
    text.innerText += " Dans votre inventaire vous avez : " + " " + inventory + ".";
  } else {
    text.innerText = "Vous ne pouvez pas vendre votre seul arme ! 🗡️";
  }
}

function fightgobelin() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFightOgre();
}

function fightDragon() {
  fighting = 2;
  goFightDragon();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function goFightOgre() {
  fighting = 1;
  goFight();
  update(locations[5]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function goFightDragon() {
  fighting = 2;
  goFight();
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "Le maléfique " + monsters[fighting].name + " attaque 👹.";
  text.innerText += " Vous l'attaquez avec votre " + weapons[currentWeapon].name + " 🗡️.";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Vous ratez ❌.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
    healthText.innerText = "0";
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Votre " + inventory.pop() + " s'est cassée 💥.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Vous esquivez l'attaque du maléfique " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[6]);
  launchConfetti();
}

function lose() {
  update(locations[7]);
}

function winGame() {
  update(locations[8]);
  launchConfetti();
  launchConfetti();
  launchConfetti();
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Dague "];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
