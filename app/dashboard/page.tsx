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
  Button,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

import BreadNav from '../components/BreadNav'
import DataTable from '../components/datatable/DataTable'
import PriceSlider from '../components/PriceSlider'

import axios from 'axios'

const columnsTable = [
  {
    Header: 'Products',
    columns: [
      {Header: 'Id', accessor: 'id'},
      {Header: 'Product', accessor: 'title'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Category', accessor: 'category'},
      {Header: 'Price', accessor: 'price'},
    ]
  }
]

type DataTableType = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number
}

const minPrice = 0
const maxPrice = 100000000

const DashboardPage = () => {
  const [filteredData, setFilteredData] = useState<DataTableType[]>([])
  const [initData, setInitData] = useState<DataTableType[]>([])
  
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState([minPrice, maxPrice])
  
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    getTableData()
    getCategories()
  }, [])
  
  const getTableData = async() => {
    try {
      const res = await axios.get('/api/products')
      setInitData(res.data.products)
      setFilteredData(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getCategories = async() => {
    try {
      const res = await axios.get('/api/product-categories')
      setCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const applyFilter = () => {
    if (!keyword && !category && price[0] === minPrice && price[1] === maxPrice) {
      setFilteredData(initData)
      
      return
    }
    
    const baseData = [...initData].filter((dt) => {
      if (
        (keyword ? (dt.title.toUpperCase().indexOf(keyword.toUpperCase()) > -1) : true) &&
        (category ? (dt.category === category) : true) &&
        ((price[0] !== minPrice && price[1] !== maxPrice) ? (dt.price <= minPrice && dt.price >= maxPrice) : true)
      ) {
        return true
      }
      return false
    })
    
    setFilteredData(baseData)
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
                <Input placeholder='Search products' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </InputGroup>
            </Box>
            
            <Box>
              <Text mb={1}>Category</Text>
              <Select placeholder='Select category' value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category: any, index: number) => (
                  <option key={index} value={category}>{category.split('-').join(' ')}</option>
                ))}
              </Select>
            </Box>
            
            <Box>
              <Text mb={1}>Price</Text>
              <PriceSlider onSliderChange={setPrice} />
            </Box>
            
            <Button
              bg={'blue.500'}
              color={'white'}
              _hover={{
                bg: 'blue.600',
              }}
              onClick={applyFilter}
            >
              Apply
            </Button>
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
              data={filteredData}
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardPage