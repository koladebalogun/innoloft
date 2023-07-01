import React from 'react';
import DOMPurify from 'dompurify';
import { MapComponent } from '../components/Map';

const ProductDetails: React.FC<{ product: any }> = ({ product }) => {
  console.log(product);

  const sanitizerConfig = {
    ADD_TAGS: ['script'],
    FORBID_TAGS: ['script'],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-4">
      <div className="space-y-4">
        <img
          src={product.user.profilePicture}
          alt={product.user.firstName}
          className="w-24 h-24 object-cover rounded-full shadow-lg"
        />
        <h3 className="text-xl font-semibold">{`${product.user.firstName} ${product.user.lastName}`}</h3>
        <h4 className="text-lg font-semibold">{product.company.name}</h4>
        <div className="w-full overflow-hidden rounded-lg shadow-md">
          <iframe
            title="Product Video"
            className="w-full h-48 md:h-64"
            src={product.video.replace('watch?v=', 'embed/')}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <p className="font-semibold">Type: {product.type.name}</p>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description, sanitizerConfig),
          }}
        />
        <h4 className="font-semibold">Details Section</h4>
        <p className="font-semibold">
          Technologies/Categories:{' '}
          <span>
            {product.categories
              .map((category: any) => category.name)
              .join(', ')}
          </span>
        </p>
        <p className="font-semibold">
          Business Models:{' '}
          <span>
            {product.businessModels.map((model: any) => model.name).join(', ')}
          </span>
        </p>
        <p className="font-semibold">TRL: {product.trl.name}</p>
        <p className="font-semibold">
          Investment Effort / Cost: {product.investmentEffort}
        </p>
      </div>

      <section className="mt-10 col-span-full">
        <h3 className="text-xl font-semibold mb-2">Map</h3>
        <div className="w-full h-64 bg-gray-200">
          <MapComponent
            latitude={product?.company?.address?.latitude}
            longitude={product?.company?.address?.longitude}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
