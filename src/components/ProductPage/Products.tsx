import { Box } from '@mui/material';
import { Params, useParams } from 'react-router-dom';
import { ProductBanner } from './ProductBanner';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductGrid';
import productsJson from '../../assets/products.json';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { ProductInfo } from '../../types/types';

export function Produits() {
  const { product } = useParams<Params>();
  if (!product) return null;

  const [productsInfos, setProductsInfos] = useState<ProductInfo[]>([]);

  useEffect(() => {
    // get the product values from the json file and filter them to get only the ones that match the product
    const productValues = Object.entries(productsJson)
      .filter((entry) => {
        return entry[0].split('_').includes(capitalizeFirstLetter(product));
      })
      .flat()[1];

    // get the names of the products
    const names = Object.keys(productValues);

    // insert name in the productValues
    const dataObject = Object.values(productValues).map(
      (productValue, index) => {
        return { name: names[index], ...productValue };
      }
    );

    setProductsInfos(dataObject);
  }, [product]);

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      boxSizing='border-box'
    >
      <ProductBanner product={product} />
      <ProductGrid productsInfos={productsInfos} />
    </Box>
  );
}
