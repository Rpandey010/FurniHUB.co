import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
    address: "",
    height: "",
    width: "",
    length: "",
    emailID: "", // Added emailID field
    sellerName: "", // Added sellerName field
    description: "",
  });

  const AddProduct = async () => {
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch("http://localhost:4000/products/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Product Added");
        } else {
          alert("Failed");
        }
      });
  }
};

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  
  return (
    <div className="addproduct" style={{ marginTop: "80px" }}>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            value={productDetails.old_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            value={productDetails.new_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Height</p>
        <input
          type="text"
          name="height"
          value={productDetails.height}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter height"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Width</p>
        <input
          type="text"
          name="width"
          value={productDetails.width}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter width"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Length</p>
        <input
          type="text"
          name="length"
          value={productDetails.length}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter length"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter description"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Email ID</p>
        <input
          type="email"
          name="emailID"
          value={productDetails.emailID}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter email ID"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Seller Name</p>
        <input
          type="text"
          name="sellerName"
          value={productDetails.sellerName}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter seller name"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Address</p>
        <input
          type="text"
          name="address"
          value={productDetails.address}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter address"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={(e) => {
            imageHandler(e);
          }}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button className="addproduct-btn" onClick={() => AddProduct()}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;