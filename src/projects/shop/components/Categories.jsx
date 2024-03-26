import React from 'react';

function Categories(props) {
    const { categories, filter } = props;

    const setCategory = (selectedCategory) => {
        filter(selectedCategory);
    };

    return (
        <>
            <button
                className='category-option button'
                onClick={() => setCategory('all')}
            >
                All Categories
            </button>

            {
                categories.map((eachCategory, index) => {
                    return (
                        <button
                            key={`category-${index}`}
                            className='category-option button'
                            onClick={() => setCategory(eachCategory)}
                        >{eachCategory}</button>
                    )
                })
            }
        </>
    );
}

export default Categories