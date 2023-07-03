'use client'

import React, { useEffect, useState } from 'react'
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
import { FiSearch } from 'react-icons/fi'

import BreadNav from '../components/BreadNav'
import DataTable from '../components/datatable/DataTable'

import axios from 'axios'

const columnsTable = [
  {
    Header: 'Products',
    columns: [
      {Header: 'Id', accessor: 'id'},
      {Header: 'Product', accessor: 'title'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Category', accessor: 'category'},
      {Header: 'Stock', accessor: 'stock'},
      {Header: 'Price', accessor: 'price'},
    ]
  }
]

const DashboardPage = () => {
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  const [sliderValue, setSliderValue] = useState([0, 100])
  
  useEffect(() => {
    getTableData()
    getCategories()
  }, [])
  
  const getTableData = async() => {
    try {
      const res = await axios.get('/api/products')
      console.log(res)
      setData(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getCategories = async() => {
    try {
      const res = await axios.get('/api/product-categories')
      console.log('category', res)
      setCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Flex flexDirection={'column'} gap={6}>
      <Box>
        <Flex>
          <Heading size={'xl'}>Dashboard Products</Heading>
        </Flex>
        <BreadNav
          data={[
            { label: 'Home', path: '/dashboard' },
          ]}
        />
      </Box>
      
      <Flex gap={4}>
        <Box alignSelf={'flex-start'} w={'100%'} flex={1} borderRadius={6} bg={'white'} p={4} position={'sticky'} top={5}>
          <Heading as={'h2'} size={'lg'}>Filters</Heading>
          <Divider m={'10px 0 22px'} />
          <Stack spacing={4}>
            <Box>
              <Text mb={1}>Search</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <FiSearch color='gray.300' />
                </InputLeftElement>
                <Input placeholder='Search products' />
              </InputGroup>
            </Box>
            
            <Box>
              <Text mb={1}>Category</Text>
              <Select placeholder='Select category'>
                {categories.map((category: any, index: number) => (
                  <option key={index} value={category}>{category.split('-').join(' ')}</option>
                ))}
              </Select>
            </Box>
            
            <Box>
              <Text mb={1}>Price</Text>
              <RangeSlider
                aria-label={['min', 'max']}
                defaultValue={[0, 100000000]}
                onChangeEnd={(val) => console.log(val)}
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
                >
                  {sliderValue[0]}%
                </RangeSliderMark>
                <RangeSliderMark
                  value={sliderValue[1]}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='12'
                >
                  {sliderValue[1]}%
                </RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </Box>
            
          </Stack>
        </Box>
        <Box w={'100%'} flex={3} borderRadius={6} bg={'white'} p={4}>
          <Flex justifyContent={'space-between'}>
            <Heading as={'h2'} size={'lg'}>List Products</Heading>
            <InputGroup w={'max-content'}>
              <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.300' />
              </InputLeftElement>
              <Input placeholder='Search products' />
            </InputGroup>
          </Flex>
          
          <Box mt={5}>
            <DataTable
              columns={columnsTable}
              data={data}
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardPage