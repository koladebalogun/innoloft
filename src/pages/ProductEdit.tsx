import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProduct, updateProduct } from '../store/productSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTrlList } from '../store/trlSlice';
import Select from 'react-select';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const ProductEdit: React.FC = () => {
  const dispatch = useDispatch<any>();
  const product = useSelector((state: RootState) => state.product.data);
  const productStatus = useSelector((state: RootState) => state.product.status);
  const [updatedProduct, setUpdatedProduct] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const trlList = useSelector((state: RootState) => state.trl.data);
  const trlListStatus = useSelector((state: RootState) => state.trl.status);
  const navigate = useNavigate();

  // console.log(updatedProduct);

  useEffect(() => {
    if (productStatus === 'notLoading') {
      dispatch(fetchProduct());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (trlListStatus === 'notLoading') {
      dispatch(fetchTrlList());
    }
  }, [trlListStatus, dispatch]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuillChange = (content: string) => {
    const sanitizedDescription = content.replace(
      /console\.log\('test'\);/g,
      '',
    );
    setUpdatedProduct({ ...updatedProduct, description: sanitizedDescription });
  };

  const handleSelectChange = (value: any, actionMeta: any) => {
    setUpdatedProduct({ ...updatedProduct, trl: value.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct(updatedProduct));
      navigate(`/product/${id}`);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  if (productStatus === 'loading' || productStatus === 'notLoading') {
    return <div>Loading...</div>;
  }

  if (productStatus === 'failed' || !updatedProduct) {
    return <div>Error loading product data.</div>;
  }

  const trlOptions = trlList.map((trl: any) => ({
    value: trl.id,
    label: `TRL ${trl.id}: ${trl.name}`,
  }));

  const currentTrl = {
    value: updatedProduct.trl.id,
    label: `TRL ${updatedProduct.trl.id}: ${updatedProduct.trl.name}`,
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="categories" className="block">
              Categories:
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={updatedProduct.categories
                .map((category: any) => category.name)
                .join(', ')}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="businessModels" className="block">
              Business Models:
            </label>
            <input
              type="text"
              id="businessModels"
              name="businessModels"
              value={updatedProduct.businessModels
                .map((model: any) => model.name)
                .join(', ')}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="trl" className="block">
            TRL:
          </label>
          <Select
            id="trl"
            value={currentTrl}
            onChange={handleSelectChange}
            options={trlOptions}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block">
            Description:
          </label>
          <Quill
            id="description"
            value={updatedProduct.description}
            onChange={handleQuillChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold border border-blue-500 hover:border-blue-600 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
