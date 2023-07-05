'use client'

import React, { useEffect, useState, useMemo } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { FiEye } from 'react-icons/fi'

import DataTable from '../components/datatable/DataTable'
import axios from 'axios'

type DataTableType = {
  id: number,
  userId: number,
  totalQuantity: number,
  price: number,
  products: {title:string, quantity:number}[]
}

const CartsPage = () => {
  const columnsTable = useMemo(() => [
    {
      Header: 'Carts',
      columns: [
        {Header: 'User ID', accessor: 'userId'},
        {Header: 'Products', accessor: 'listProducts'},
        {Header: 'Total Quantity', accessor: 'totalQuantity'},
        {Header: 'Total Price', accessor: 'discountedTotal', Cell: (cellProps:any) => {return <>${cellProps?.value || 0}</>}},
        {
          Header: 'Action',
          accessor: 'id',
          Cell: (cellProps:any) => {
            return (
              <div>
                <IconButton as={NextLink} href={'/carts/'+cellProps?.value} aria-label='Detail' icon={<FiEye />} variant={'outline'} colorScheme='blue' />
              </div>
            )
          }
        },
      ]
    }
  ], [])
  
  const [initData, setInitData] = useState<DataTableType[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getTableData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getTableData = async() => {
    setLoading(true)
    
    try {
      const res = await axios.get('/api/carts')
      const tempData = res.data.carts.map((data:DataTableType) => {
        return { ...data, listProducts: mapProduct(data.products) }
      })
      setInitData(tempData)
    } catch (error) {
      console.log(error)
    }
    
    setLoading(false)
  }
  
  const mapProduct = (products: {title: string, quantity: number}[]) => {
    const arrProduct:string[] = []
    products.map((product) => {
      arrProduct.push(`${product.title} (${product.quantity})`)
    })
    
    return arrProduct.join(', ')
  }
  
  return (
    <>
      <Flex flexDirection={'column'} gap={6}>
        <Heading size={'lg'}>Dashboard Carts</Heading>
        
        <Flex gap={4} flexDirection={{base:'column', lg:'column'}}>
          <Box w={'100%'} flex={3} borderRadius={6} bg={'white'} p={4}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Heading as={'h2'} size={'md'}>List Cart</Heading>
            </Flex>
            
            <Box mt={5}>
              <DataTable
                columns={columnsTable}
                data={initData}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CartsPage