import * as React from 'react'
import card_ from '../../sass/card.module.sass'
import {IconButton} from '@material-ui/core'
import {ChevronRightSharp as ArrowIcon} from '@material-ui/icons'

interface Props {
  children: any
  slideCount: number | undefined
}

export function PackageSlider({children, slideCount}: Props) {
  const [activeIdx, setActiveIdx] = React.useState(1)

  const contentWidth = React.useMemo(() => {
    if (slideCount) return 100 * slideCount + '%'
  }, [slideCount])

  const moveAmount = React.useMemo(() => {
    return - 100 * (activeIdx - 1) + '%'
  }, [activeIdx])

  const handleCountUp = () => {
    if (slideCount === activeIdx) setActiveIdx(1)
    else setActiveIdx(activeIdx + 1)
  }

  return (
    <div className={card_.slider}>
      <div className={card_.slider__arrow}>
        <IconButton onClick={handleCountUp} size="small"><ArrowIcon/></IconButton>
      </div>

      <div className={card_.slider__content} style={{width: contentWidth, left: moveAmount}}>
        {children}
      </div>

      <div className={card_.slider__nav}>
        {[...Array(slideCount)].map((el, idx) => (
          <IconButton key={idx} size="small" onClick={() => setActiveIdx(idx + 1)}>
            <div className={idx + 1 === activeIdx ? card_.nav__btn_active : card_.nav__btn}/>
          </IconButton>
        ))}
      </div>
    </div>
  )
}