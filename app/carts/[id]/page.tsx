'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'

import axios from 'axios'

import DataTable from '@/app/components/datatable/DataTable'

type ProductType = {
  id: number,
  price: number,
  quantity: number,
  title: string,
  total: number,
  discountPercentage: number,
  discountedPrice: number,
}

type CartType = {
  discountedTotal: number,
  id: number,
  products: ProductType[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
  userId: number
}

const DetailCartPage = () => {
  const router = useRouter()
  const params = useParams()
  const [cartData, setCartData] = useState<CartType>()
  const [tableData, setTableData] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  
  const columnsTable = useMemo(() => [
    {
      Header: 'Cart Products',
      columns: [
        {
          Header: 'Product',
          accessor: 'title',
          Footer: 'TOTAL PRICE',
          
        },
        {
          Header: 'Price',
          accessor: 'price',
          Cell: ((cellProps:any) => { return (<>${cellProps?.value || 0}</>)}),
          Footer: '',
        },
        {
          Header: 'Quantity',
          accessor: 'quantity',
          Footer: '',
        },
        {
          Header: 'Total',
          accessor: 'total',
          Cell: ((cellProps:any) => { return (<>${cellProps?.value || 0}</>)}),
          Footer: '',
        },
        {
          Header: 'Discount',
          accessor: 'discountPercentage',
          Cell: ((cellProps:any) => { return (<>{cellProps?.value || 0}%</>)}),
          Footer: '',
        },
        {
          Header: 'Discounted Total Price',
          accessor: 'discountedPrice',
          Cell: ((cellProps:any) => { return (<>${cellProps?.value || 0}</>)}),
          Footer: `$${cartData?.discountedTotal || 0}`,
        },
      ]
    },
  ], [cartData])
  
  useEffect(() => {
    if (params?.id) {
      getCartData()
    } else {
      router.back()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getCartData = async() => {
    setLoading(true)
    
    const { id } = params
    
    try {
      const res = await axios.get('/api/carts?id='+id)
      
      setCartData(res.data)
    } catch (error) {
      console.log(error)
    }
    
    setLoading(false)
  }
  
  return (
    <Flex flexDirection={'column'} gap={6}>
      <Heading size={'lg'}>Detail Carts</Heading>
      
      <Flex gap={4} flexDirection={{base:'column', lg:'column'}}>
        <Box w={'100%'} flex={3} borderRadius={6} bg={'white'} p={4}>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Heading as={'h2'} size={'md'}>Cart Info</Heading>
          </Flex>
          
          { loading ? (
            <Flex justifyContent={'center'} alignItems={'center'} m={'100px 0'}>
              <Spinner size={'lg'} />
            </Flex>
          ) : cartData ? (
            <Box mt={'20px'}>
              <Box mb={'16px'}>
                <Text>Cart ID: <Text as={'span'} fontWeight={'bold'}>{params?.id}</Text></Text>
                <Text>User Cart ID: <Text as={'span'} fontWeight={'bold'}>{cartData?.userId}</Text></Text>
              </Box>
              
              <DataTable
                columns={columnsTable}
                data={cartData?.products || []}
              />
            </Box>
          ) : (
            <Text m={'100px 0'} w={'100%'} textAlign={'center'} fontSize={'sm'}>No Cart Data Found</Text>
          )}
        </Box>
      </Flex>
      {!loading && <Flex justifyContent={'flex-end'}>
        <Button variant={'outline'} colorScheme='blue'>Back</Button>
      </Flex>}
    </Flex>
  )
}

export default DetailCartPage