'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

import { FiList, FiBarChart } from 'react-icons/fi'

import DataTable from '../components/datatable/DataTable'
import ProductsFilter from '../components/product/ProductsFilter'
import ProductsChart from '../components/product/ProductsChart'

import { addFilter } from '@/app/redux/slices/filterSlice'
import { useAppDispatch } from '@/app/redux/hooks'

import axios from 'axios'

type DataTableType = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  stock: number,
  brand: string,
}

type FilterType = {
  id?: number,
  keyword: string,
  category: string,
  price: number[]
}

const minPrice = 0
const maxPrice = 5000

const DashboardPage = () => {
  const columnsTable = useMemo(() => [
    {
      Header: 'Products',
      columns: [
        {Header: 'Id', accessor: 'id'},
        {Header: 'Product Name', accessor: 'title'},
        {Header: 'Brand', accessor: 'brand'},
        {Header: 'Category', accessor: 'category'},
        {Header: 'Stock', accessor: 'stock'},
        {Header: 'Price', accessor: 'price', Cell: (cellProps:any) => {return <>${cellProps?.value || 0}</>}},
      ]
    }
  ], [])
  
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [filteredData, setFilteredData] = useState<DataTableType[]>([])
  const [initData, setInitData] = useState<DataTableType[]>([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [activeTab, setActiveTab] = useState('table')
  
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    getTableData()
    getCategories()
  }, [])
  
  const getTableData = async() => {
    setLoading(true)
    
    try {
      const res = await axios.get('/api/products')
      setInitData(res.data.products)
      setFilteredData(res.data.products)
    } catch (error) {
      console.log(error)
    }
    
    setLoading(false)
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
    dispatch(addFilter(filter))
  }
  
  return (
    <>
      <Flex flexDirection={'column'} gap={6}>
        <Heading size={'lg'}>Dashboard Products</Heading>
        
        <Flex gap={4} flexDirection={{base:'column', lg:'column'}}>
          <Box w={'100%'} flex={3} borderRadius={6} bg={'white'} p={4}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Heading as={'h2'} size={'md'}>{activeTab === 'table' ? 'List Products' : 'Products Chart'}</Heading>
              <Flex alignItems={'center'} gap={4}>
                <Flex>
                  <IconButton
                    variant={activeTab === 'table' ? 'solid' : 'outline'}
                    pointerEvents={activeTab === 'table' ? 'none' : 'auto'}
                    onClick={() => setActiveTab('table')}
                    colorScheme='blue'
                    aria-label='Table'
                    borderRadius={'6px 0 0 6px'}
                    icon={<FiList />}
                  />
                  <IconButton
                    variant={activeTab === 'chart' ? 'solid' : 'outline'}
                    pointerEvents={activeTab === 'chart' ? 'none' : 'auto'}
                    onClick={() => setActiveTab('chart')}
                    colorScheme='blue'
                    aria-label='Chart'
                    borderRadius={'0 6px 6px 0'}
                    borderLeft={'none'}
                    icon={<FiBarChart />}
                  />
                </Flex>
                {activeTab === 'table' && <Button onClick={onOpen}>Filter</Button>}
              </Flex>
            </Flex>
            
            <Box mt={5}>
              { activeTab === 'table' ? (
                <DataTable
                  columns={columnsTable}
                  data={filteredData}
                />
              ) : (
                <ProductsChart data={initData} loading={loading} />
              )}
            </Box>
          </Box>
        </Flex>
      </Flex>
      
      <ProductsFilter isOpen={isOpen} onClose={onClose} categories={categories} onFilter={onFilter} />
    </>
  )
}

export default DashboardPage