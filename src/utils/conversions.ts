export enum Volumes {
  CL = "cl",
  CUP = "cup",
  DL = "dl",
  FLUID_OZ_UK = "fl oz (UK)",
  FLUID_OZ_US = "fl oz (US)",
  GAL_UK = "gal (UK)",
  GAL_US = "gal (US)",
  L = "l",
  ML = "ml",
  PINT_UK = "pt(Imp)",
  PINT_DRY_US = "pt(US dry)",
  PINT_FLUID_US = "pt(US fl)",
}

const volumeData: Record<Volumes, number> = {
  [Volumes.CL]: 100.0,
  [Volumes.CUP]: 4.0,
  [Volumes.DL]: 10.0,
  [Volumes.FLUID_OZ_UK]: 35.195079727854,
  [Volumes.FLUID_OZ_US]: 33.814022701843,
  [Volumes.GAL_UK]: 0.21996924829909,
  [Volumes.GAL_US]: 0.26417205235815,
  [Volumes.L]: 1.0,
  [Volumes.ML]: 1000.0,
  [Volumes.PINT_UK]: 1.7597539863927,
  [Volumes.PINT_DRY_US]: 1.8161659685377,
  [Volumes.PINT_FLUID_US]: 2.1133764188652,
};

export enum Masses {
  G = "g",
  KG = "kg",
  LB = "lb",
  MG = "mg",
  OZ = "oz",
  ST = "st",
}

const massData: Record<Masses, number> = {
  [Masses.G]: 1000.0,
  [Masses.KG]: 1.0,
  [Masses.LB]: 2.20462,
  [Masses.MG]: 1000000,
  [Masses.OZ]: 35.274,
  [Masses.ST]: 0.157473,
};

export enum Matter {
  ALMOND_FLOUR = "almond flour",
  APPLESAUCE = "applesauce",
  BERRIES_FROZEN = "frozen berries",
  BROWN_SUGAR = "brown sugar",
  BUTTER = "butter",
  CHOCOLATE_CHIP = "chocolate chips",
  COCOA_POWDER = "cocoa powder",
  COCONUT_CREAM = "coconut cream",
  COCONUT_DESICCATED = "coconut desiccated",
  COCONUT_MILK = "coconut wilk",
  COCONUT_OIL = "coconut oil",
  CORNSTARCH = "cornstarch",
  CRANBERRY = "cranberry",
  FLOUR = "flour",
  HONEY = "honey",
  MAPLE_SYRUP = "maple syrup",
  MILK = "milk",
  OAT = "oat",
  OIL = "oil",
  PEANUT_BUTTER = "peanut butter",
  PUMPKIN_PUREE = "pumpkin purre",
  RICE_DRY = "dry rice",
  TOMATO_CRUSHED = "crush tomatoes",
  WATER = "water",
  WHITE_SUGAR = "white sugar",
  YOGURT = "yogurt",
}

const matterData: Record<Matter, number> = {
  [Matter.ALMOND_FLOUR]: 0.384,
  [Matter.APPLESAUCE]: 1.02,
  [Matter.BERRIES_FROZEN]: 0.568,
  [Matter.BROWN_SUGAR]: 0.852,
  [Matter.BUTTER]: 0.918,
  [Matter.CHOCOLATE_CHIP]: 0.68,
  [Matter.COCOA_POWDER]: 0.336,
  [Matter.COCONUT_CREAM]: 1.01,
  [Matter.COCONUT_DESICCATED]: 0.34,
  [Matter.COCONUT_MILK]: 1.02,
  [Matter.COCONUT_OIL]: 0.904,
  [Matter.CORNSTARCH]: 0.448,
  [Matter.CRANBERRY]: 0.456,
  [Matter.FLOUR]: 0.48,
  [Matter.HONEY]: 1.42,
  [Matter.MAPLE_SYRUP]: 1.248,
  [Matter.MILK]: 1.03,
  [Matter.OAT]: 0.324,
  [Matter.OIL]: 0.92,
  [Matter.PEANUT_BUTTER]: 1.08,
  [Matter.PUMPKIN_PUREE]: 0.908,
  [Matter.RICE_DRY]: 0.8,
  [Matter.TOMATO_CRUSHED]: 1.04,
  [Matter.WATER]: 1.0,
  [Matter.WHITE_SUGAR]: 0.792,
  [Matter.YOGURT]: 0.908,
};

export enum Temperature {
  C = "°C",
  F = "°F",
}

export function convertCelciusToFahrenheit(degree: number): number {
  return degree * 1.8 + 32;
}

export function convertFahrenheitToCelcius(degree: number): number {
  return (degree - 32) / 1.8;
}

export function convertMass(
  unit_src: Masses,
  unit_dest: Masses,
  value: number,
): number {
  return (value / massData[unit_src]) * massData[unit_dest];
}

export function convertVolume(
  unit_src: Volumes,
  unit_dest: Volumes,
  value: number,
): number {
  return (value / volumeData[unit_src]) * volumeData[unit_dest];
}

export function convertVolumeMatterToMass(
  unit_src: Volumes,
  matter: Matter,
  unit_dest: Masses,
  value: number,
): number {
  // convert volume to litre
  const litre_volume = convertVolume(unit_src, Volumes.L, value);
  const kg_mass = litre_volume * matterData[matter];
  const dest_mass = convertMass(Masses.KG, unit_dest, kg_mass);

  return dest_mass;
}
