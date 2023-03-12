import React from 'react';
import './help.css';

function Help() {
  return (
    <div className="help-page">
      <h1>Guidelines and Help</h1>

      <h2>1. Account</h2>
      <p>
        You need to create an account to make a purchase. Click on the Sign Up
        button and fill in the required details.
      </p>

      <h2>2. Browse Products</h2>
      <p>
        Browse through our categories and products to find what you're looking
        for. You can also use the search bar to find a specific product.
      </p>

      <h2>3. Add to Cart</h2>
      <p>
        To add a product to your cart, simply click on the Add to Cart button
        located on the product page. You can view your cart by clicking on the
        Cart icon in the top right corner of the page.
      </p>

      <h2>4. Checkout</h2>
      <p>
        Once you have added all the products you want to purchase to your cart,
        click on the Checkout button to proceed to payment. You can use your
        saved payment details or add new ones.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions or issues, please don't hesitate to contact
        our support team. You can email us at support@ecommerce.com or call us
        at +1-800-123-4567.
      </p>
    </div>
  );
}

export default Help;
