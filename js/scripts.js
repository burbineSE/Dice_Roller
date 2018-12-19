class dmgSpell{
    //inits the ID, name of the spell, its level, the level it was cast at, the dice it uses, 
    //the number of dice it uses, the number of dice per level it adds and the damage type
    constructor(id, name, lvl, lvlCastAt, dmgD, numDmgD, numDDPerLevel, dmgType){
        this.id = id;
        this.name = name;
        this.lvl = lvl;
        this.lvlCastAt = lvlCastAt;
        this.dmgD = dmgD;
        this.numDmgD = numDmgD;
        this.numDDPerLevel = numDDPerLevel;
        this.dmgType = dmgType;
    }

    get cast(){
        //returns the total number of dice needed for a spell cast
        var totalDice = this.checkLevel();
        //loads rolled dice into array
        var dmgArray = this.castSpell(totalDice);
        //creates a string of rolls for output
        var diceString = dmgArray.join(', ');
        var dmg = 0;
        //totals damage
        for(var x = 0; x < dmgArray.length; ++x){
            dmg = dmg + dmgArray[x];
        }
        //finds half damage
        var halfDmg = dmg / 2;
        //rounded up
        var halfDmgU = Math.ceil(halfDmg);
        //rounded down
        var halfDmgD = Math.floor(halfDmg);
        //output string showing the name of the spell, the dice rolled, the type of damage and half damage 
        return this.name + " delt " + dmg + " [" + diceString + "] " + this.dmgType  + " damage (R-Up " + halfDmgU + "/R-Down " + halfDmgD + ").";
    }
    castSpell(totalDice){
        var rolledNum = 0;
        //declares array the length of the total number of dice
        var rolledArr = new Array(totalDice);
        for(var x = 0; x < totalDice; ++x){
            //rolls a number between 1 and the max on a given dice
            rolledNum = Math.floor(Math.random() * this.dmgD) + 1;
            //adds that number to the array
            rolledArr[x] = rolledNum;
        }
        //returns array
        return rolledArr;
    }
    checkLevel(){
        var diff = 0;

        //makes sure no spell over lvlv 9 can be cast
        if(this.lvlCastAt > 9){
            this.lvlCastAt = 9;
        }
        //makes sure that a spell cannot be cast useing a slot of lower level
        if(this.lvlCastAt < this.lvl){
            this.lvlCastAt = this.lvl;
        }

        //mult the differnace in lvl and lvl cast at by damage dice per lvl to determine number of extra dice
        if(this.lvlCastAt > this.lvl){
            diff = this.lvlCastAt - this.lvl;
            diff = diff * this.numDDPerLevel;
        }

        //returns total dice
        return this.numDmgD + diff;
    }
}

class dmgCantrip{
    //inits the ID, the name, the character's level, the damage dice used and the the damage type
    constructor(id, name, charLvl, dmgD, dmgType){
        this.id = id;
        this.name = name;
        this.charLvl = charLvl;
        this.dmgD = dmgD;
        this.dmgType = dmgType;
    }

    //casts current spell
    get cast(){
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
        for(var x = 0; x < numDmgD; ++x){
            dmg = dmg + diceArray[x];
        }
        //formats the output
        var diceString = diceArray.join(', ');
        //output
        return this.name + " delt " + dmg + " [" + diceString + "] "+ this.dmgType + " damage.";
    }

    //rolls the dice for the spell
    castSpell(numDmgD){
        //temp for rolled number
        var rolledNum = 0;
        //rolled array
        var rolledArr = new Array(numDmgD);
        //moves through rolling dice based on the dmg dice and number of dice; adds rolls to array
        for(var x = 0; x < numDmgD; ++x){
            rolledNum = Math.floor(Math.random() * this.dmgD) + 1;
            rolledArr[x] = rolledNum;
        }
        //returns array
        return rolledArr;
    }

    //checks char current level
    checkLevel(){
        //returns number based on current level or 1 if input bad
        if(this.charLvl < 5){
            return 1;
        }
        if(this.charLvl >= 5 && this.charLvl < 11){
            return 2;
        }
        if(this.charLvl >= 11 && this.charLvl < 17){
            return 3;
        }
        if(this.charLvl >= 17){
            return 4;
        }

        return 1;
    }
}

//current list of declared spells, missing some ATM due to odd cases not handled in the dmgCantrip or dmgSpell classes 

//Damaging Cantrips
const acidSpl = new dmgCantrip('can-as', 'Acid Splash', 1, 6, 'acid');
const chillTou = new dmgCantrip('can-ct', 'Chill Touch', 1, 8, 'necrotic');
const createBon = new dmgCantrip('can-cb', 'Create Bonfire', 1, 8, 'fire');
//Eldritch Blast - attack rolls needed
const fireBolt = new dmgCantrip('can-fb', 'Fire Bolt', 1, 10, 'fire');
const forstbite = new dmgCantrip('can-f', 'Forstbite', 1, 6, 'cold');
const infestation = new dmgCantrip('can-i', 'Infestation', 1, 6, 'poison');
const poisonSp = new dmgCantrip('can-ps', 'Poison Spray', 1, 12, 'poison');
const primeSav = new dmgCantrip('can-prs', 'Primal Savagery', 1, 10, 'acid');
const prodFlame = new dmgCantrip('can-pf', 'Produce Flame', 1, 8, 'fire');
const rayOfForst = new dmgCantrip('can-rof', 'Ray of Forst', 1, 8, 'cold');
const sacrFlame = new dmgCantrip('can-sf', 'Sacred Flame', 1, 8, 'radiant');
const shockGrasp = new dmgCantrip('can-sg', 'Shocking Grasp', 1, 8, 'lighting');
const thornWhip = new dmgCantrip('can-tw', 'Thorn Whip', 1, 6, 'piercing');
const thunderclap = new dmgCantrip('can-tc', 'Thunderclap', 1, 6, 'thunder');
const tollTheDead = new dmgCantrip('can-ttd', 'Toll the Dead (d8)', 1, 8, 'necrotic');
const tollTheDead2 = new dmgCantrip('can-ttd2', 'Toll the Dead (d12)', 1, 12, 'necrotic');
const viciousMock = new dmgCantrip('can-vm', 'Vicious Mockery', 1, 4, 'psychic');
const wordOfRad = new dmgCantrip('can-wr', 'Word of Radiance', 1, 6, 'radiance');

//First Level Spells
const armsOfHad = new dmgSpell('s1-aoh', 'Arms of Hadar', 1, 1, 6, 2, 1, 'necrotic');
const burningHand = new dmgSpell('s1-bh', 'Burning Hands', 1, 1, 6, 3, 1, 'fire');
const catapult = new dmgSpell('s1-cata', 'Catapult', 1, 1, 8, 3, 1, 'bludgeoning');
//Chaos Bolt - two dice types in damage (2d8 + 1d6)
const chromOrb = new dmgSpell('s1-co', 'Chromatic Orb', 1, 1, 8, 3, 1, '');
const colorSp = new dmgSpell('s1-cs', 'Color Spray', 1, 1, 10, 6, 2, 'hit points');
const cureWound = new dmgSpell('s1-cw', 'Cure Wounds', 1, 1, 8, 1, 1, 'healing');
const dissWhisper = new dmgSpell('s1-dw', 'Dissonant Whispers', 1, 1, 6, 3, 1, 'psychic');
const earthTrem = new dmgSpell('s1-et', 'Earth Tremor', 1, 1, 6, 1, 1, 'bludgeoning');
const ensnarStrike = new dmgSpell('s1-es', 'Ensnaring Strike', 1, 1, 6, 1, 1, 'piercing');
const guidBolt = new dmgSpell('s1-gb', 'Guiding Bolt', 1, 1, 6, 4, 1, 'radiant');
const hailOfThorn = new dmgSpell('s1-hot', 'Hail of Thorns', 1, 1, 10, 1, 1, 'piercing');
const healWord = new dmgSpell('s1-hw', 'Healing Word', 1, 1, 4, 1, 1, 'healing');
const hellRebuke = new dmgSpell('s1-hr', 'Hellish Rebuke', 1, 1, 10, 2, 1, 'fire');
//Ice Knife - two dice types in dmg (1d10 + 2d6), the d10 requires and attack roll
const inflictWound = new dmgSpell('s1-iw', 'Inflict Wounds', 1, 1, 10, 3, 1, 'necrotic');
//Magic Missle - flat dmg bounus on each dice
const rayOfSick = new dmgSpell('s1-ros', 'Ray of Sickness', 1, 1, 8, 2, 1, 'poison');
const searSmite = new dmgSpell('s1-ss', 'Searing Smite', 1, 1, 6, 1, 1, 'fire');
const thundSmite = new dmgSpell('s1-ts', 'Thunderous Smite', 1, 1, 6, 2, 0, 'thunder');
const thunderw = new dmgSpell('s1-tw', 'Thunderwave', 1, 1, 8, 2, 1, 'thunder');
const witchBolt = new dmgSpell('s1-wb', 'Witch Bolt', 1, 1, 12, 1, 1, 'lightning');
const wrathSmite = new dmgSpell('s1-ws', 'Wrathful Smite', 1, 1, 6, 1, 0, 'psychic');
const zephStrike = new dmgSpell('s1-zs', 'Zephyr Strike', 1, 1, 8, 1, 0, 'force');

//Second Level Spells
const agScorch = new dmgSpell('s2-as', 'Aganazzar’s Scorcher', 2, 2, 8, 3, 'fire');
const brandSmite = new dmgSpell('s2-bs', 'Branding Smite', 2, 2, 6, 2, 1, 'radiant');
const cloudDagger = new dmgSpell('s2-cd', 'Cloud of Daggers', 2, 2, 4, 4, 2, 'slashing');
const dragonBre = new dmgSpell('s2-db', 'Dragon’s Breath', 2, 2, 6, 3, 1, '');
const dustDevil = new dmgSpell('s2-dd', 'Dust Devil', 2, 2, 8, 1, 1, 'bludgeoning');
const flameBlade = new dmgSpell('s2-fb', 'Flame Blade', 2, 2, 6, 3, 1, 'fire');
const flameSph = new dmgSpell('s2-fs', 'Flaming Sphere', 2, 2, 6, 2, 1, 'fire');
const healSpirit = new dmgSpell('s2-hs', 'Healing Spirit', 2, 2, 1, 1, 1, 'healing');
const heatMetal = new dmgSpell('s2-hm', 'Heat Metal', 2, 2, 8, 2, 1, 'fire');
const earthGrasp = new dmgSpell('s2-meg', 'Maximilian’s Earthen Grasp', 2, 2, 6, 2, 0, 'bludgeoning');
//Melf’s Acid Arrow - deals damage over two turns 
const mindSpike = new dmgSpell('s2-ms', 'Mind Spike', 2, 2, 8, 3, 1, 'psychic');
const moonbeam = new dmgSpell('s2-mb', 'Moonbeam', 2, 2, 10, 2, 1, 'radiant');
//Prayer of Healing - flat healing bounus on roll
//Scorching Ray - attack rolls needed
//Shadow Blade - dmg increase every 2 lvls rather then every level
const shatter = new dmgSpell('s2-sh', 'Shatter', 2, 2, 8, 3, 1, 'thunder');
const snowballSt = new dmgSpell('s2-sss', 'Snilloc’s Snowball Swarm', 2, 2, 6, 3, 1, 'cold');
const spikeGrow = new dmgSpell('s2-sg', 'Spike Growth', 2, 2, 4, 2, 0, 'piercing');
//Spiritual Weapon - flat damage bounus on roll




var cantripArray = [acidSpl, chillTou, createBon, fireBolt, forstbite, 
    infestation, poisonSp, primeSav, prodFlame, rayOfForst, sacrFlame, shockGrasp, 
    thornWhip, thunderclap, tollTheDead, tollTheDead2, viciousMock, wordOfRad];

var spellArray = [armsOfHad, burningHand, catapult, chromOrb, colorSp, cureWound, 
    dissWhisper, earthTrem, ensnarStrike, guidBolt, hailOfThorn, healWord, hellRebuke, 
    inflictWound, rayOfSick, searSmite, thundSmite, thunderw, witchBolt, wrathSmite, zephStrike];


var currentID = 0;
var currentLvl = 0;
var currentSpell;

//shows and hides spell level based on user input
//!!! posible change: move char level to of selection and populate spell level based on char level
function showSpells(selectLvl){
    if(selectLvl.value == 'cantrips'){
        document.getElementById('cantrips').style.display = "inline";
        document.getElementById('s1').style.display = "none";
        document.getElementById('c-level').style.display = "none";
    }
    else if(selectLvl.value == 's1'){
        document.getElementById('cantrips').style.display = "none";
        document.getElementById('s1').style.display = "inline";
        document.getElementById('c-level').style.display = "none";
    }
}

//called when after selcting on cantrip dropdown, shows char level and stores current cantrip into current spell
function showChLevels(selectLvl){
    document.getElementById('c-s').selectedIndex = 0;
    if(selectLvl.value != ''){
        document.getElementById('c-level').style.display = "inline";

        currentID = selectLvl.value;
        for(var x = 0; x < cantripArray.length; ++x){
            if(currentID == cantripArray[x].id){
                currentSpell = cantripArray[x];
           }
        }
    }
    else
    {
        document.getElementById('c-level').style.display = "none";
    }
}

//called when selecting char level; stores level and into current spell
function showCastCantrip(level){
    if(level.value != ''){
        document.getElementById('castS').style.display = "inline";

        currentLvl = level.value;
        currentSpell.charLvl = currentLvl;
        
    }
    else{
        document.getElementById('castS').style.display = "none";
    }
}

function showLevelCast(spell)
{
    document.getElementById('s-lc').selectedIndex = 0;
    if(spell.value != ''){
        document.getElementById('lvlCast').style.display = "inline";

        currentID = spell.value;
        for(var x = 0; x < spellArray.length; ++x){
            if(currentID == spellArray[x].id){
                currentSpell = spellArray[x];
           }
        }

    }
    else{
        document.getElementById('lvlCast').style.display = "none";
    }
}

function showCastSpell(castLevel){
    if(castLevel.value != ''){
        document.getElementById('castS').style.display = "inline";

        currentSpell.lvlCastAt = castLevel.value;
    }
    else{
        document.getElementById('castS').style.display = "none";
    }
}

function cast(){
    console.log(currentSpell.cast);
}


