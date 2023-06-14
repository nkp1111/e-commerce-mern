import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import MetaData from "../layout/MetaData";
import toast from 'react-hot-toast'
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, getProductDetails, updateProduct } from '../../actions/product'
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/product'

const UpdateProduct = () => {

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

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, product } = useSelector(state => state.productDetail)
  const { isUpdated, error: updateError, loading } = useSelector(state => state.productChange)

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }

    if (updateError) {
      toast.error(updateError)
      dispatch(clearErrors())
      return
    }

    if (isUpdated) {
      toast.success("Successfully updated product")
      navigate("/admin/products")
      dispatch({
        type: UPDATE_PRODUCT_RESET
      })
    }

    if (!product || product._id !== id) {
      dispatch(getProductDetails(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setSeller(product.seller)
      setStock(product.stock)
      setOldImages(product.images)
    }
  }, [dispatch, error, id, isUpdated, navigate, product, updateError]);

  const onChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    setOldImages([])

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
    dispatch(updateProduct(id, formData))
  }

  return (
    <>
      <MetaData title="Update product" />
      <div className="wrapper my-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
          <h1 className="mb-4">Update Product</h1>

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
            <textarea className="form-control" id="description_field" rows="8" value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category_field">Category</label>
            <select className="form-control" id="category_field"
              value={category} onChange={e => setCategory(e.target.value)}>
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

            {oldImages.length > 0 && oldImages.map((img, index) => (
              <img src={img.url} key={index} alt="preview" className='mt-2 me-3' width="55" height="50" />
            ))}

            {imagesPreview.map((img, ind) => (
              <img src={img} key={ind} alt="preview" className='mt-2 me-3' width="55" height="50" />
            ))}
          </div>


          <button
            id="login_button"
            type="submit"
            className="btn w-100 py-3"
            disabled={!!loading}
          >
            UPDATE
          </button>

        </form>
      </div>
    </>
  )
}

export default UpdateProduct
