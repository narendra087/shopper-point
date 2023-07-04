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
  useDisclosure,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

import BreadNav from '../components/BreadNav'
import DataTable from '../components/datatable/DataTable'
import PriceSlider from '../components/PriceSlider'

import ProductFilter from '../components/filter/ProductFilter'

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

type FilterType = {
  keyword: string,
  category: string,
  price: number[]
}

const minPrice = 0
const maxPrice = 5000

const DashboardPage = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [filteredData, setFilteredData] = useState<DataTableType[]>([])
  const [initData, setInitData] = useState<DataTableType[]>([])
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
  
  const onFilter = (filter: FilterType) => {
    const {keyword, category, price} = filter
    
    if (!keyword && !category && (price[0] === minPrice && price[1] === maxPrice)) {
      setFilteredData(initData)
      
      return
    }
    
    const baseData = [...initData].filter((dt) => {
      if (
        (keyword ? (dt.title.toUpperCase().indexOf(keyword.toUpperCase()) > -1) : true) &&
        (category ? (dt.category === category) : true) &&
        ((price[0] !== minPrice || price[1] !== maxPrice) ? (dt.price >= price[0] && dt.price <= price[1]) : true)
      ) {
        return true
      }
      return false
    })
    
    setFilteredData(baseData)
  }
  
  return (
    <>
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
        
        <Flex gap={4} flexDirection={{base:'column', lg:'column'}}>
          <Box w={'100%'} flex={3} borderRadius={6} bg={'white'} p={4}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Heading as={'h2'} size={'lg'}>List Products</Heading>
              <Text onClick={onOpen} cursor={'pointer'} fontSize={'md'}>Filter</Text>
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
      
      <ProductFilter isOpen={isOpen} onClose={onClose} categories={categories} onFilter={onFilter} />
    </>
  )
}

export default DashboardPage