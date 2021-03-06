// import bug from '../../../assets/icons/bug.svg'
// import dark from '../../../assets/icons/dark.svg'
// import dragon from '../../../assets/icons/dragon.svg'
// import electric from '../../../assets/icons/electric.svg'
// import fairy from '../../../assets/icons/fairy.svg'
// import fighting from '../../../assets/icons/fighting.svg'
// import fire from '../../../assets/icons/fire.svg'
// import flying from '../../../assets/icons/flying.svg'
// import ghost from '../../../assets/icons/ghost.svg'
// import grass from '../../../assets/icons/grass.svg'
// import ground from '../../../assets/icons/ground.svg'
// import ice from '../../../assets/icons/ice.svg'
// import normal from '../../../assets/icons/normal.svg'
// import poison from '../../../assets/icons/poison.svg'
// import psychic from '../../../assets/icons/psychic.svg'
// import rock from '../../../assets/icons/rock.svg'
// import steel from '../../../assets/icons/steel.svg'
// import water from '../../../assets/icons/water.svg'

const getColor = (type) => {
  switch (type) {
    case 'bug':
      return '#C5DC90'
      break;
    
    case 'dark':
      return '#A7A6AB'
      break;
    
    case 'dragon':
      return '#7FB0E2'
      break;

    case 'electric':
      return '#F8EBA1'
      break;

    case 'fairy':
      return '#F6C4F1'
      break;
    
    case 'fighting':
      return '#E79BAA'
      break;

    case 'fire':
      return '#FCD0A0'
      break;
    
    case 'flying':
      return '#CDDBF5'
      break;
    
    case 'ghost':
      return '#AAB2DB'
      break;
      
    case 'grass':
      return '#ABDCA7'
      break;
      
    case 'ground':
      return '#EBBAA1'
      break;
    
    case 'ice':
      return '#B6E6DE'
      break;

    case 'normal':
      return '#CDCECC'
      break;
    
    case 'poison':
      return '#D9ACE5'
      break;
    
    case 'psychic':
      return '#FCBEBD'
      break;
    
    case 'rock':
      return '#E2DBC1'
      break;
      
    case 'steel':
      return '#A6C7CE'
      break;
    
    case 'water':
      return '#A4CBEE'
      break;
    
    default:
    return '#FF0000'
    break;
  }
}

const getTypeIconColor = (type) => {
  switch (type) {
    case 'bug':
      return '#92BD2D'
      break;
    
    case 'dark':
      return '#595761'
      break;
    
    case 'dragon':
      return '#0C6AC8'
      break;

    case 'electric':
      return '#F2D94E'
      break;

    case 'fairy':
      return '#EF90E6'
      break;
    
    case 'fighting':
      return '#D3425F'
      break;

    case 'fire':
      return '#FBA64C'
      break;
    
    case 'flying':
      return '#A1BBEC'
      break;
    
    case 'ghost':
      return '#5F6DBC'
      break;
      
    case 'grass':
      return '#60BD58'
      break;
      
    case 'ground':
      return '#DA7C4D'
      break;
    
    case 'ice':
      return '#76D1C1'
      break;

    case 'normal':
      return '#A0A29F'
      break;
    
    case 'poison':
      return '#B763CF'
      break;
    
    case 'psychic':
      return '#FA8582'
      break;
    
    case 'rock':
      return '#C9BC8A'
      break;
      
    case 'steel':
      return '#5795A3'
      break;
    
    case 'water':
      return '#539DDF'
      break;
    
    default:
    return '#FF0000'
    break;
  }
}

const getIconByType = (type) => {
  switch (type) {
    case 'bug':
      return require('../assets/bug.svg')
      break;
    
    case 'dark':
      return require('../assets/dark.svg')
      break;
    
    case 'dragon':
      return require('../assets/dragon.svg')
      break;

    case 'electric':
      return require('../assets/electric.svg')
      break;

    case 'fairy':
      return require('../assets/fairy.svg')
      break;
    
    case 'fighting':
      return require('../assets/fighting.svg')
      break;

    case 'fire':
      return require('../assets/fire.svg')
      break;
    
    case 'flying':
      return require('../assets/flying.svg')
      break;
    
    case 'ghost':
      return require('../assets/ghost.svg')
      break;
      
    case 'grass':
      return require('../assets/grass.svg')
      break;
      
    case 'ground':
      return require('../assets/ground.svg')
      break;
    
    case 'ice':
      return require('../assets/ice.svg')
      break;

    case 'normal':
      return require('../assets/normal.svg')
      break;
    
    case 'poison':
      return require('../assets/poison.svg')
      break;
    
    case 'psychic':
      return require('../assets/psychic.svg')
      break;
    
    case 'rock':
      return require('../assets/rock.svg')
      break;
      
    case 'steel':
      return require('../assets/steel.svg')
      break;
    
    case 'water':
      return require('../assets/water.svg')
      break;

    case 'pokeball':
      console.log(type)
      return require('../assets/pokebola.svg')
      break;
    
    default:
    return '#FF0000'
    break;
  }
}

const formatNumber = (number) => {
  const n = number.toString().length
  switch (n) {
    case 1:
      return `#00${number}`
      
      break;
  
    case 2:
      return `#0${number}`

    default:
      return `#${number}`
      break;
  }
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getEffectiveByType = (type) => {
  switch (type) {
    case 'bug':
      return {
        vulnerability: ["flying", "rock", "fire"],
        resistent: ["fighting", "ground", "grass"],
      };
    case 'dark':
      return {
        vulnerability: ["fighting", "bug", "fairy"],
        resistent: ["ghost", "psychic", "dark"],
      };
    case 'dragon':
      return {
        vulnerability: ["ice", "dragon", "fairy"],
        resistent: ["fire", "water", "grass", "electric"],
      };
    case 'electric':
      return {
        vulnerability: ["ground"],
        resistent: ["flying", "steel", "electric"],
      };
    case 'fairy':
      return {
        vulnerability: ["poison", "steel"],
        resistent: ["flying", "bug", "dragon", "dark"],
      };
    case 'fighting':
      return {
        vulnerability: ["flying", "psychic", "fairy"],
        resistent: ["rock", "bug", "dark"],
      };
    case 'fire':
      return {
        vulnerability: ["ground", "rock", "water"],
        resistent: ["bug", "steel", "fire", "grass", "ice"],
      };
    case 'flying':
      return {
        vulnerability: ["rock", "electric", "ice"],
        resistent: ["fighting", "ground", "bug", "fairy"],
      };
    case 'ghost':
      return {
        vulnerability: ["ghost", "dark"],
        resistent: ["normal", "fighting", "poison", "bug"],
      };
    case 'grass':
      return {
        vulnerability: ["flying", "poison", "bug", "fire", "ice"],
        resistent: ["ground", "water", "grass", "electric"],
      };
    case 'ground':
      return {
        vulnerability: ["water", "grass", "ice"],
        resistent: ["poison", "rock", "electric"],
      };
    case 'ice':
      return {
        vulnerability: ["fighting", "rock", "steel", "fire"],
        resistent: ["ice"],
      };
    case 'normal':
      return {
        vulnerability: ["fighting"],
        resistent: ["ghost"],
      };
    case 'poison':
      return {
        vulnerability: ["ground", "psychic"],
        resistent: ["fighting", "poison", "grass", "fairy"],
      };
    case 'psychic':
      return {
        vulnerability: ["grass", "ghost", "dark"],
        resistent: ["fighting", "psychic",],
      };
    case 'rock':
      return {
        vulnerability: ["fighting", "ground", "steel", "water", "grass"],
        resistent: ["normal", "flying", "poison", "fire"],
      };
    case 'steel':
      return {
        vulnerability: ["fighting", "ground", "fire"],
        resistent: ["normal", "flying", "poison", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
      };
    case 'water':
      return {
        vulnerability: ["grass", "electric"],
        resistent: ["steel", "fire", "water", "ice"],
      };

    default:
      break;
  }
};

const getVulnarability = (type) => {
  let vulnerabilidade = [],
    resistencia = [];
    
  type.map(({type: t}) => {
    console.log(t)
    const { vulnerability: v, resistent: r } = getEffectiveByType(t.name);
    vulnerabilidade.push(...v);
    resistencia.push(...r);
  })

  // console.log(vulnerabilidade);
  // console.log(resistencia);
  
  const weak = [];
  vulnerabilidade.map((v) => {
    if (!resistencia.includes(v)) {
      weak.push(v);
    }
  });
  const novaArr = weak.filter((este, i) => weak.indexOf(este) === i);
  return novaArr
};

export { getColor, formatNumber, getTypeIconColor, getIconByType, capitalize, getVulnarability }