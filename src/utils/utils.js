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
    return 'red'
    break;
  }
}

const formatNumber = (number) => {
  const n = number.toString().length
  switch (n) {
    case 1:
      return `00${number}`
      
      break;
  
    case 2:
      return `0${number}`

    default:
      return `${number}`
      break;
  }
}

export { getColor, formatNumber }