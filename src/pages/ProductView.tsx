import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProduct } from '../store/productSlice';
import ProductDetails from '../components/ProductDetails';
import Loader from '../components/Loader';

const ProductView: React.FC = () => {
  const dispatch = useDispatch<any>();
  const product = useSelector((state: RootState) => state.product.data);
  const productStatus = useSelector((state: RootState) => state.product.status);
  const config = useSelector((state: RootState) => state.config);

  useEffect(() => {
    if (productStatus === 'notLoading') {
      dispatch(fetchProduct());
    }
  }, [productStatus, dispatch]);

  if (productStatus === 'loading' || productStatus === 'notLoading') {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (productStatus === 'failed' || !product) {
    return <div>Error loading product data.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-yellow-500">Products</h2>

      {config.hasUserSection && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductView;
