import { GREEN, RED, YELLOW, ANSI, BLUE, CYAN } from "./main";
import { randomAttackSkill } from "./main";

export class Pokemon {
  constructor(name, health, magic, skills, counter, healthPotion, magicPotion) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.skills = [];
    this.counter = 0;
    this.healthPotion = 5;
    this.magicPotion = 5;
  }
  learnAttackSkill(newSkill) {
    if (newSkill instanceof AttackSkill) {
      this.skills.push(newSkill);
    } else {
      console.log("This Skill is not in list");
    }
  }
  showStatus() {
    console.log(
      `${this.name} currently has ${this.health} health and ${this.magic} magic.`
    );
  }
  getMagic() {
    if (this.magicPotion > 0) {
      const randomMagic = Math.floor(Math.random() * 50);
      this.magic += randomMagic;
      this.magicPotion--;
      console.log(
        `\n${this.name} uses ${BLUE}magic potion.${ANSI} There are ${this.magicPotion} left. ${this.name} gained ${BLUE}${randomMagic} magic.${ANSI} ${this.name} magic is now ${BLUE}${this.magic}.${ANSI}\n`
      );
      return randomMagic;
    } else {
      console.log(`${this.name} dont has any magic potions!`);
    }
  }
  getHealth() {
    if (this.healthPotion > 0) {
      const randomHealth = Math.floor(Math.random() * 50);
      this.health += randomHealth;
      this.healthPotion--;
      console.log(
        `\n${this.name} uses ${BLUE}health potion.${ANSI} There are ${this.healthPotion} left. ${this.name} gained ${BLUE}${randomHealth} health.${ANSI} ${this.name} health is now ${BLUE}${this.health}.${ANSI}\n`
      );
      return randomHealth;
    } else {
      console.log(`${this.name} dont has any health potions!`);
    }
  }
  showSkills() {
    console.log(`\nSkills learned by ${this.name}:\n`);
    if (this.skills.length === 0) {
      console.log("No skills learned yet.");
    } else {
      this.skills.forEach((skill) => {
        console.log(
          `${BLUE}${skill.attack}${ANSI} (Damage: ${skill.damage}, Magic: ${skill.magic})`
        );
      });
    }
  }
  hasEnoughMagic(skillName) {
    const skill = this.skills
      .flat()
      .find((skill) => skill.attack === skillName);
    if (skill) {
      const hasEnoughMagic = this.magic >= skill.magic;
      return hasEnoughMagic;
    }

    return false;
  }

  isAlive() {
    return this.health > 0;
  }
  attack(skillName, opponent) {
    if (this.hasEnoughMagic(skillName)) {
      const skill = this.skills.find((skill) => skill.attack === skillName);
      if (skill) {
        this.magic -= skill.magic;
        let critChance = [Math.floor(Math.random() * 10)];
        if (critChance >= 8) {
          skill.damage = skill.damage * 2;
          opponent.health -= skill.damage;
          this.counter++;
          console.log(
            `\n${CYAN}<%%%%|==========> Attack Start${ANSI}\n\n${RED}CRITICAL HIT!${ANSI}\n\n${GREEN}${this.name}${ANSI} attacks ${RED}${opponent.name}${ANSI} with ${BLUE}${skill.attack}${ANSI} inflicting ${RED}${skill.damage} critical damage.${ANSI}\n`
          );
          this.showStatus();
          opponent.showStatus();
          console.log(`\n${CYAN}<%%%%|==========> Attack End${ANSI}`);
        } else {
          opponent.health -= skill.damage;
          this.counter++;
          console.log(
            `\n${CYAN}<%%%%|==========> Attack Start${ANSI}\n\n${GREEN}${this.name}${ANSI} attacks ${RED}${opponent.name}${ANSI} with ${BLUE}${skill.attack}${ANSI} inflicting ${RED}${skill.damage} damage.${ANSI}\n`
          );
          this.showStatus();
          opponent.showStatus();
          console.log(`\n${CYAN}<%%%%|==========> Attack End${ANSI}`);
        }
      } else {
        console.log(`${RED}Not enough magic!${ANSI}`);
      }
    }
  }
  counterAttack(selectedPokemon, randomAttackSkill) {
    let critChance = [Math.floor(Math.random() * 10)];
    if (critChance >= 8) {
      this.magic -= randomAttackSkill.magic;
      randomAttackSkill.damage = randomAttackSkill.damage * 2;
      selectedPokemon.health -= randomAttackSkill.damage;
      console.log(
        `\n${CYAN}<%%%%|==========> Counter Attack Start${ANSI}\n\n${RED}CRITICAL HIT!${ANSI}\n\n${RED}${this.name}${ANSI} counters ${GREEN}${selectedPokemon.name}${ANSI} with ${BLUE}${randomAttackSkill.attack}${ANSI} inflicting ${RED}${randomAttackSkill.damage} critical damage.${ANSI}\n`
      );
    } else {
      this.magic -= randomAttackSkill.magic;
      selectedPokemon.health -= randomAttackSkill.damage;
      console.log(
        `\n${CYAN}<%%%%|==========> Counter Attack Start${ANSI}\n\n${RED}${this.name}${ANSI} counters ${GREEN}${selectedPokemon.name}${ANSI} with ${BLUE}${randomAttackSkill.attack}${ANSI} inflicting ${RED}${randomAttackSkill.damage} damage.${ANSI}\n`
      );
    }
    this.showStatus();
    selectedPokemon.showStatus();
    console.log(`\n${CYAN}<%%%%|==========> Counter Attack End${ANSI}`);
  }
}
export class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}
