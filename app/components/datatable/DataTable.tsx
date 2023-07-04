import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box
} from "@chakra-ui/react";

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
  FiChevronsLeft,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

type DataTableProps = {
  columns: any,
  data: any,
}

const DataTable = ({ columns, data  }: DataTableProps) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination,
  );

  const renderPageInfo = () => {
    return (
      <Text flexShrink="0" mr={4}>
        Page{" "}
        <Text fontWeight="bold" as="span">
          {pageIndex + 1}
        </Text>{" "}
        of{" "}
        <Text fontWeight="bold" as="span">
          {pageOptions.length}
        </Text>
      </Text>
    )
  }
  
  const renderPageSelection = () => {
    return (
      <>
        <Text flexShrink="0">Go to page:</Text>{" "}
        <NumberInput
          ml={2}
          mr={4}
          w={28}
          min={1}
          max={pageOptions.length}
          onChange={(value: any) => {
            const page = value ? value - 1 : 0;
            gotoPage(page);
          }}
          defaultValue={pageIndex + 1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </>
    )
  }
  
  const renderLimitSelection = () => {
    return (
      <Select
        w={32}
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    )
  }
  
  const paginationOptionsMobile = () => {
    return (
      <Flex alignItems={{base:"start", sm:'center'}} gap={2} justifyContent='space-between' flexDirection={{base:'column', sm: 'row'}}>
        {renderPageInfo()}
        
        <Flex alignItems={{base:'start', sm:'center'}} gap={2} flexDirection={{base:'column', sm:'row'}}>
          <Flex alignItems='center'>
            {renderPageSelection()}
          </Flex>
          
          {renderLimitSelection()}
        </Flex>
      </Flex>
    )
  }

  // Render the UI for your table
  return (
    <>
      <Box overflow={'auto'}>
        <Table {...getTableProps()} minW={'500px'}>
          <Thead>
            {headerGroups.map((headerGroup:any, i:number) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column:any, j:number) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                    <Flex alignItems="center">
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown style={{marginLeft:'4px',width:'16px',height:'16px'}} />
                        ) : (
                          <FiChevronUp style={{marginLeft:'4px',width:'16px',height:'16px'}} />
                        )
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row:any, i:number) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell:any, j:number) => {
                    return (
                      <Td {...cell.getCellProps()} key={j}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      
      <Box display={{base:'block', lg:'none'}} mt={4}>
        {paginationOptionsMobile()}
      </Box>

      <Flex justifyContent="space-between" mt={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              aria-label=""
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<FiChevronsLeft height={3} width={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              aria-label=""
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<FiChevronLeft height={6} width={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center" display={{base:'none', lg:'flex'}}>
          {renderPageInfo()}
          
          {renderPageSelection()}
          
          {renderLimitSelection()}
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              aria-label=""
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<FiChevronRight height={6} width={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              aria-label=""
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<FiChevronsRight height={3} width={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}

export default DataTable
