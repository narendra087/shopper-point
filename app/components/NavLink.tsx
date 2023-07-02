'use client'

import {Link, LinkProps as ChakraLinkProps} from "@chakra-ui/next-js";
import {useColorModeValue} from "@chakra-ui/react";
import {usePathname} from "next/navigation";
import {LinkProps as NextLinkProps} from "next/link";

export default function NavLink ({ href, children, ...rest }: ChakraLinkProps & NextLinkProps) {
  const pathName = usePathname();
  const isActive = pathName === href;
  
  console.log(isActive)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </Link>
  )
};