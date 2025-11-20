import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setPage,
} from "../store/productSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
    search,
    category,
    page,
    itemsPerPage,
    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Correct filter logic
  const filtered = products.filter((p) => {
    const name = p.name?.toLowerCase() || "";
    const cat = p.category?.toLowerCase() || "";
    const matchSearch = name.includes(search.toLowerCase());
    const matchCategory = category === "all" ? true : cat === category.toLowerCase();
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <style>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        .home-container {
          padding: 40px 30px;
          max-width: 1200px;
          margin: auto;
        }

        h2 {
          font-size: 32px;
          margin-bottom: 25px;
          font-weight: 800;
          text-align: center;
          color: #111;
        }

        /* Filters */
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
          justify-content: center;
        }

        .search-box input {
          padding: 13px 18px;
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 12px;
          font-size: 16px;
          transition: 0.3s;
          background: #fafafa;
        }

        .search-box input:focus {
          border-color: #000;
          background: #fff;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
        }

        .category-select select {
          padding: 13px 18px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: #fafafa;
          font-size: 16px;
          transition: 0.3s;
        }

        .category-select select:hover {
          border-color: #000;
        }

        /* Product Grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
          margin-top: 20px;
        }

        /* Product Card */
        .product-card {
          padding: 20px;
          border-radius: 16px;
          background: white;
          border: 1px solid #e6e6e6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.15);
        }

        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: contain;
          border-radius: 14px;
          padding: 14px;
          background: #f7f7f7;
          margin-bottom: 12px;
        }

        .product-card h3 {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #222;
        }

        .product-card p {
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
        }

        .product-price {
          margin-top: 10px;
          font-size: 18px;
          font-weight: 800;
          color: #111;
        }

        /* View Product Button */
        .view-btn {
          margin-top: 12px;
          padding: 10px 18px;
          background: #111;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
        }

        .view-btn:hover {
          background: #444;
        }

        /* Pagination */
        .pagination {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          justify-content: center;
        }

        .pagination button {
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid #111;
          background: white;
          font-size: 15px;
          cursor: pointer;
          transition: 0.25s;
        }

        .pagination button.active,
        .pagination button:hover {
          background: #111;
          color: white;
        }
      `}</style>

      <div className="home-container">
        <h2>🛍️ Product Catalogue</h2>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </div>

          <div className="category-select">
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              <option value="all">All</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>

        {/* Product list */}
        <div className="product-grid">
          {paginated.map((p) => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>Category: {p.category}</p>
              <p className="product-price">₹{p.price}</p>
              <button
                className="view-btn"
                onClick={() => navigate(`/product-detail/${p._id}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={num === page ? "active" : ""}
              onClick={() => dispatch(setPage(num))}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
