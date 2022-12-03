import React from 'react'
import { fakeData } from '../FakeData'
import { FaLongArrowAltRight,  } from "react-icons/fa"
import { ProductCard } from '../ProductCard'

export const MoreCategoryItems = ({category}) => {
    // get items from same category
    const sameCategoryItems = []
    const moreItems = fakeData.filter(item => item.category === category)
    sameCategoryItems.push(moreItems)

  return (
    <>
    <div className='more--from--seller flex-row'>
          <h2>Check out More from Seller</h2>
          <FaLongArrowAltRight />
        </div>
        <div className='more--from--category'>
          <h2>More from Smartphones Category:</h2>
          <div className='flex-row' style={{flexWrap: "wrap"}}>
            {sameCategoryItems[0].map((item, index) => {
              return <ProductCard
                      key={index} 
                      image={item.image}
                      price={item.price}
                      name={item.name}
                      category={item.category}
                      />
            })}
          </div>

    </div>
    </>
  )
}
