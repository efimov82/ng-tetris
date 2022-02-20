export const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * max);

export const calculateScores = (removedLines: number): number => {
  let val = 0;
  switch (removedLines) {
    case 1:
      val = 100;
      break;
    case 2:
      val = 300;
      break;
    case 3:
      val = 500;
      break;
    case 4:
      val = 900;
      break;
    default:
      val = 0;
  }

  return val;
};

export const getLevelSpeed = (level: number): number => {
  switch (level) {
    case 1:
      return 1000;
    case 2:
      return 800;
    case 3:
      return 700;
    case 4:
      return 600;
    case 5:
      return 500;
    case 6:
      return 400;
    default:
      return 300;
  }
};

export const getGradientColor = (color: string): string => {
  switch (color) {
    case 'OrangeRed':
      return 'Orange';
    case 'green':
      return 'springgreen';
    case 'RoyalBlue':
      return 'SkyBlue';
    case 'purple':
      return 'plum';
    case 'SeaGreen':
      return 'Moccasin';
    case 'orange':
      return 'moccasin';
    case 'Maroon':
      return 'LightCoral';
    case 'olive':
      return 'PaleGoldenRod';
    case 'chocolate':
      return 'BlanchedAlmond';
    default:
      return 'white';
  }
};
