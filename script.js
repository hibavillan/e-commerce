// Sample product data
const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef', description: 'A powerful laptop for work and play.' },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: 20, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27', description: 'Comfortable cotton t-shirt.' },
    { id: 3, name: 'Headphones', category: 'electronics', price: 150, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb', description: 'High-quality wireless headphones.' },
    { id: 4, name: 'Jeans', category: 'clothing', price: 50, image: 'https://images.unsplash.com/photo-1714143164072-7646ef5cb24d', description: 'Stylish denim jeans.' },
    { id: 5, name: 'Watch', category: 'accessories', price: 200, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49', description: 'Elegant wristwatch.' },
    { id: 6, name: 'Sunglasses', category: 'accessories', price: 30, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f', description: 'UV-protective sunglasses.' },
    { id: 7, name: 'Smartphone', category: 'electronics', price: 699, image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a', description: 'Latest smartphone with advanced features.' },
    { id: 8, name: 'Sneakers', category: 'clothing', price: 80, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3', description: 'Comfortable running sneakers.' }
];

const categories = ['electronics', 'clothing', 'accessories'];

let currentCategory = null;
let filteredProducts = [...products];

// DOM elements
const categoryList = document.querySelector('.category-list');
const productsGrid = document.querySelector('.products-grid');
const applyFiltersBtn = document.getElementById('apply-filters');
const clearFiltersBtn = document.getElementById('clear-filters');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');

// Initialize the app
function init() {
    renderCategories();
    renderProducts();
}

// Render categories
function renderCategories() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-item';
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        if (currentCategory === category) {
            button.classList.add('selected-category');
        }
        button.addEventListener('click', () => {
            filterByCategory(category);
            renderCategories(); // re-render to update selected button style
        });
        categoryList.appendChild(button);
    });
}

// Render products
function renderProducts() {
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="viewProductDetails(${product.id})">View Details</button>
        `;
        productsGrid.appendChild(productDiv);
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    filteredProducts = products.filter(product => product.category === category);
    renderProducts();
}

// Apply price filters
function applyFilters() {
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
    filteredProducts = products.filter(product => {
        const matchesCategory = !currentCategory || product.category === currentCategory;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });
    renderProducts();
}

// Clear filters
function clearFilters() {
    currentCategory = null;
    priceMinInput.value = '';
    priceMaxInput.value = '';
    filteredProducts = [...products];
    renderProducts();
    renderCategories(); // update category buttons to remove selection
}

// View product details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Store product data in localStorage for the details page
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        // Navigate to product details page
        window.location.href = 'product-details.html';
    }
}

// Event listeners
applyFiltersBtn.addEventListener('click', applyFilters);
clearFiltersBtn.addEventListener('click', clearFilters);

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
