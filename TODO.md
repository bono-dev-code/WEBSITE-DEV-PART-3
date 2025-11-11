# Implement Search and Filter for Products by Meat Variety

## Overview
Add search and filter functionality to the products page, allowing users to filter by meat variety (Beef, Chicken, Lamb, Pork, Goat) and search by product name or description.

## Steps to Complete

### 1. Update Products HTML
- [x] Add search input field above the filter buttons in Pages/products.html

### 2. Implement ProductFilter JavaScript Class
- [x] Add ProductFilter class to js/main.js
- [x] Handle button clicks to filter by category
- [x] Handle search input to filter by text (name/description)
- [x] Combine filters: show products matching both category and search
- [x] Update active button styling

### 3. Initialize ProductFilter
- [x] Add initialization in the DOMContentLoaded event if on products page

### 4. Test Functionality
- [x] Test category filtering (Beef, Chicken, Lamb, Pork, Goat)
- [x] Test search functionality
- [x] Test combined filters
- [x] Ensure responsive design on mobile

## Notes
- Categories: Beef, Chicken, Lamb, Pork, Goat
- Search should be case-insensitive
- Maintain existing page functionality
