import { async } from '@firebase/util';
import { addDoc, collection, doc, getDoc, limitToLast, serverTimestamp, Timestamp, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { database, storage } from '../firebaseConfig';
import {toast} from "react-toastify"
import { useAuth } from '../Context/AuthContext';
import { useUser } from '../Context/UserContext';

export const PostAds = () => {
    const { user,  navigate } = useAuth()
    const { displayName, username } = useUser()
    
    const [data, setData] = useState({
        category: "",
        itemName: "",
        itemPrice: "",
        itemBrand: "",
        itemCondition: "",
        itemColour: "",
        itemManufacturingYear: "",
        itemPurchaseYear: "",
        receipt: "",
        itemDetails: ""
    })
    const {category, itemName, itemPrice, itemBrand, itemCondition, itemDetails, itemColour, itemManufacturingYear, itemPurchaseYear, receipt} = data
    
    // image state manager
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)

    // generating unique ad id from date
    // generating personal date format DD/MM/YY
    // const stamp = Timestamp.now().toDate()
    
    // let time = stamp.getTime()
    // let day = stamp.getDate()
    // let monthByIndex = stamp.getMonth();
    // let fullYear = stamp.getFullYear();
    // let month = monthByIndex+1;
    // add 0 to beginning of Month 1-9
    // if(month <= 9){
    //     month = `0${month}`
    // }
    // convert year to string to easily extract only last two figures eg. 2022 == 22
    // const year = fullYear.toString().slice(2,4)

    // final date format DD/MM/YY
    // const date = `${day}/${month}/${year}`
    // creating date format with no / to create a link
    // const plainDate = `${day}${month}${year}`



    const id = encodeURI(`${username.toLowerCase()}/${itemName.toLowerCase()}`)
    // end of date formatting

    // firebase firestore/cloud database storage references    
    const storageRef = ref(storage, `/ads/${images.name}`)
    const adsRef = collection(database, "Ads");

    // handle form inputs
    const handleChange = (e) => {
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]:value
        }))
    } 


    // handle images state
    const handleImage = (e) => {
        let upload = e.target.files
        for(let i=0; i < upload.length; i++){
            const newImage = upload[i]
            setImages(prevState => [...prevState, newImage])
        }
    }
    

    // image upload
    const uploadImages = (e) => {
        e.preventDefault()
        const promises = []
        images.map((item) => {
            const storageRef = ref(storage, `/ads/${item.name}`)

            const uploadTask = uploadBytesResumable(storageRef, item);
            promises.push(uploadTask)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                    );
                    setUploadProgress(progress);
            },
            (error) => console.log(error),

            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageURLs(prevState => [...prevState, url]);
                });
            }
            );
        })
        Promise.all(promises)
        .then(() => toast.success("Images uploaded"))
        .then(err => console.log(err))
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        uploadImages(images)
    }
    
    const createAd = async (e) => {
        e.preventDefault()
        // setLoading(true)
        try{
            await addDoc(adsRef, {
                posterEmail: user.email,
                posterDisplayName: displayName,
                category: category,
                itemName: itemName,
                itemPrice: itemPrice.toLocaleString(),
                itemBrand: itemBrand,
                itemCondition: itemCondition,
                itemColour: itemColour,
                itemManufacturingYear: itemManufacturingYear,
                itemPurchaseYear: itemPurchaseYear,
                receipt: receipt,
                itemDetails: itemDetails,
                itemImages: imageURLs,
                isActive: true,
                isSponsored: false,
                postedOn: serverTimestamp(),
                id: id
            })
            toast.success("Ad Posted")
            navigate('/')
            
        }
        catch(err){
            console.log(err.message)
        }
    }


  return (
    <div className='container' id='createAds'>
        <h3>Fill in the below form with your product/item detail to post an Ad</h3>
        <form className='container--item' >
            <select name="category" id="" defaultValue="Select Category" onChange={handleChange}>
                <option defaultValue="" value="Select Category" disabled >Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="clothings">Clothings</option>
                <option value="food">Food Stuffs</option>
                <option value="others">Kitchen Items & Others</option>
            </select>
            <input 
            type="text"
            placeholder='Product/Item Name'
            name="itemName"
            value={itemName}
            onChange={handleChange} 
            />
            <input 
            type="number"
            placeholder='Product/Item Price'
            name="itemPrice"
            value={itemPrice}
            onChange={handleChange} 
            />
            <input 
            type="text"
            placeholder='Product/Item Brand'
            name="itemBrand"
            value={itemBrand}
            onChange={handleChange} 
            />
            <select name="itemCondition" id="" defaultValue="Product/Item Condition" onChange={handleChange}>
                <option defaultValue="" value="Product/Item Condition" disabled>Product/Item Condition</option>
                <option value="New">New</option>
                <option value="UK-used">UK-Used</option>
                <option value="US used">US-Used</option>
                <option value="Nigerian used">Nigerian Used</option>
                <option value="Others">Others</option>
            </select>
            <input 
            type="text"
            placeholder='Product/Item Colour'
            name="itemColour"
            value={itemColour}
            onChange={handleChange} 
            />
            <input 
            type="number"
            placeholder='Manufacturing Year'
            name='itemManufacturingYear'
            value={itemManufacturingYear} 
            onChange={handleChange}
            />
            <input 
            type="number"
            placeholder='Purchase Year'
            name="itemPurchaseYear"
            value={itemPurchaseYear}
            onChange={handleChange} 
            />
            <select name="receipt" defaultValue="Receipt Available?" onChange={handleChange}>
                <option defaultValue="" value="Receipt Available?" disabled>Receipt Available?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <textarea 
            rows="3" 
            placeholder='Product/Item Specification (item size, memory, specs and more)'
            name="itemDetails"
            value={itemDetails}
            onChange={handleChange}
            />
            <p>TIP: <i>For a faster sell, snap a clear picture of the item in all sides (front, back & sides)</i></p>
            <h3>Add Images below: <i>starting with header image</i></h3>
            <input 
            type="file"
            accept='.png, .jpeg, .jpg, .svg, .webp, .avif'
            multiple
            onChange={(e) => handleImage(e)} 
            />
            <input 
            type="submit" 
            value="Preview Ad Details" 
            onClick={(e) => uploadImages(e)}
            />
            {uploadProgress === 100 && <input type="submit" value="Post Ad" onClick={createAd}/>}
        </form>
        {/* {imageURL !== "" &&<div>
            <img src={imageURL} alt="" />
        </div>
        } */}
    </div>
  )
}
