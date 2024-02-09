export interface MtgCard {
  colorIdentity: string[],
  manaValue: number,
  rarity: string,
  number: string,
  types: string[],
  jname: string,
  imageurl: string,
  backimageurl?: string | null,
  layout?: string | null,
  disguise_mv: number,
  disguise_color: string[]
}

declare module '~/data/MKM-disguise.json' {
  const data: MtgCard;
  export default data;
}
