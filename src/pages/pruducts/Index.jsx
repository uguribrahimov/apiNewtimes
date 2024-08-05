import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Product = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Product page</h2>
      {id ? (
        <p>Product ID: {id}</p>
      ) : (
        <div>
          <Button color="primary" tag={Link} to="/product/1">Product 1</Button>{' '}
          <Button color="primary" tag={Link} to="/product/2">Product 2</Button>{' '}
          <Button color="primary" tag={Link} to="/product/3">Product 3</Button>
        </div>
      )}
    </div>
  );
};

export default Product;
