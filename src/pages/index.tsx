import * as React from 'react'

import { MtgCard } from '../data/MtgCard'
import { Card } from './Card'
import { Classify } from './classify/Classify'
import { useClassify } from './classify/ClassifyHooks'

interface Props {
  data: MtgCard[]
}
export const Page = (props: Props) => {
  const [config, classifyHooks] = useClassify()
  const [shown, setShown] = React.useState<MtgCard[]>(props.data)

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [config, props.data])

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [])

  return (<>    
    <Classify config={config} hooks={classifyHooks}/>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))'}}>
      {shown.map((card, i) => (
        <div key={i} style={{margin: '0.2rem'}}>
          <Card card={card} count={i + 1} />
        </div>
      ))}
    </div>

    <footer style={{marginTop: '5rem', padding: '1rem'}}>
      本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
    </footer>
  </>)
}
