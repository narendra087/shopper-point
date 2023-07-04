'use client'

import React, { useState } from 'react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
  RangeSliderMark,
} from '@chakra-ui/react'

type ComponentProps = {
  onSliderChange?: ([]) => void
}

const PriceSlider = ({onSliderChange}: ComponentProps) => {
  const minValue = 0
  const maxValue = 5000
  
  const [sliderValue, setSliderValue] = useState([minValue, maxValue])
  const [sliderMark, setSliderMark] = useState(['$0', '$5000'])
  
  const handleSliderChange = (value: number[]) => {
    if (onSliderChange) {
      onSliderChange([minValue, maxValue])
    }
    
    const minLabel = `$${value[0]}`
    const maxLabel = `$${value[1]}`
    
    setSliderValue([value[0], value[1]])
    setSliderMark([minLabel, maxLabel])
  }
  
  return (
    <RangeSlider
      // eslint-disable-next-line jsx-a11y/aria-proptypes
      aria-label={['min', 'max']}
      defaultValue={[0, 5000]}
      onChange={(val) => handleSliderChange(val)}
      max={5000}
    >
      <RangeSliderMark
        value={sliderValue[0]}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        minW='12'
        px='5px'
        borderRadius={4}
      >
        {sliderMark[0]}
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[1]}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-8'
        minW='12'
        px='5px'
        borderRadius={4}
      >
        {sliderMark[1]}
      </RangeSliderMark>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}

export default PriceSlider