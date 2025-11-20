import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Increase quantity
  const inc = (productId, qty) => {
    dispatch(updateCartItem({ id: productId, quantity: qty + 1 }));
  };

  // Decrease quantity
  const dec = (productId, qty) => {
    if (qty > 1) {
      dispatch(updateCartItem({ id: productId, quantity: qty - 1 }));
    }
  };

  // Remove item from cart
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <>
      <style>{`
        .cart-container {
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
          max-width: 900px;
          margin: auto;
        }

        .cart-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 25px;
          text-align: center;
        }

        .cart-item {
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 16px;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          margin-bottom: 15px;
          background: white;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cart-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .product-img {
          width: 110px;
          height: 110px;
          border-radius: 10px;
          object-fit: cover;
        }

        .item-info {
          flex: 1;
        }

        .item-info h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .item-price {
          margin-top: 6px;
          font-size: 16px;
          color: #444;
        }

        .qty-control {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .qty-btn {
          padding: 6px 12px;
          border: 1px solid #000;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        }

        .qty-btn:hover {
          background: #000;
          color: white;
        }

        .remove-btn {
          padding: 8px 16px;
          background: #ff4242;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s;
        }

        .remove-btn:hover {
          background: #cc0000;
        }

        .total-box {
          margin-top: 25px;
          padding: 18px;
          border: 2px solid #000;
          border-radius: 12px;
          font-size: 22px;
          text-align: center;
          font-weight: bold;
          background: #fafafa;
        }
      `}</style>

      <div className="cart-container">
        <div className="cart-title">🛒 Your Cart</div>

        {items.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img
                className="product-img"
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="item-info">
                <h3>{item.product.name}</h3>
                <p className="item-price">₹{item.product.price}</p>
              </div>

              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => dec(item.product._id, item.quantity)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() => inc(item.product._id, item.quantity)}
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.product._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}

        {items.length > 0 && (
          <div className="total-box">Total: ₹{total}</div>
        )}
      </div>
    </>
  );
};

export default Cart;
