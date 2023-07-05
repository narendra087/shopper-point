import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  Flex,
  Tag,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import PriceSlider from '../PriceSlider'

import { useAppSelector } from '@/app/redux/hooks'

type FilterType = {
  id?: number,
  keyword: string,
  category: string,
  price: number[]
}

type ComponentProps = {
  isOpen: boolean,
  onClose: () => void,
  onFilter?: (filter: FilterType) => void,
  categories?: string[],
}

const ProductsFilter = ({isOpen, onClose, onFilter, categories = []}: ComponentProps) => {
  const savedFilter = useAppSelector((state) => state.filter.savedFilter)
  
  const minPrice = 0
  const maxPrice = 5000
  const [initFilter, setInitFilter] = useState<FilterType>({keyword: '', category: '', price: [minPrice, maxPrice]})

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState<number[]>([minPrice, maxPrice])
  
  useEffect(() => {
    if (isOpen) {
      setInitFilter({keyword, category, price})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])
  
  
  const applyFilter = () => {
    const filterData = {
      keyword,
      category,
      price,
    }
    
    if (onFilter) {
      onFilter(filterData)
    }
    
    onClose()
  }
  
  const applySavedFilter = (filter: FilterType) => {
    setKeyword(filter.keyword)
    setCategory(filter.category)
    setPrice(filter.price)
    
    if (onFilter) {
      onFilter(filter)
    }
    
    onClose()
  }
  
  const cancelFilter = () => {
    setKeyword(initFilter.keyword)
    setCategory(initFilter.category)
    setPrice(initFilter.price)
    
    onClose()
  }
  
  const wordingFilter = (filter:FilterType) => {
    const { keyword, category, price } = filter
    let text = `${keyword ? '"'+keyword+'"' : 'All products'} ` +
      `in ${category ? '"'+category+'"' : 'all category'} ` +
      `${(price[0] !== minPrice && price[1] !== maxPrice) ? 'with price between $' + price[0] + ' and $' + price[1] : ''}`
    
    return text
  }
  
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={cancelFilter} />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody overflowX={'hidden'}>
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
                <PriceSlider onSliderChange={setPrice} initialPrice={price} />
              </Box>
              
              {savedFilter.length && (
                <Box>
                  <Text mb={1}>Recent Filter</Text>
                  <Flex gap={2} flexDirection={'column'}>
                    {savedFilter.map((filter:FilterType, index:number) => (
                      <Tag
                        key={index}
                        variant='outline'
                        colorScheme='blue'
                        p='6px 8px'
                        cursor='pointer'
                        onClick={() => applySavedFilter(filter)}
                      >
                        {wordingFilter(filter)}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={cancelFilter}>
              Cancel
            </Button>
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default ProductsFilter