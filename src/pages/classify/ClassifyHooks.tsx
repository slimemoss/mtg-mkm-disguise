import * as React from 'react'
import { MtgCard } from '../../data/MtgCard'

export interface Config {
  rarity: Set<string>
  color: Set<string>
}
const defaultConfig: Config = {
  rarity: new Set(['common', 'uncommon']),
  color: new Set([])
}

export interface ClassifyHooksI {
  setRarity: (rarity: string, add: boolean) => void
  setColor: (color: string, add: boolean) => void
  classify: (cards: MtgCard[]) => MtgCard[]
}

export const useClassify = (): [Config, ClassifyHooksI] => {
  const [config, setConfig] = React.useState<Config>(defaultConfig)

  const setRarity = (rarity: string, add: boolean) => {
    if(add) {
      config.rarity.add(rarity)
    } else {
      config.rarity.delete(rarity)
    }
    setConfig({...config})
  }

  const setColor = (color: string, add: boolean) => {
    if(add) {
      config.color.add(color)
    } else {
      config.color.delete(color)
    }
    setConfig({...config})
  }

  const classify = (cards: MtgCard[]): MtgCard[] => {
    const filter = (cards: MtgCard[], rarity: Set<string>, color: Set<string>): MtgCard[] => {
      // filter rarity
      if (rarity.size != 0) {
        cards = cards.filter((c) => (
          rarity.has(c.rarity)
        ))
      }

      // filter color
      if (color.size != 0) {
        cards = cards.filter((c) => {
          if (c.disguise_color.length == 0) { return true }

          var enable = false
          c.disguise_color.forEach(dc => {
            enable = enable || color.has(dc)
          })
          return enable
        })
      }
      return cards
    }

    const sort = (cards: MtgCard[]): MtgCard[] => {
      cards.sort((a, b) => (a.disguise_mv - b.disguise_mv))
      return cards
    }

    cards = cards.concat()
    cards = filter(cards, config.rarity, config.color)
    cards = sort(cards)
    return cards
  }

  return [config, {setRarity, setColor, classify}]
}
