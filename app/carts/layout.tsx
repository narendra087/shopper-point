import { Metadata } from 'next'
import { Providers } from '@/app/providers'

import Layout from '@/app/components/layout/Layout'

export const metadata: Metadata = {
  title: 'Carts | Shopper Point',
  description: 'List Carts - Shopper Point Admin',
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
