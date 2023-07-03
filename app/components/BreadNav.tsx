'use client'

import React, { JSXElementConstructor, ReactElement } from 'react'
import NextLink from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

type DataType = {
  label: string,
  path: string,
}

type ComponentProps = {
  data: DataType[],
  separator?: string | ReactElement<any, string | JSXElementConstructor<any>>
}

const BreadNav = ({data, separator, ...rest }: ComponentProps) => {
  return (
    <Breadcrumb separator={separator} fontWeight={'medium'} fontSize={'sm'} {...rest}>
      {data.map((dt: DataType, index: number) => (
        <BreadcrumbItem key={index} isCurrentPage={dt.label === data[data.length - 1].label}>
          <BreadcrumbLink href={dt.path}>{dt.label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default BreadNav