import React from 'react'
import { useUser } from '../../Context/UserContext'
import { AdsBanner, AdsPlacement } from './AdsBanner'
import { Header } from './Header'
import { ProductsSection } from './ProductsSections'
import { SponsorAd } from './SponsorAdSection'

export const Homepage = () => {
  const { username } = useUser()

  return (
    <div className='homepage'>
        <Header />
        <AdsBanner />
        <ProductsSection />
        <SponsorAd />
    </div>
  )
}
