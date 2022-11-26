import React from 'react'
import { AdsBanner, AdsPlacement } from './AdsBanner'
import { HeroSection } from './HeroSection'
import { ProductsSection } from './ProductsSections'
import { SponsorAd } from './SponsorAdSection'

export const Homepage = () => {
  return (
    <div className='homepage'>
        <HeroSection />
        <AdsBanner />
        <ProductsSection />
        <div className='flex-row'>
          <button>see more</button>
        </div>
        <SponsorAd />
    </div>
  )
}
