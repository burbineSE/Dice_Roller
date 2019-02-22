class dmgSpell {
  //inits the ID, name of the spell, its level, the level it was cast at, the dice it uses,
  //the number of dice it uses, the number of dice per level it adds and the damage type
  constructor(id, name, lvl, lvlCastAt, dmgD, numDmgD, numDDPerLevel, dmgType, dmgDice2, numDmgDice2, numDmgDicePerLevel2, dmgType2, dmgBonusType, dmgBonus, dmgBonusPerDice) {
    this.id = id;
    this.name = name;
    this.lvl = lvl;
    this.lvlCastAt = lvlCastAt;
    this.dmgD = dmgD;
    this.numDmgD = numDmgD;
    this.numDDPerLevel = numDDPerLevel;
    this.dmgType = dmgType;
    this.dmgDice2 = dmgDice2;
    this.numDmgDice2 = numDmgDice2;
    this.numDmgDicePerLevel2 = numDmgDicePerLevel2;
    this.dmgType2 = dmgType2;
    this.dmgBonusType = dmgBonusType;
    this.dmgBonus = dmgBonus
    this.dmgBonusPerDice = dmgBonusPerDice;
  }

  get cast() {
    var returnString;
    //returns the total number of dice needed for a spell cast
    var totalDice = this.checkLevel();
    
    var bonusDmg = this.getDmgBonus(totalDice);

    //loads rolled dice into array
    var dmgArray = this.castSpell(totalDice, this.dmgD);
    //creates a string of rolls for output
    var diceString = dmgArray.join(", ");
    var dmg = 0;
    //totals damage
    for (var x = 0; x < dmgArray.length; ++x) {
      dmg = dmg + dmgArray[x];
    }
    dmg = dmg + bonusDmg;
    //finds half damage
    var halfDmg = dmg / 2;
    //rounded up
    var halfDmgU = Math.ceil(halfDmg);
    //rounded down
    var halfDmgD = Math.floor(halfDmg);
    
    var secondaryTotalDice = -1, secondaryDmgArray, secondaryDiceString, secondaryDmg = 0, secondaryHalfDmg, secondaryHalfDmgU, secondaryHalfDmgD;
    if(this.dmgDice2 != -1){
      secondaryTotalDice = this.checkLevelSecondaryDamage();
      secondaryDmgArray = this.castSpell(secondaryTotalDice, this.dmgDice2);
      secondaryDiceString = secondaryDmgArray.join(", ");
      for(var x = 0; x < secondaryDmgArray.length; x++){
        secondaryDmg = secondaryDmg + secondaryDmgArray[x];
      }
      secondaryHalfDmg = secondaryDmg / 2;
      secondaryHalfDmgU = Math.ceil(secondaryHalfDmg);
      secondaryHalfDmgD = Math.floor(secondaryHalfDmg);

      if(bonusDmg == 0){
        returnString = this.name + ": " + dmg + " [" + diceString + "] " + 
          this.dmgType + " (Rounded Up " + halfDmgU + " / Rounded Down " + halfDmgD + ") and " +
          secondaryDmg + " [" + secondaryDiceString + "] " + this.dmgType2 + " (Rounded Up " + 
          secondaryHalfDmgU + " / Rounded Down " + secondaryHalfDmgD + ").";
      }
      else{
        returnString = this.name + ": " + dmg + " [" + diceString + "] + " + bonusDmg + " " +
          this.dmgType + " (Rounded Up " + halfDmgU + " / Rounded Down " + halfDmgD + ") and " +
          secondaryDmg + " [" + secondaryDiceString + "] " + this.dmgType2 + " (Rounded Up " + 
          secondaryHalfDmgU + " / Rounded Down " + secondaryHalfDmgD + ").";
      }
    }
    else{
      if(bonusDmg == 0){
        returnString = this.name + ": " + dmg + " [" + diceString + "] " + 
          this.dmgType + " (Rounded Up " + halfDmgU + " / Rounded Down " + halfDmgD + ")." 
      }
      else{
        returnString = this.name + ": " + dmg + " [" + diceString + "] + " + bonusDmg + " " +
          this.dmgType + " (Rounded Up " + halfDmgU + " / Rounded Down " + halfDmgD + ")." 
      }
    }
    
    //output string showing the name of the spell, the dice rolled, the type of damage and half damage
    return returnString;
  }
  castSpell(totalDice, dmgDiceType) {
    var rolledNum = 0;
    //declares array the length of the total number of dice
    var rolledArr = new Array(totalDice);
    for (var x = 0; x < totalDice; ++x) {
      //rolls a number between 1 and the max on a given dice
      rolledNum = Math.floor(Math.random() * dmgDiceType) + 1;
      //adds that number to the array
      rolledArr[x] = rolledNum;
    }
    //returns array
    return rolledArr;
  }
  checkLevel() {
    var diff = 0;

    //makes sure no spell over lvlv 9 can be cast
    if (this.lvlCastAt > 9) {
      this.lvlCastAt = 9;
    }
    //makes sure that a spell cannot be cast useing a slot of lower level
    if (this.lvlCastAt < this.lvl) {
      this.lvlCastAt = this.lvl;
    }

    //mult the differnace in lvl and lvl cast at by damage dice per lvl to determine number of extra dice
    if (this.lvlCastAt > this.lvl) {
      diff = this.lvlCastAt - this.lvl;
      diff = diff * this.numDDPerLevel;
    }

    //returns total dice
    return this.numDmgD + diff;
  }

  checkLevelSecondaryDamage(){
    var differnace = 0;
    if(this.lvlCastAt > 9){
      this.lvlCastAt = 9;
    }
    if(this.lvlCastAt > this.lvl){
      differnace = this.lvlCastAt - this.lvl;
      differnace = differnace * this.numDmgDicePerLevel2;
    }
    return this.numDmgDice2 + differnace;
  }

  getDmgBonus(totalDice) {
    var bonusType = this.dmgBonusType;
    if(bonusType == "none"){
      return 0;
    }
    else if(bonusType == "flat"){
      if(this.dmgBonus > 0){
        return this.dmgBonus;
      }
      else if(this.dmgBonusPerDice > 0){
        return (this.dmgBonusPerDice * totalDice);
      }
    }
    else if(bonusType == "mod"){
      return CurrentPlayerChacater.CastingModifier;
    }
  }
}

class dmgCantrip {
  //inits the ID, the name, the character's level, the damage dice used and the the damage type
  constructor(id, name, charLvl, dmgD, dmgType) {
    this.id = id;
    this.name = name;
    this.charLvl = charLvl;
    this.dmgD = dmgD;
    this.dmgType = dmgType;
  }

  //casts current spell
  get cast() {
    //number of damage dice based on character level
    var numDmgD = 0;
    //total damge
    var dmg = 0;
    //array of dice rolled
    var diceArray;

    //gets char level
    numDmgD = this.checkLevel();
    //pulls array of rolled dice
    diceArray = this.castSpell(numDmgD);
    //adds vals together
    for (var x = 0; x < numDmgD; ++x) {
      dmg = dmg + diceArray[x];
    }
    //formats the output
    var diceString = diceArray.join(", ");
    //output
    return (
      this.name +
      " delt " +
      dmg +
      " [" +
      diceString +
      "] " +
      this.dmgType +
      " damage."
    );
  }

  //rolls the dice for the spell
  castSpell(numDmgD) {
    //temp for rolled number
    var rolledNum = 0;
    //rolled array
    var rolledArr = new Array(numDmgD);
    //moves through rolling dice based on the dmg dice and number of dice; adds rolls to array
    for (var x = 0; x < numDmgD; ++x) {
      rolledNum = Math.floor(Math.random() * this.dmgD) + 1;
      rolledArr[x] = rolledNum;
    }
    //returns array
    return rolledArr;
  }

  //checks char current level
  checkLevel() {
    //returns number based on current level or 1 if input bad
    if (this.charLvl < 5) {
      return 1;
    }
    if (this.charLvl >= 5 && this.charLvl < 11) {
      return 2;
    }
    if (this.charLvl >= 11 && this.charLvl < 17) {
      return 3;
    }
    if (this.charLvl >= 17) {
      return 4;
    }

    return 1;
  }
}

class PlayerChacater{
  constructor(id, name, characterClass, level, Proficiency, CastingScore, CastingModifier){
    this.id = id;
    this.name = name;
    this.characterClass = characterClass;
    this.level = level;
    this.Proficiency = Proficiency;
    this.CastingScore = CastingScore;
    this.CastingModifier = CastingModifier;
  }

  get setCharacterClass(){
    this.characterClass = document.getElementById("pc-class").value;
  }

  get setCharacterLevel(){
    this.level = document.getElementById("chacaterLevel-select").value;
    this.Proficiency = this.getProficiency();

    this.calculateDCAttackMod();
  }
  
  getProficiency(){
    if(this.level >= 1 && this.level <= 4){
      return 2;
    }
    else if(this.level >= 5 && this.level <= 8){
      return 3;
    }
    else if(this.level >= 9 && this.level <= 12){
      return 4;
    }
    else if(this.level >= 13 && this.level <= 16){
      return 5;
    }
    else if(this.level >= 17 && this.level <= 20){
      return 6;
    }

    return -1;
  }
  get setCharacterCastingScore(){
    this.CastingScore = document.getElementById("PC-CASTSTAT").value;
    this.CastingModifier = this.getCastingMod();

    this.calculateDCAttackMod();
  }
  getCastingMod(){
    var mod = (this.CastingScore - 10) / 2;
    return Math.floor(mod);
  }

  calculateDCAttackMod(){
    var spellSaveDC = 8 + this.Proficiency + this.CastingModifier;
    var saveDCOut = "Spell Save DC: " + spellSaveDC;
    document.getElementById("SpellSaveDC").innerHTML = saveDCOut;

    var spellAttackMod = this.Proficiency + this.CastingModifier;
    var spellAttackOut = "Spell Attack Mod: " + spellAttackMod;
    document.getElementById("SpellAttackMod").innerHTML = spellAttackOut;
  }

  get displayCharacterStats(){
    console.log("Player class: " + CurrentPlayerChacater.characterClass);
    console.log("Player level: " + CurrentPlayerChacater.level);
    console.log("Player Proficiency: " + CurrentPlayerChacater.Proficiency);
    console.log("Player Casting Score: " + CurrentPlayerChacater.CastingScore);
    console.log("Player Casting Modifier: " + CurrentPlayerChacater.CastingModifier);
    console.log("---");
  }
}

const CurrentPlayerChacater = new PlayerChacater("PC-ID", "PLAYER", "", 1, 2, 8, -1);

//current list of declared spells, missing some ATM due to odd cases not handled in the dmgCantrip or dmgSpell classes

//Damaging Cantrips
const acidSpl = new dmgCantrip("can-as", "Acid Splash", 1, 6, "acid");
const chillTou = new dmgCantrip("can-ct", "Chill Touch", 1, 8, "necrotic");
const createBon = new dmgCantrip("can-cb", "Create Bonfire", 1, 8, "fire");
const eldritchBlast = new dmgCantrip("can-eb", "Eldritch Blast", 1, 10, "force");
const fireBolt = new dmgCantrip("can-fb", "Fire Bolt", 1, 10, "fire");
const forstbite = new dmgCantrip("can-f", "Forstbite", 1, 6, "cold");
const infestation = new dmgCantrip("can-i", "Infestation", 1, 6, "poison");
const poisonSp = new dmgCantrip("can-ps", "Poison Spray", 1, 12, "poison");
const primeSav = new dmgCantrip("can-prs", "Primal Savagery", 1, 10, "acid");
const prodFlame = new dmgCantrip("can-pf", "Produce Flame", 1, 8, "fire");
const rayOfForst = new dmgCantrip("can-rof", "Ray of Forst", 1, 8, "cold");
const sacrFlame = new dmgCantrip("can-sf", "Sacred Flame", 1, 8, "radiant");
const shockGrasp = new dmgCantrip("can-sg", "Shocking Grasp", 1, 8, "lighting");
const thornWhip = new dmgCantrip("can-tw", "Thorn Whip", 1, 6, "piercing");
const thunderclap = new dmgCantrip("can-tc", "Thunderclap", 1, 6, "thunder");
const tollTheDead = new dmgCantrip("can-ttd", "Toll the Dead (d8)", 1, 8, "necrotic");
const tollTheDead2 = new dmgCantrip("can-ttd2", "Toll the Dead (d12)", 1, 12, "necrotic");
const viciousMock = new dmgCantrip("can-vm", "Vicious Mockery", 1, 4, "psychic");
const wordOfRad = new dmgCantrip("can-wr", "Word of Radiance", 1, 6, "radiance");

//First Level Spells
const armsOfHad = new dmgSpell("s1-aoh", "Arms of Hadar", 1, 1, 6, 2, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);
const burningHand = new dmgSpell("s1-bh", "Burning Hands", 1, 1, 6, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const catapult = new dmgSpell("s1-cata", "Catapult", 1, 1, 8, 3, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const chaosBolt = new dmgSpell("s1-cb", "Chaos Bolt", 1, 1, 8, 2, 0, "", 6, 1, 1, "", "none", 0, 0);
const chromOrb = new dmgSpell("s1-co", "Chromatic Orb", 1, 1, 8, 3, 1, "", -1, -1, -1, "", "none", 0, 0);
const colorSp = new dmgSpell("s1-cs", "Color Spray", 1, 1, 10, 6, 2, "", -1, -1, -1, "", "none", 0, 0);
const cureWound = new dmgSpell("s1-cw", "Cure Wounds", 1, 1, 8, 1, 1, "healing", -1, -1, -1, "none", "mod", 0, 0);
const dissWhisper = new dmgSpell("s1-dw", "Dissonant Whispers", 1, 1, 6, 3, 1, "psychic", -1, -1, -1, "", "none", 0, 0);
const earthTrem = new dmgSpell("s1-et", "Earth Tremor", 1, 1, 6, 1, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const ensnarStrike = new dmgSpell("s1-es", "Ensnaring Strike", 1, 1, 6, 1, 1, "piercing", -1, -1, -1, "", "none", 0, 0);
const guidBolt = new dmgSpell("s1-gb", "Guiding Bolt", 1, 1, 6, 4, 1, "radiant", -1, -1, -1, "", "none", 0, 0);
const hailOfThorn = new dmgSpell("s1-hot", "Hail of Thorns", 1, 1, 10, 1, 1, "piercing", -1, -1, -1, "", "none", 0, 0);
const healWord = new dmgSpell("s1-hw", "Healing Word", 1, 1, 4, 1, 1, "healing", -1, -1, -1, "", "mod", 0, 0);
const hellRebuke = new dmgSpell("s1-hr", "Hellish Rebuke", 1, 1, 10, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const iceKnife = new dmgSpell("s1-ik", "Ice Knife", 1, 1, 10, 1, 0, "piercing", 6, 2, 1, "cold", "none", 0, 0);
const inflictWound = new dmgSpell("s1-iw", "Inflict Wounds", 1, 1, 10, 3, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);
const magicMissle = new dmgSpell("s1-mm", "Magic Missle", 1, 1, 4, 3, 11, "force", -1, -1, -1, "", "flat", 0, 1);
const rayOfSick = new dmgSpell("s1-ros", "Ray of Sickness", 1, 1, 8, 2, 1, "poison", -1, -1, -1, "", "none", 0, 0);
const searSmite = new dmgSpell("s1-ss", "Searing Smite", 1, 1, 6, 1, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const thundSmite = new dmgSpell("s1-ts", "Thunderous Smite", 1, 1, 6, 2, 0, "thunder", -1, -1, -1, "", "none", 0, 0);
const thunderw = new dmgSpell("s1-tw", "Thunderwave", 1, 1, 8, 2, 1, "thunder", -1, -1, -1, "", "none", 0, 0);
const witchBolt = new dmgSpell("s1-wb", "Witch Bolt", 1, 1, 12, 1, 1, "lightning", -1, -1, -1, "", "none", 0, 0);
const wrathSmite = new dmgSpell("s1-ws", "Wrathful Smite", 1, 1, 6, 1, 0, "psychic", -1, -1, -1, "", "none", 0, 0);
const zephStrike = new dmgSpell("s1-zs", "Zephyr Strike", 1, 1, 8, 1, 0, "force", -1, -1, -1, "", "none", 0, 0);

//Second Level Spells
const agScorch = new dmgSpell("s2-as", "Aganazzar’s Scorcher", 2, 2, 8, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const brandSmite = new dmgSpell("s2-bs", "Branding Smite", 2, 2, 6, 2, 1, "radiant", -1, -1, -1, "", "none", 0, 0);
const cloudDagger = new dmgSpell("s2-cd", "Cloud of Daggers", 2, 2, 4, 4, 2, "slashing", -1, -1, -1, "", "none", 0, 0);
const dragonBre = new dmgSpell("s2-db", "Dragon’s Breath", 2, 2, 6, 3, 1, "", -1, -1, -1, "", "none", 0, 0);
const dustDevil = new dmgSpell("s2-dd", "Dust Devil", 2, 2, 8, 1, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const flameBlade = new dmgSpell("s2-fb", "Flame Blade", 2, 2, 6, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const flameSph = new dmgSpell("s2-fs", "Flaming Sphere", 2, 2, 6, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const healSpirit = new dmgSpell("s2-hs", "Healing Spirit", 2, 2, 1, 1, 1, "healing", -1, -1, -1, "", "none", 0, 0);
const heatMetal = new dmgSpell("s2-hm", "Heat Metal", 2, 2, 8, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const earthGrasp = new dmgSpell("s2-meg", "Maximilian’s Earthen Grasp", 2, 2, 6, 2, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const melfAcidArrow = new dmgSpell("s2-maa", "Melf's Acid Arrow", 2, 2, 4, 4, 1, "acid", 4, 2, 1, "acid", "none", 0, 0);
const mindSpike = new dmgSpell("s2-ms", "Mind Spike", 2, 2, 8, 3, 1, "psychic", -1, -1, -1, "", "none", 0, 0);
const moonbeam = new dmgSpell("s2-mb", "Moonbeam", 2, 2, 10, 2, 1, "radiant", -1, -1, -1, "", "none", 0, 0);
const paryerOfHealing = new dmgSpell("s2-poh", "Prayer of Healing", 2, 2, 8, 2, 1, "healing", -1, -1, -1, "", "none", 0, 0);
const scorchingRay = new dmgSpell("s2-sr", "Scorching Ray", 2, 2, 6, 6, 2, "fire", -1, -1, -1, "", "none", 0, 0);
//Shadow Blade - dmg increase every 2 lvls rather then every level
const shatter = new dmgSpell("s2-sh", "Shatter", 2, 2, 8, 3, 1, "thunder", -1, -1, -1, "", "none", 0, 0);
const snowballSt = new dmgSpell("s2-sss", "Snilloc’s Snowball Swarm", 2, 2, 6, 3, 1, "cold", -1, -1, -1, "", "none", 0, 0);
const spikeGrow = new dmgSpell("s2-sg", "Spike Growth", 2, 2, 4, 2, 0, "piercing", -1, -1, -1, "", "none", 0, 0);
const spiritualWeapon = new dmgSpell("s2-sw", "Spiritual Weapon", 2, 2, 8, 1, 1, "force", -1, -1, -1, "", "mod", 0, 0);

//Third Level Spell
const blindSmite = new dmgSpell("s3-bs", "Blinding Smite", 3, 3, 8, 3, 0, "radiant", -1, -1, -1, "", "none", 0, 0);
const callLightning = new dmgSpell("s3-cl", "Call Lightning", 3, 3, 10, 3, 1, "lightning", -1, -1, -1, "", "none", 0, 0);
const conjureBarr = new dmgSpell("s3-cb", "Conjure Barrage", 3, 3, 8, 3, 0, "", -1, -1, -1, "", "none", 0, 0);
const fireball = new dmgSpell("s3-fb", "Fireball", 3, 3, 6, 8, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const hungerOfHadar = new dmgSpell("s3-hoh", "Hunger of Hadar", 3, 3, 6, 2, 0, "cold", 6, 2, 0, "acid", "none", 0, 0);
const lifeTrans = new dmgSpell("s3-lt", "Life Transference", 3, 3, 8, 4, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);
const lightningArrow = new dmgSpell("s3-la", "Lightning Arrow", 3, 3, 8, 4, 1, "lightning", -1, -1, -1, "", "none", 0, 0);
const lightningBolt = new dmgSpell("s3-lb", "Lightning Bolt", 3, 3, 6, 8, 1, "lightning", -1, -1, -1, "", "none", 0, 0);
const massHealingWord = new dmgSpell("s3-mhw", "Mass Healing Word", 3, 3, 4, 1, 1, "healing", -1, -1, -1, "", "mod", 0, 0);
const melfMinuteMeteor = new dmgSpell("s3-mmm", "Melf’s Minute Meteors", 3, 3, 6, 2, 0, "fire", -1, -1, -1, "", "none", 0, 0);
const spiritGuard = new dmgSpell("s3-sg", "Spirit Guardians", 3, 3, 8, 3, 1, "radiant/necrotic", -1, -1, -1, "", "none", 0, 0);
const thunderStep = new dmgSpell("s3-ts", "Thunder Step", 3, 3, 10, 3, 1, "thunder", -1, -1, -1, "", "none", 0, 0);
const tidalWave = new dmgSpell("s3-tw", "Tidal Wave", 3, 3, 8, 4, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const vampTouch = new dmgSpell("s3-vt", "Vampiric Touch", 3, 3, 6, 3, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);

//Fourth Level Spell
const blight = new dmgSpell("s4-bl", "Blight", 4, 4, 8, 8, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);
const evardBlack = new dmgSpell("s4-ebt", "Evard’s Black Tentacles", 4, 6, 3, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const fireShield = new dmgSpell("s4-fs", "Fire Shield", 4, 4, 8, 2, 0, "fire/cold", -1, -1, -1, "", "none", 0, 0);
const iceStorm = new dmgSpell("s4-is", "Ice Storm", 4, 4, 8, 2, 1, "bludgeoning", 6, 4, 0, "cold", "none", 0, 0);
const phantasmalKiller = new dmgSpell("s4-pk", "Phantasmal Killer", 4, 4, 10, 4, 1, "psychic", -1, -1, -1, "", "none", 0, 0);
const shadowMoil = new dmgSpell("s4-sm", "Shadow of Moil", 4, 4, 8, 2, 0, "necrotic", -1, -1, -1, "", "none", 0, 0);
const sickRadiance = new dmgSpell("s4-sr", "Sickening Radiance", 4, 4, 10, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0);
const staggerSmite = new dmgSpell("s4-ss", "Staggering Smite", 4, 4, 6, 4, 0, "psychic", -1, -1, -1, "", "none", 0, 0);
const stormSphere = new dmgSpell("s4-sts", "Storm Sphere", 4, 4, 6, 2, 1, "bludgeoning", 6, 4, 1, "lightning", "none", 0, 0);
const vitriolicSphere = new dmgSpell("s4-vs", "Vitriolic Sphere", 4, 4, 4, 10, 2, "acid", 4, 5, 0, "acid", "none", 0, 0);
const wallFire = new dmgSpell("s4-wf", "Wall of Fire", 4, 4, 8, 5, 1, "fire", -1, -1, -1, "", "none", 0, 0);

//Fifth Level Spells
//Animate Objects - muti dmg dice types
const banishSmite = new dmgSpell("s5-bs", "Banishing Smite", 5, 5, 10, 5, 0, "force", -1, -1, -1, "", "none", 0, 0);
const bigbyFist = new dmgSpell("s5-bcf", "Bigby’s Clenched Fist", 5, 5, 8, 4, 2, "force", -1, -1, -1, "", "none", 0, 0);
const bigbysGraspingHand = new dmgSpell("s5-bgh", "Bigby’s Hand Grasping Hand", 5, 5, 6, 2, 2, "bludgeoning", -1, -1, -1, "", "mod", 0, 0);
const cloudkill = new dmgSpell("s5-ck", "Cloudkill", 5, 5, 8, 5, 1, "poison", -1, -1, -1, "", "none", 0, 0);
const coneCold = new dmgSpell("s5-cc", "Cone of Cold", 5, 5, 8, 8, 1, "cold", -1, -1, -1, "", "none", 0, 0);
const conjVolley = new dmgSpell("s5-cv", "Conjure Volley", 5, 5, 8, 8, 0, "", -1, -1, -1, "", "none", 0, 0);
const dawn = new dmgSpell("s5-d", "Dawn", 5, 5, 10, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0);
const destructiveWave = new dmgSpell("s5-dw", "Destructive Wave", 5, 5, 6, 5, 0, "thunder", 6, 5, 0, " radiant or necrotic", "none", 0, 0);
const enervation = new dmgSpell("s5-en", "Enervation", 5, 5, 8, 4, 1, "necrotic", -1, -1, -1, "", "none", 0, 0);
const flameStrike = new dmgSpell("s5-fs", "Flame Strike", 5, 5, 6, 4, 1, "fire", 6, 4, 0, "radiant", "none", 0, 0);
const immolation = new dmgSpell("s5-i", "Immolation", 5, 5, 6, 8, 0, "fire", 6, 4, 0, "fire", "none", 0, 0);
const insectPlague = new dmgSpell("s5-ip", "Insect Plague", 5, 5, 10, 4, 1, "piercing", -1, -1, -1, "", "none", 0, 0);
const maelstrom = new dmgSpell("s5-ms", "Maelstrom", 5, 5, 6, 6, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0);
const massCureWounds = new dmgSpell("s5-mcw", "Mass Cure Wounds", 5, 5, 8, 3, 1, "healing", -1, -1, -1, "", "mod", 0, 0);
const negEnergyFlood = new dmgSpell("s5-nef", "Negative Energy Flood", 5, 5, 12, 5, 0, "necrotic", -1, -1, -1, "", "none", 0, 0);
const steelWind = new dmgSpell("s5-sws", "Steel Wind Strike", 5, 5, 10, 6, 0, "force", -1, -1, -1, "", "none", 0, 0);
const synapStatic = new dmgSpell("s5-ss", "Synaptic Static", 5, 5, 6, 8, 0, "psychic", -1, -1, -1, "", "none", 0, 0);

//Sixth Level Spell
const bladeBarr = new dmgSpell("s6-bb", "Blade Barrier", 6, 6, 10, 6, 0, "slashing", -1, -1, -1, "", "none", 0, 0);
const chainLightning = new dmgSpell("s6-cl", "Chain Lightning", 6, 6, 8, 10, 0, "lightning", -1, -1, -1, "", "none", 0, 0);
const circleDeath = new dmgSpell("s6-cd", "Circle of Death", 6, 6, 6, 8, 2, "necrotic", -1, -1, -1, "", "none", 0, 0);
const disintegrate = new dmgSpell("s6-d", "Disintegrate", 6, 6, 6, 10, 3, "force", -1, -1, -1, "", "flat", 40, 0);
const freezSphere = new dmgSpell("s6-fs", "Otiluke’s Freezing Sphere", 6, 6, 6, 10, 1, "cold", -1, -1, -1, "", "none", 0, 0);
const harm = new dmgSpell("s6-harm", "Harm", 6, 6, 6, 14, 0, "necrotic", -1, -1, -1, "", "none", 0, 0);
const mentalPrison = new dmgSpell("s6-mp", "Mental Prison", 6, 6, 10, 5, 0, "psychic", 10, 10, 0, "psychic", "none", 0, 0);
const sunBeam = new dmgSpell("s6-sb", "Sun Beam", 6, 6, 8, 6, 0, "radiant", -1, -1, -1, "", "none", 0, 0);

//Seventh Level Spell
const crownStar = new dmgSpell("s7-cs", "Crown of Stars", 7, 7, 12, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0);
const delayedBlastFB = new dmgSpell("s7-dbf", "Delayed Blast Fireball", 7, 7, 6, 12, 1, "fire", -1, -1, -1, "", "none", 0, 0);
const fingerOfDeath = new dmgSpell("s7-fod", "Finger of Death", 7, 7, 8, 7, 0, "necrotic", -1, -1, -1, "", "flat", 30, 0);
const fireStorm = new dmgSpell("s7-fs", "Fire Storm", 7, 7, 10, 7, 0, "fire", -1, -1, -1, "", "none", 0, 0);
const mordenSword = new dmgSpell("s7-ms", "Mordenkainen’s Sword", 7, 7, 10, 3, 0, "force", -1, -1, -1, "", "none", 0, 0);
const prismaticSpray = new dmgSpell("s7-ps", "Prismatic Spray", 7, 7, 6, 10, 0, "", -1, -1, -1, "", "none", 0, 0);
const regenerate = new dmgSpell("s7-r", "Regenerate", 7, 7, 8, 4, 0, "healing", -1, -1, -1, "", "flat", 15, 0);
const whirlwind = new dmgSpell("s7-ww", "Whirlwind", 7, 7, 6, 10, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0);

//Eighth Level Spell
const horridWither = new dmgSpell("s8-hw", "Abi-Dalzim’s Horrid Wilting", 8, 8, 8, 12, 0, "necrotic", -1, -1, -1, "", "none", 0, 0);
const illDragon = new dmgSpell("s8-id", "Illusory Dragon", 8, 8, 6, 7, 0, "", -1, -1, -1, "", "none", 0, 0);
const incendCloud = new dmgSpell("s8-ic", "Incendiary Cloud", 8, 8, 8, 10, 0, "fire", -1, -1, -1, "", "none", 0, 0);
const madDarkness = new dmgSpell("s8-md", "Maddening Darkness", 8, 8, 8, 8, 0, "psychic", -1, -1, -1, "", "none", 0, 0);
const sunburst = new dmgSpell("s8-sb", "Sun Burst", 8, 8, 6, 12, 0, "radiant", -1, -1, -1, "", "none", 0, 0);
//Tsunami - deals damage over several rounds

//Ninth Level Spells
const meteorSwarm = new dmgSpell("s9-ms", "Meteor Swarm", 9, 9, 6, 20, 0, "fire", 6, 20, 0, "bludgeoning", "none", 0, 0);
const prismaticWall = new dmgSpell("s9-pw", "Prismatic Wall", 9, 9, 10, 6, 0, "", -1, -1, -1, "", "none", 0, 0);
const psychicScream = new dmgSpell("s9-ps", "Psychic Scream", 9, 9, 6, 14, 0, "psychic", -1, -1, -1, "", "none", 0, 0);
const stormOfV3 = new dmgSpell("s9-sv3", "Storm of Vengeance - Round 3", 9, 9, 6, 10, 0, "lightning", -1, -1, -1, "", "none", 0, 0);


var cantripArray = [
  acidSpl,
  chillTou,
  createBon,
  eldritchBlast,
  fireBolt,
  forstbite,
  infestation,
  poisonSp,
  primeSav,
  prodFlame,
  rayOfForst,
  sacrFlame,
  shockGrasp,
  thornWhip,
  thunderclap,
  tollTheDead,
  tollTheDead2,
  viciousMock,
  wordOfRad
];

var BardCantripArray = [
  thunderclap, 
  viciousMock
];
var ClericCantripArray = [
  sacrFlame, 
  tollTheDead, 
  tollTheDead2,
  wordOfRad
];
var DruidCantripArray = [
  createBon,
  forstbite,
  infestation,
  poisonSp,
  primeSav,
  prodFlame,
  thornWhip,
  thunderclap
];
var SorcererCantripArray = [
  acidSpl,
  chillTou,
  createBon,
  fireBolt,
  forstbite,
  infestation,
  poisonSp,
  rayOfForst,
  shockGrasp,
  thunderclap
];
var WarlockCantripArray = [
  chillTou,
  createBon,
  eldritchBlast,
  forstbite,
  infestation,
  poisonSp,
  thunderclap,
  tollTheDead,
  tollTheDead2
];  
var WizardCantripArray =[
  acidSpl,
  chillTou,
  createBon,
  fireBolt,
  forstbite,
  infestation,
  poisonSp,
  rayOfForst,
  shockGrasp,
  thunderclap,
  tollTheDead,
  tollTheDead2
];


var spellArray = [
  armsOfHad,
  burningHand,
  catapult,
  chaosBolt,
  chromOrb,
  colorSp,
  cureWound,
  dissWhisper,
  earthTrem,
  ensnarStrike,
  guidBolt,
  hailOfThorn,
  healWord,
  hellRebuke,
  iceKnife,
  inflictWound,
  magicMissle,
  rayOfSick,
  searSmite,
  thundSmite,
  thunderw,
  witchBolt,
  wrathSmite,
  zephStrike,
  agScorch,
  brandSmite,
  cloudDagger,
  dragonBre,
  dustDevil,
  flameBlade,
  flameSph,
  healSpirit,
  heatMetal,
  earthGrasp,
  melfAcidArrow,
  mindSpike,
  moonbeam,
  paryerOfHealing,
  scorchingRay,
  shatter,
  snowballSt,
  spikeGrow,
  spiritualWeapon,
  blindSmite,
  callLightning,
  conjureBarr,
  fireball,
  hungerOfHadar,
  lifeTrans,
  lightningArrow,
  lightningBolt,
  massHealingWord,
  melfMinuteMeteor,
  spiritGuard,
  thunderStep,
  tidalWave,
  vampTouch,
  blight,
  evardBlack,
  fireShield,
  iceStorm,
  phantasmalKiller,
  shadowMoil,
  sickRadiance,
  staggerSmite,
  stormSphere,
  vitriolicSphere,
  wallFire,
  banishSmite,
  bigbyFist,
  bigbysGraspingHand,
  cloudkill,
  coneCold,
  conjVolley,
  dawn,
  destructiveWave,
  enervation,
  flameStrike,
  immolation,
  insectPlague,
  maelstrom,
  massCureWounds,
  negEnergyFlood,
  steelWind,
  synapStatic,
  bladeBarr,
  chainLightning,
  circleDeath,
  disintegrate,
  freezSphere,
  harm,
  mentalPrison,
  sunBeam,
  crownStar,
  delayedBlastFB,
  fingerOfDeath,
  fireStorm,
  mordenSword,
  prismaticSpray,
  regenerate,
  whirlwind,
  horridWither,
  illDragon,
  incendCloud,
  madDarkness,
  sunburst,
  meteorSwarm,
  prismaticWall,
  psychicScream,
  stormOfV3
];

var currentID = 0;
var currentLvl = 0;
var currentSpell;

//shows and hides spell level based on user input
//!!! posible change: move char level to of selection and populate spell level based on char level
function showSpells(selectLvl) {
  document.getElementById("cantrips").style.display = "none";
  document.getElementById("s1").style.display = "none";
  document.getElementById("s2").style.display = "none";
  document.getElementById("s3").style.display = "none";
  document.getElementById("s4").style.display = "none";
  document.getElementById("s5").style.display = "none";
  document.getElementById("s6").style.display = "none";
  document.getElementById("s7").style.display = "none";
  document.getElementById("s8").style.display = "none";
  document.getElementById("s9").style.display = "none";
  //document.getElementById("c-level").style.display = "none";
  document.getElementById("lvlCast").style.display = "none";
  document.getElementById("castS").style.display = "none";
  document.getElementById("output").style.display = "none";

  if (selectLvl.value == "cantrips") {
    document.getElementById("cantrips").style.display = "inline";
  } else if (selectLvl.value == "s1") {
    document.getElementById("s1").style.display = "inline";
  } else if (selectLvl.value == "s2") {
    document.getElementById("s2").style.display = "inline";
  } else if (selectLvl.value == "s3") {
    document.getElementById("s3").style.display = "inline";
  } else if (selectLvl.value == "s4") {
    document.getElementById("s4").style.display = "inline";
  } else if (selectLvl.value == "s5") {
    document.getElementById("s5").style.display = "inline";
  } else if (selectLvl.value == "s6") {
    document.getElementById("s6").style.display = "inline";
  } else if (selectLvl.value == "s7") {
    document.getElementById("s7").style.display = "inline";
  } else if (selectLvl.value == "s8") {
    document.getElementById("s8").style.display = "inline";
  } else if (selectLvl.value == "s9") {
    document.getElementById("s9").style.display = "inline";
  }
}

//called when after selcting on cantrip dropdown, shows char level and stores current cantrip into current spell
function selectCantrip(selectLvl) {
  //document.getElementById("c-s").selectedIndex = 0;
  if (selectLvl.value != "") {
    //document.getElementById("c-level").style.display = "inline";
    document.getElementById("castS").style.display = "inline";

    currentID = selectLvl.value;
    for (var x = 0; x < cantripArray.length; ++x) {
      if (currentID == cantripArray[x].id) {
        currentSpell = cantripArray[x];
        currentLvl = CurrentPlayerChacater.level;
        currentSpell.charLvl = currentLvl;
      }
    }
  } else {
    //document.getElementById("c-level").style.display = "none";
    document.getElementById("castS").style.display = "none";
  }
}

//called when selecting char level; stores level and into current spell
function showCastCantrip(level) {
  if (level.value != "") {
    document.getElementById("castS").style.display = "inline";

    currentLvl = level.value;
    currentSpell.charLvl = currentLvl;
  } else {
    document.getElementById("castS").style.display = "none";
  }
}

function showLevelCast(spell) {
  document.getElementById("s-lc").selectedIndex = 0;
  if (spell.value != "") {
    currentID = spell.value;
    for (var x = 0; x < spellArray.length; ++x) {
      if (currentID == spellArray[x].id) {
        currentSpell = spellArray[x];
      }
    }

    document.getElementById("lvlCast").style.display = "inline";
  } else {
    document.getElementById("lvlCast").style.display = "none";
  }
}

function showCastSpell(castLevel) {
  if (castLevel.value != "") {
    document.getElementById("castS").style.display = "inline";

    currentSpell.lvlCastAt = castLevel.value;
  } else {
    document.getElementById("castS").style.display = "none";
  }
}

function cast() {
  //console.log(currentSpell.cast);
  document.getElementById("output").style.display = "inline";
  document.getElementById("output").innerHTML = currentSpell.cast;
}

function classSelectIntoCastingStat(classSelection){
  document.getElementById("PCCastingStat").style.display = "none";
  document.getElementById("CastStatLabel").style.display = "none";
  document.getElementById("PC-CASTSTAT").style.display = "none";
  document.getElementById("CharacterLevelLabel").style.display = "none";
  document.getElementById("chacaterLevel-select").style.display = "none";

  if(classSelection.value == "Bard" || classSelection.value == "Paladin" || classSelection.value == "Sorcerer" || classSelection.value == "Warlock"){
    document.getElementById("CastStatLabel").innerHTML = "Please enter your Charisma score.";
    document.getElementById("PCCastingStat").style.display = "inline";
    document.getElementById("CastStatLabel").style.display = "inline";
    document.getElementById("PC-CASTSTAT").style.display = "inline";
    document.getElementById("CharacterLevelLabel").style.display = "inline";
    document.getElementById("chacaterLevel-select").style.display = "inline";
  }
  else if(classSelection.value == "Cleric" || classSelection.value == "Druid" || classSelection.value == "Monk" || classSelection.value == "Ranger"){
    document.getElementById("CastStatLabel").innerHTML = "Please enter your Wisdom score.";
    document.getElementById("PCCastingStat").style.display = "inline";
    document.getElementById("CastStatLabel").style.display = "inline";
    document.getElementById("PC-CASTSTAT").style.display = "inline";
    document.getElementById("CharacterLevelLabel").style.display = "inline";
    document.getElementById("chacaterLevel-select").style.display = "inline";
  }
  else if(classSelection.value == "Fighter" || classSelection.value == "Rogue" || classSelection.value == "Wizard"){
    document.getElementById("CastStatLabel").innerHTML = "Please enter your Intelligence score.";
    document.getElementById("PCCastingStat").style.display = "inline";
    document.getElementById("CastStatLabel").style.display = "inline";
    document.getElementById("PC-CASTSTAT").style.display = "inline";
    document.getElementById("CharacterLevelLabel").style.display = "inline";
    document.getElementById("chacaterLevel-select").style.display = "inline";
  }
}

function castingScoreIntoCharacterLevel(){
  document.getElementById("CharacterLevelLabel").style.display = "inline";
  document.getElementById("chacaterLevel-select").style.display = "inline";
}
