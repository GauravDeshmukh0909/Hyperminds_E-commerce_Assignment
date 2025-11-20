import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../store/productDetailSlice";
import { addToCart } from "../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  if (!product) return null; // prevent undefined errors

  return (
    <>
      <style>{`
        .pd-container {
          max-width: 1100px;
          margin: auto;
          padding: 35px 20px;
          font-family: 'Inter', sans-serif;
        }

        .pd-flex {
          display: flex;
          gap: 45px;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .pd-image img {
          width: 420px;
          border-radius: 14px;
          padding: 15px;
          background: #fff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transition: transform 0.25s ease;
        }

        .pd-image img:hover {
          transform: scale(1.04);
        }

        .pd-info {
          flex: 1;
          padding-top: 10px;
        }

        .pd-title {
          font-size: 34px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .pd-price {
          font-size: 28px;
          color: #111;
          margin: 14px 0;
          font-weight: 700;
        }

        .pd-tags {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pd-tag {
          padding: 6px 16px;
          background: #f1f1f1;
          border-radius: 20px;
          font-size: 14px;
          color: #444;
        }

        .pd-desc {
          color: #555;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .pd-qty {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 25px;
        }

        .qty-box {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 10px;
          overflow: hidden;
        }

        .qty-btn {
          padding: 10px 16px;
          font-size: 20px;
          border: none;
          background: #fff;
          cursor: pointer;
          transition: 0.2s;
        }

        .qty-btn:hover {
          background: #000;
          color: #fff;
        }

        .qty-value {
          padding: 10px 20px;
          font-size: 18px;
          font-weight: 600;
          background: #f9f9f9;
        }

        .add-btn {
          background: black;
          color: white;
          padding: 14px 26px;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          font-size: 18px;
          font-weight: 600;
          transition: 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .add-btn:hover {
          background: #222;
          transform: translateY(-3px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .pd-image img {
            width: 100%;
          }
        }
      `}</style>

      <div className="pd-container">
        <div className="pd-flex">

          <div className="pd-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="pd-info">
            <div className="pd-title">{product.name}</div>

            <div className="pd-price">₹{product.price}</div>

            <div className="pd-tags">
              <div className="pd-tag">Stock: {product.stock}</div>
              <div className="pd-tag">Category: {product.category}</div>
            </div>

            <div className="pd-desc">{product.description}</div>

            {/* Quantity Selector */}
            <div className="pd-qty">
              <div className="qty-box">
                <button
                  className="qty-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  -
                </button>

                <div className="qty-value">{qty}</div>

                <button
                  className="qty-btn"
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() =>
                dispatch(addToCart({ productId: product._id, quantity: qty }))
              }
              className="add-btn"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetail;
