'use client'

import { Providers } from '@/app/providers'

import Layout from '@/app/components/layout/Layout'

export const metadata = {
  title: 'Dashboards | Shopper Point',
  description: 'Ecommerce dashboard admin',
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
