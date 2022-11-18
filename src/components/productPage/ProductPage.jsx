import React from 'react'
import { ProductCard } from "../ProductCard"
import { InfoButton } from './InfoButton'
import phone1 from "../../assets/smartphone1.png"
import phone2 from "../../assets/smartphone2.jpg"
import { FaArrowAltCircleRight, FaLandmark, FaLocationArrow, FaLongArrowAltRight, FaPhone, FaSearchLocation } from 'react-icons/fa'
import avatar from "../../assets/avatar.jpg"


export const ProductPage = () => {
  return (
    <div className='product--page'>
      <div className='product--images'>
        <div className='main--image--container'>
          <img src={phone1} alt="" className='main'/>
        </div>
          <div className='more--images--container'>
            <img src={phone2} alt="" />
            <img src={phone1} alt="" />
            <img src={phone2} alt="" />
            <img src={phone2} alt="" />
            <img src={phone1} alt="" />
            <img src={phone2} alt="" />
          </div>
        </div>

        <div className='product--info'>
          <h2>Motorola Z3</h2>
          <h2>N55,0000</h2>
        </div>

        <div className='product--stat'>
          <div>
            <div className='item'>
              <p>
                Product Condiiton: 
              </p>
              <b>
                NEW
              </b>
            </div>
            <div>
              <p>
                Colour: 
              </p>
              <b>
                Black
              </b>
            </div>
            <div>
              <p>
                Manufacturing Year: 
              </p>
              <b>
                2020
              </b>
            </div>
          </div>
          <div>
            <div>
              <p>
                Brand: 
              </p>
              <b>
                Motorola
              </b>
            </div>
            <div>
              <p>
                Receipt: 
              </p>
              <b>
                Yes
              </b>
            </div>
            <div>
              <p>
                Purchase Year: 
              </p>
              <b>
                2021
              </b>
            </div>
          </div>
        </div>

        <div className='seller--profile'>
          <h2>SELLER INFO:</h2>
          <div className='seller--info'>
            <div>
              <img src={avatar} alt="" />
              <h2>Dave Chapel</h2>
              <div>
                <p><FaLocationArrow /> Campus: New Male 'A'</p>
              </div>
            </div>
            <div className='flex-col'>
              <InfoButton 
              icon={<FaPhone />}
              title="Message Seller"
              />
              <InfoButton 
              icon={<FaPhone />}
              title="Message Seller"
              />
              <p>Active Ads: 2</p>
            </div>
          </div>
        </div>

        <div className='product--detail'>
            <h3>Product Specification:</h3>
            <div>
              <p>Brand NEW:</p>
              <p>6GB RAM</p>
              <p>12GB ROM</p>
              <p>32MP Camera</p>
            </div>
        </div>

        <div>
          <h2>Reviews <FaArrowAltCircleRight /></h2>
        </div>
        <div className='more--from--seller flex-row'>
          <h2>Check out More from Seller</h2>
          <FaLongArrowAltRight />
        </div>
        <div className='more--from--category'>
          <h2>More from Smartphones Category:</h2>
          <div className='flex-row' style={{flexWrap: "wrap"}}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

        </div>
    </div>
  )
}
