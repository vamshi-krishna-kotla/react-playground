import React, { useRef, useState, useEffect } from 'react'
import './Home.scss';
import Categories from './components/Categories.jsx';

function Home() {
    const allProducts = useRef([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const pageSize = 3;

    /**
     * using async function directly as callback is throwing
     * error, hence using an anonymous function to trigger the
     * async function inside useEffect
     */
    useEffect(() => {
        (async function() {
            const response = await fetch(`https://fakestoreapi.com/products`);
            const productData = await response.json();
            allProducts.current = productData;
            setProduct(productData);
        })();
    }, []);

    useEffect(() => {
        (async function() {
            const response = await fetch(`https://fakestoreapi.com/products/categories`);
            const categoryData = await response.json();
            setCategories(categoryData);
        })();
    }, []);

    let filteredArr = products;
    let startIndex;
    let endIndex;

    if (filteredArr) {
        startIndex = (pageNumber - 1) * pageSize;
        endIndex = Math.min(startIndex + pageSize, products.length);
        filteredArr = filteredArr.slice(startIndex, endIndex);
    }

    if (searchTerm != '') {
        filteredArr = filteredArr
                        .filter(product => {
                            let lowerSearchTerm = searchTerm.toLowerCase();
                            let lowerTitle = product.title.toLowerCase();

                            return lowerTitle.includes(lowerSearchTerm);
                        });
    }

    const sortMethod = (dir) => {
        if (!products) return;
        let sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            return (a.title[0] > b.title[0] && dir > 0) ? 1 : -1;
        });
        setProduct(sortedProducts);
        setPageNumber(1);
    };

    const filter = (category) => {
        const filteredList = [...allProducts.current];
        if (category == 'all') {
            setProduct(filteredList);
        } else {
            setProduct(filteredList.filter(product => (product.category === category)));
        }
        setPageNumber(1);
    };

    const updatePageNumber = (diff) => {
        setPageNumber(currentPageNum => (currentPageNum + diff));
    }

    return (
        <>
            <header className='nav-wrapper'>
                <input
                    className='search_input'
                    type='text'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                ></input>

                <div className='icons-container'>
                    <i className='button icon fa-solid fa-arrow-up' onClick={() => sortMethod(1)}></i>
                    <i className='button icon fa-solid fa-arrow-down' onClick={() => sortMethod(-1)}></i>
                </div>
            </header>

            <div className='categories-wrapper'>
                <Categories categories={categories} filter={filter}></Categories>
            </div>

            <main className='product-wrapper'>
                {
                    filteredArr === null ?
                    <h3>...Loading</h3> :
                    <>
                        {filteredArr.map((product, index) => {
                            return (
                            <div className='product' key={index}>
                                <img src={product.image} alt='' className='product_image'></img>
                                <div className='product_meta'>
                                    <p className='product_title'>Title: {product.title}</p>
                                    <p className='price'>Price: {product.price}</p>
                                </div>
                            </div>
                            )
                        })}
                    </>
                }
            </main>

            <footer className='pagination-wrapper'>
                <button
                    className='button update-page-number'
                    disabled={pageNumber === 1}
                    onClick={() => updatePageNumber(-1)}
                >
                    <i className='icon fa-solid fa-arrow-left'></i>
                </button>
                <span className='current-page'>{pageNumber}</span>
                <button
                    className='button update-page-number'
                    disabled={(pageNumber * pageSize >= products.length)}
                    onClick={() => updatePageNumber(1)}
                >
                    <i className='icon fa-solid fa-arrow-right'></i>
                </button>
            </footer>
        </>
    )
}

export default Home