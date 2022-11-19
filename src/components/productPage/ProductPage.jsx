import React from 'react'
import { ProductCard } from "../ProductCard"
import { IconButton, InfoButton } from './IconButton'
import phone1 from "../../assets/smartphone1.png"
import phone2 from "../../assets/smartphone2.jpg"
import { FaArrowAltCircleRight, FaLandmark, FaLocationArrow, FaLongArrowAltRight, FaPhone, FaSearchLocation } from 'react-icons/fa'
import avatar from "../../assets/avatar.jpg"
import { fakeData } from '../FakeData'

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

        <div className='safety--measures'>
          <h3>Safety Measures</h3>
          <p>Few safety tips for a favourable Trade</p>
          <ul>
            <li>Make sure to meet Seller in a public place, if seller stays Off campus, request he comes to it if possible. </li>
            <li>Make sure to check the item thoroughly before purchase</li>
            <li>If payment is via Mobile transfer, Seller should confirm receipt of payment to his account via his/her Bank's Mobile App or USSD before releasing item. </li>
            <li>If item is a Smartphone, Laptop, Gadget or Electronics, Buyer should test charging port, camera (if item is a mobile device), before purchase. </li>
            
          </ul>
        </div>

        <div className='seller--profile'>
          <h2>SELLER INFO:</h2>
          <div className='seller--info'>
            <div>
              <img src={avatar} alt="" />
              <h2>Dave Chapel Enterprise</h2>
              <div>
                <p><FaLocationArrow /> Hostel: New Male 'A'</p>
              </div>
            </div>
            <div className='flex-col'>
              <IconButton
              link="sms:+23480123456789" 
              icon={<FaPhone />}
              title="Message Seller"
              />
              <IconButton 
              link="+23480123456789"
              icon={<FaPhone />}
              title="Call Seller"
              />
              <p>Active Ads: 2</p>
            </div>
          </div>
        </div>

        <div className='product--spec'>
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
            {fakeData.map((item, index) => {
              return <ProductCard 
                      image={item.image}
                      price={item.price}
                      name={item.name}
                      category={item.category}
                      />
            })}
          </div>

        </div>
    </div>
  )
}
