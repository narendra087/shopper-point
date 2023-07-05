'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {ssr:false})

type DataTableType = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  stock: number,
  brand: string
}

type ComponentProps = {
  data: DataTableType[],
  loading: boolean,
}

const ProductsChart = ({data, loading}: ComponentProps) => {
  const [seriesData, setSeriesData] = useState<any>()
  const [categoryData, setCategoryData] = useState<any>()
  const [brands, setBrands] = useState<string[]>([])
  
  useEffect(() => {
    if (!loading) {
      handleMappingData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  
  const handleMappingData = () => {
    const allBrands = getBrands()
    const seriesObj:any = {}
    const categoryObj:any = {}
    
    allBrands.map((brand) => {
      const filterData = data.filter((dt) => dt.brand === brand)
      
      const tempData:{name:string,data:number[]} = {
        name: brand,
        data: []
      }
      
      let tempCategory:string[] = []
      filterData.map((fd) => {
        tempData.data.push(fd.stock)
        tempCategory.push(fd.title)
      })
      
      seriesObj[brand] = [tempData]
      categoryObj[brand] = (tempCategory)
    })
    
    setSeriesData(seriesObj)
    setCategoryData(categoryObj)
  }
  
  const getBrands = () => {
    const tempBrands:string[] = []
    data.map((dt) => {
      tempBrands.push(dt.brand)
    })
    
    const uniqueBrands = tempBrands.filter((brand, index) => {
      return tempBrands.indexOf(brand) === index
    })
    
    setBrands(uniqueBrands)
    return uniqueBrands
  }
  
  const getChartOptions = (brand: string) => {
    const chartOptions:ApexOptions = {
      title: {
        text: brand,
      },
      chart: {
        id: 'products-chart',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        }
      },
      plotOptions: {
        bar: {
          barHeight: '80%',
          borderRadius: 6,
        }
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categoryData?.[brand] || [],
        
      },
    }
    
    return chartOptions
  }
  
  
  return (
    <Box>
      {loading ? (
        <Flex flexDirection={'column'} minH={'300px'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
          <Spinner size={'xl'} />
          </Flex>
      ) : (
        <Grid templateColumns={{base: '1fr', lg:'repeat(2, 1fr)'}} gap={4}>
          {brands.map((brand) => (
            <GridItem key={brand}>
              <Chart
                options={getChartOptions(brand)}
                series={seriesData?.[brand] || []}
                type='bar'
                height='auto'
                width='100%'
                />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ProductsChart