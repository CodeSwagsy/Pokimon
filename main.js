// ESM syntax is supported.
export {
  GREEN,
  RED,
  YELLOW,
  ANSI,
  BLUE,
  CYAN,
  pokemons,
  randomAttackSkill,
  attackSkills,
  opponentData,
};
import {
  createRandomOpponent,
  fightSequence,
  learnNewAttackSkill,
  selectPokemon,
} from "./functions";
import { Pokemon, AttackSkill } from "./pokemon.class";

export const GREEN = "\u001B[1m\u001B[32m",
  RED = "\u001B[1m\u001B[31m",
  YELLOW = "\u001B[1m\u001B[33m",
  ANSI = "\u001B[39m\u001B[22m",
  BLUE = "\u001B[1m\u001B[34m",
  CYAN = "\u001B[1m\u001B[36m";

// create new Pokemons
let pikachu = new Pokemon("Pikachu", 120, 100000);
let bulbasaur = new Pokemon("Bulbasaur", 95, 105);
let charizard = new Pokemon("Charizard", 150, 100);
let jigglypuff = new Pokemon("Jigglypuff", 90, 80);
let blastoise = new Pokemon("Blastoise", 160, 90);
let alakazam = new Pokemon("Alakazam", 110, 120);
let snorlax = new Pokemon("Snorlax", 200, 70);
let gyrados = new Pokemon("Gyarados", 140, 95);
let arcanine = new Pokemon("Arcanine", 130, 85);
let machamp = new Pokemon("Machamp", 150, 80);

export let pokemons = [
  pikachu,
  bulbasaur,
  charizard,
  jigglypuff,
  blastoise,
  alakazam,
  snorlax,
  gyrados,
  arcanine,
  machamp,
];

// create new skills that Pokemons can learn
let lightning = new AttackSkill("Lightning", 40, 30);
let poisonSeed = new AttackSkill("Poison Seed", 20, 20);
let fireBlast = new AttackSkill("Fire Blast", 50, 35);
let waterPulse = new AttackSkill("Water Pulse", 35, 25);
let psychicBeam = new AttackSkill("Psychic Beam", 45, 30);
let rockSlide = new AttackSkill("Rock Slide", 30, 25);
let iceBeam = new AttackSkill("Ice Beam", 40, 30);
let thunderbolt = new AttackSkill("Thunderbolt", 35, 25);
let flamethrower = new AttackSkill("Flamethrower", 45, 35);
let hydroPump = new AttackSkill("Hydro Pump", 50, 40);

export let attackSkills = [
  lightning,
  poisonSeed,
  fireBlast,
  waterPulse,
  psychicBeam,
  rockSlide,
  iceBeam,
  thunderbolt,
  flamethrower,
  hydroPump,
];

console.clear();

console.log(`${YELLOW}Pokimon 1.0${ANSI}`);
export let selectedPokemon = selectPokemon(pokemons);
export let selectedPokemonIndex = pokemons.indexOf(selectedPokemon);
export let opponentData = createRandomOpponent();
export let randomOpponent = opponentData.opponent;
export let randomAttackSkill = opponentData.skills;

console.log(
  `Your opponent is: ${RED}${randomOpponent.name}${ANSI} (Health: ${randomOpponent.health}, Magic: ${randomOpponent.magic})`
);

learnNewAttackSkill();
fightSequence();
