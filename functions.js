import {
  CYAN,
  GREEN,
  RED,
  YELLOW,
  ANSI,
  BLUE,
  pokemons,
  attackSkills,
  selectedPokemon,
  randomOpponent,
  randomAttackSkill,
} from "./main";

import { keyInSelect, keyInYNStrict } from "readline-sync";

export let selectPokemon = (pokemons) => {
  let choosePokemon = keyInSelect(
    pokemons.map(
      (pokemon) =>
        `${CYAN}${pokemon.name}${ANSI} (Health: ${pokemon.health}, Magic: ${pokemon.magic})`
    ),
    `${YELLOW}Choose your Character${ANSI}\n`
  );
  let selectedPokemon = pokemons[choosePokemon];
  console.log(
    `\nYou have chosen: ${GREEN}${selectedPokemon.name}${ANSI} (Health: ${selectedPokemon.health}, Magic: ${selectedPokemon.magic})`
  );
  return selectedPokemon;
};

export let createRandomOpponent = (selectedPokemonIndex) => {
  let remainingPokemons = [...pokemons];
  remainingPokemons.splice(selectedPokemonIndex, 1);
  let randomOpponent =
    remainingPokemons[Math.floor(Math.random() * remainingPokemons.length)];
  let randomAttack = Math.floor(Math.random() * attackSkills.length);
  let randomAttackSkill = attackSkills[randomAttack];
  randomOpponent.learnAttackSkill(randomAttackSkill);
  return { opponent: randomOpponent, skills: randomAttackSkill };
};

export let learnNewAttackSkill = () => {
  let attackToLearn = keyInSelect(
    attackSkills.map(
      (attack) =>
        `${BLUE}${attack.attack}${ANSI} (Damage: ${attack.damage}, Magic: ${attack.magic})`
    ),
    `${YELLOW}Choose your attack to learn: # ${ANSI}`
  );
  selectedPokemon.learnAttackSkill(attackSkills[attackToLearn]);
};

let attackOpponent = () => {
  let attackOptions = selectedPokemon.skills.map((skill) => skill.attack);
  let attackWith = keyInSelect(
    attackOptions,
    "Choose your attack skill to attack with: # "
  );
  if (attackWith !== -1) {
    selectedPokemon.attack(attackOptions[attackWith], randomOpponent);
  }
};

export const fightSequence = () => {
  let actionPoints = 2;
  let round = 1;
  while (randomOpponent.isAlive() && selectedPokemon.isAlive()) {
    console.log(`\n${CYAN}Round: ${round}${ANSI}`);

    console.log(
      `\n${selectedPokemon.name} - ${selectedPokemon.health} health - ${selectedPokemon.magic} magic.`
    );
    const option = keyInSelect(
      [
        `Attack ${randomOpponent.name}`,
        "Drink Magic Potion (costs 1 AP)",
        "Drink Health Potion (costs 1 AP)",
        "List Attack Skills",
        "Learn new Attack Skill (costs 1 AP)",
      ],
      `${YELLOW}What do you want to do? (${actionPoints} AP left) # ${ANSI}`
    );

    switch (option) {
      case 0:
        attackOpponent();
        if (randomOpponent.health <= 30 && randomOpponent.isAlive()) {
          randomOpponent.getHealth();
          randomOpponent.counterAttack(selectedPokemon, randomAttackSkill);
          round++;
        } else if (randomOpponent.magic <= 30 && randomOpponent.isAlive()) {
          randomOpponent.getMagic();
          randomOpponent.counterAttack(selectedPokemon, randomAttackSkill);
          round++;
        } else if (randomOpponent.isAlive()) {
          randomOpponent.counterAttack(selectedPokemon, randomAttackSkill);
          round++;
        }
        actionPoints++;
        break;

      case 1:
        if (actionPoints > 0) {
          selectedPokemon.getMagic();
          actionPoints--;
          break;
        } else {
          console.log("You dont have any AP left.");
          break;
        }

      case 2:
        if (actionPoints > 0) {
          selectedPokemon.getHealth();
          actionPoints--;
          break;
        } else {
          console.log("You dont have any AP left.");
          break;
        }

      case 3:
        selectedPokemon.showSkills();
        break;

      case 4:
        if (actionPoints > 0) {
          learnNewAttackSkill();
          actionPoints--;
          break;
        } else {
          console.log("You dont have any AP left.");
          break;
        }

      case -1:
        console.log("Goodbye!");
        return;
    }
  }
  if (randomOpponent.isAlive() === false) {
    console.log(
      `\n${RED}${
        randomOpponent.name
      }${ANSI} is dead. ${GREEN}${selectedPokemon.name.toUpperCase()}${ANSI} wins!\n`
    );
  } else if (selectedPokemon.isAlive() === false) {
    console.log(
      `\n${GREEN}${
        selectedPokemon.name
      }${ANSI} is dead. ${RED}${randomOpponent.name.toUpperCase()}${ANSI} wins!\n`
    );
  }
};
