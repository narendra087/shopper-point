'use client'

import { Providers } from '@/app/providers'

import Layout from '@/app/components/layout/Layout'

export const metadata = {
  title: 'Carts | Shopper Point',
  description: 'Carts Ecommerce admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Providers>
        <Layout >
          {children}
        </Layout>
      </Providers>
    </section>
  )
}
