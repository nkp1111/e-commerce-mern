import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import MetaData from "../layout/MetaData";
import toast from 'react-hot-toast'
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, createNewProduct } from '../../actions/product'
import { NEW_PRODUCT_RESET } from '../../constants/product'

const NewProduct = () => {

  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Music",
    "Sports",
    "Foods",
    "Beauty/Healthcare",
  ]

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch()
  const { loading, error, product, success } = useSelector(state => state.newProduct)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }

    if (success) {
      toast.success("New product added successfully")
      navigate("/admin/products")
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, navigate, success]);

  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("name", name)
    formData.set("price", price)
    formData.set("description", description)
    formData.set("stock", stock)
    formData.set("category", category)
    formData.set("seller", seller)
    images.forEach(image => {
      formData.append("images", image)
    })
    dispatch(createNewProduct(formData))
  }

  return (
    <>
      <div className="wrapper my-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
          <h1 className="mb-4">New Product</h1>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price_field">Price</label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description_field">Description</label>
            <textarea className="form-control" id="description_field" rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category_field">Category</label>
            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(category => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stock_field">Stock</label>
            <input
              type="number"
              id="stock_field"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller_field">Seller Name</label>
            <input
              type="text"
              id="seller_field"
              className="form-control"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Images</label>

            <div className='custom-file'>
              <input
                type='file'
                name='product_images'
                className='custom-file-input'
                id='customFile'
                onChange={onChange}
                multiple
              />
              <label className='custom-file-label' htmlFor='customFile'>
                Choose Images
              </label>
            </div>

            {imagesPreview.map((img, index) => (
              <img src={img} key={index} alt="preview" className='mt-2 me-3' width="55" height="50" />
            ))}
          </div>


          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-3"
            disabled={!!loading}
          >
            CREATE
          </button>

        </form>
      </div>
    </>
  )
}

export default NewProduct
