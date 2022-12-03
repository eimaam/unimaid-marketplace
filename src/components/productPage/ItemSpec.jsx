import React from 'react'

export const ItemSpec = ({itemDetails}) => {
  return (
    <div className='product--spec'>
        <h3>Product Specification:</h3>
        <div>
            <p>{itemDetails ? itemDetails : "No extra details"}</p>
        </div>
    </div>
  )
}
