import React from 'react'
import { ProductCard } from '../ProductCard'
import { fakeData } from '../FakeData'

export const ProductsSection = () => {
  return (
    <section>
      <div className='section--title'>
        <h2>
          NEW ADS:
        </h2>
      </div>
      <div className='products'>
        {fakeData.map((item, index) => {
          return <ProductCard
                  key={index}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  />
        }) }
      </div>
    </section>
  )
}
