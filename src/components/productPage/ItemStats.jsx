import React from 'react'

export const ItemStats = ({condition, colour, manufactureYear, brand, receipt, purchaseYear}) => {
  return (
    <div className='product--stat'>
          <div>
            <div className='item'>
              <p>
                Product Condiiton: 
              </p>
              <b>
                {condition}
              </b>
            </div>
            <div>
              <p>
                Colour: 
              </p>
              <b>
                {colour}
              </b>
            </div>
            <div>
              <p>
                Manufacturing Year: 
              </p>
              <b>
                {manufactureYear}
              </b>
            </div>
          </div>
          <div>
            <div>
              <p>
                Brand: 
              </p>
              <b>
                {brand}
              </b>
            </div>
            <div>
              <p>
                Receipt: 
              </p>
              <b>
                {receipt}
              </b>
            </div>
            <div>
              <p>
                Purchase Year: 
              </p>
              <b>
                {purchaseYear}
              </b>
            </div>
          </div>
    </div>
  )
}
