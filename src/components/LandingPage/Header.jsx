import React from 'react'
import { CategoryCard } from './CategoryCard'

// images for categories
import gadgets from "../../assets/gadgets.png"
import electronics from "../../assets/gadgets.png"
import phones from "../../assets/phone.png"
import foodstuffs from "../../assets/food.png"
import clothing from "../../assets/clothing.png"
import laptop from "../../assets/laptop.png"
import others from "../../assets/locker.png"



export const Header = () => {
    const categoryData = [
        {
            image: phones,
            title: "Phones"
        },
        {
            image: laptop,
            title: "Laptops"
        },
        {
            image: gadgets,
            title: "Gadgets"
        },
        {
            image: gadgets,
            title: "Electronics"
        },
        {
            image: clothing,
            title: "Clothing"
        },
        {
            image: foodstuffs,
            title: "Foodstuffs"
        },
        {
            image: others,
            title: "Kitchen Items/Others"
        },
]
    // const categoryImages = [gadgets, electronics, phones, foodstuffs, clothing, laptop, others]
  return (
    <header>
        <h1>Get all you'll need in campus in one place!</h1>
        <h2>Select Category:</h2>
        <div className='categories'>
            {categoryData.map((item, index) => {
                return <CategoryCard 
                key={index}
                image={item.image}
                title={item.title}
                />
                })
            }
        </div>
        
        {/* <select name="category" id="" >
            <option defaultValue="Select Category" value="" disabled>Select category</option>
            <option value="">Electronics</option>
            <option value="">Smartphones</option>
            <option value="">Laptops</option>
            <option value="">Clothings</option>
            <option value="">Food Stuffs</option>
            <option value="">Kitchen Items & Others</option>
        </select> */}
    </header>
  )
}
