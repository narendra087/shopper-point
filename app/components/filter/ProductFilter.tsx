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
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import PriceSlider from '../PriceSlider'

type FilterType = {
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

const ProductFilter = ({isOpen, onClose, onFilter, categories = []}: ComponentProps) => {
  const minPrice = 0
  const maxPrice = 5000
  const [initFilter, setInitFilter] = useState<FilterType>({keyword: '', category: '', price: [minPrice, maxPrice]})

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState<number[]>([])
  
  useEffect(() => {
    if (isOpen) {
      console.log('update init')
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
  
  const cancelFilter = () => {
    setKeyword(initFilter.keyword)
    setCategory(initFilter.category)
    setPrice(initFilter.price)
    
    onClose()
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

export default ProductFilter