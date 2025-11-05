import "../assets/styles/Product.css"
import icon_img from "../assets/images/icon-img.png"
import { toast } from "react-toastify";
import { getProduct, searchProduct, searchAutoComplete, searchText } from "../services/productService"
import { getSearchHistory, createSearchHistory, deleteSearchHistory } from "../services/searchHistoryService"
import Pagination from "../components/Pagination"
import Loading from "../components/loading";
import { useRef, useState, useEffect } from "react";
import Input from "../components/C-From/Input";

export default function Product() {
    const searchRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [isHistoryMode, setIsHistoryMode] = useState(false);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSuggestions([]);
                setIsHistoryMode(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct();
                console.log('Danh sách dữ liệu:', response.data);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                throw error;
            }
        }
        fetchProduct()
    }, [])

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }
            const result = await searchAutoComplete(searchTerm);

            setSuggestions(result);
        };
        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const handleIconClick = () => {
        document.getElementById("select_img").click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
            toast.error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF)");
            return;
        }

        setSelectedFile(file);
        setLoading(true);
        try {
            const results = await searchProduct(file, 5);
            console.log("Kết quả tìm kiếm sản phẩm:", results);
            setProducts(results);
        } catch (error) {
            console.error("Error searching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchTerm.trim() === "") return;
            try {
                const results = await searchText(searchTerm);
                const message = await createSearchHistory(searchTerm);
                console.log("Thông báo từ tạo lịch sử:", message);
                console.log("Kết quả search text:", results);

                setProducts(results);
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            }
        }
    };
    // --- Khi click vào input => hiển thị lịch sử ---
    const handleInputClick = async () => {
        if (searchTerm.trim() !== "") return; // chỉ khi input rỗng mới hiển thị lịch sử
        try {
            const history = await getSearchHistory();
            setSuggestions(Array.isArray(history) ? history : []);
            setIsHistoryMode(true); // bật chế độ lịch sử
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử tìm kiếm:", error);
        }
    };
    const handleDeleteHistory = async (historyId) => {
        try {
            const message = await deleteSearchHistory(historyId);
            console.log("Thông báo từ xóa lịch sử:", message);

            const updatedHistory = await getSearchHistory();
            setSuggestions(Array.isArray(updatedHistory) ? updatedHistory : []);
        }
        catch (error) {
            console.error("Lỗi khi xóa lịch sử tìm kiếm:", error);

        }
    }
    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-content">
                    <div className="product-header">
                        <div className="product-header-content">
                            <div className="product-search">
                                <div className="search-input">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onClick={handleInputClick}
                                    />
                                    {suggestions?.length > 0 && (
                                        <div className="search-autocomplete" ref={searchRef}>
                                            {suggestions.map((item, index) => {
                                                const text = item.queryText || item;
                                                return (
                                                    <div key={item.id || index} className="search-autocomplete-container">
                                                        <span
                                                            className="search-text"
                                                            onClick={() => {
                                                                setSearchTerm(text);
                                                                setSuggestions([]);
                                                                setIsHistoryMode(false);
                                                            }}
                                                        >
                                                            {text}
                                                        </span>

                                                        {/*  Nút xóa bên phải */}
                                                        {isHistoryMode && (
                                                            <span
                                                                className="delete-icon"
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // tránh trigger click vào item
                                                                    handleDeleteHistory(item.id);
                                                                }}
                                                            >
                                                                ✕
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                </div>
                                <div className="product-icon" onClick={handleIconClick}>
                                    <div className="corner_topR"></div>
                                    <div className="corner_topL"></div>
                                    <div className="corner_buttonR"></div>
                                    <div className="corner_buttonL"></div>
                                    <img src={icon_img} alt="" />
                                </div>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    id="select_img"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="product-filter">
                                <i className='bx bx-filter'></i>
                            </div>
                        </div>
                    </div>
                    <div className="product-list">
                        {loading ? (
                            <Loading />
                        ) : products.length > 0 ? (
                            products.map((item) => (
                                <div key={item.id} className="product-item">
                                    <div className="logo_product">
                                        <img src={item.logo} alt="Logo sản phẩm" />
                                    </div>
                                    <div className="name_product">
                                        {item.name}
                                    </div>
                                    <div className="img_product">
                                        <img src={item.imageUrl} alt="Ảnh sản phẩm" />
                                    </div>
                                    <div className="price_product">
                                        <span>Giá: </span> {item.price}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                    <Pagination />
                </div>
            </div>
        </div >
    );
}