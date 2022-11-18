import React from 'react'
import { HeroSection } from './HeroSection'
import { ProductsSection } from './ProductsSections'

export const Homepage = () => {
  return (
    <div className='homepage'>
        <HeroSection />
        <ProductsSection />
    </div>
  )
}
