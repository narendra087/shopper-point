'use client'

import React, { useMemo, useState } from 'react'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
  RangeSliderMark,
} from '@chakra-ui/react'

import { denominal } from '../utils/denominal'

type DenominalType = {
  index: number,
  label: string,
  result: number
}

const PriceSlider = () => {
  const [sliderValue, setSliderValue] = useState([0, 100000000])
  const [sliderMark, setSliderMark] = useState(['0', '100jt'])
  
  const handleSliderChange = (value: number[]) => {
    let min:DenominalType = {index: 1, label: '', result: 0}
    let max:DenominalType = {index: 2, label: '', result: 100000000}
    value.forEach((val, index) => {
      if (index === 0) {
        min = denominal(val)
      }
      if (index === 1) {
        max = denominal(val)
      }
    })
    
    const minValue = Math.pow(1000, min?.index) * min.result
    const maxValue = Math.pow(1000, max?.index) * max.result
    
    setSliderValue([minValue, maxValue])
    setSliderMark([(min.result + min.label), (max.result + max.label)])
  }
  
  return (
    <RangeSlider
      // eslint-disable-next-line jsx-a11y/aria-proptypes
      aria-label={['min', 'max']}
      defaultValue={[0, 100000000]}
      onChange={(val) => handleSliderChange(val)}
      max={100000000}
    >
      <RangeSliderMark
        value={sliderValue[0]}
        textAlign='center'
        bg='blue.500'
        color='white'
        mt='-10'
        ml='-5'
        w='12'
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
        ml='-5'
        w='12'
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