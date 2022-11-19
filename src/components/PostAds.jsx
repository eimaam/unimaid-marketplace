import React from 'react'

export const PostAds = () => {
  return (
    <div className='container' id='createAds'>
        <h3>Fill in the below form with your product/item detail to post an Ad</h3>
        <form className='container--item'>
            <select name="category" id="" defaultValue="Select Category">
                <option defaultValue="" value="Select Category" disabled >Select Category</option>
                <option value="">Electronics</option>
                <option value="">Smartphones</option>
                <option value="">Laptops</option>
                <option value="">Clothings</option>
                <option value="">Food Stuffs</option>
                <option value="">Kitchen Items & Others</option>
            </select>
            <input 
            type="text"
            placeholder='Product/Item Name' 
            />
            <input 
            type="number"
            placeholder='Product/Item Price' 
            />
            <select name="" id="">
                <option value="">Product Condition</option>
                <option value="">New</option>
                <option value="">UK-Used</option>
                <option value="">US-Used</option>
                <option value="">Nigerian Used</option>
            </select>
            <input 
            type="text"
            placeholder='Product/Item Colour' 
            />
            <input 
            type="text"
            placeholder='Manufacturing Year' 
            />
            <input 
            type="text"
            placeholder='Purchase Year' 
            />
            <select name="" id="">
                <option value="">Receipt Available?</option>
                <option value="">Yes</option>
                <option value="">No</option>
            </select>
            <textarea 
            name="" id="" 
            rows="3" 
            placeholder='Product/Item Specification (item size, memory, specs and more)'
            />
            <p>TIP: <i>For a faster sell, snap a clear picture of the item in all sides (front, back & sides)</i></p>
            <h3>Add Images below: <i>starting with header image</i></h3>
            <input 
            type="file" 
            />
            <input 
            type="file" 
            />
            <input 
            type="file" 
            />
            <input 
            type="file" 
            />
            <input 
            type="file" 
            />
            <input 
            type="file" 
            />
            <input type="submit" value="Preview Ad Details"/>
            <input type="submit" value="Post Ad"/>
        </form>
    </div>
  )
}
