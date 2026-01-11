import { Grid } from '@mui/material';
import { ProductInfo } from '../../types/types';
import { ProductShoppingCard } from './ProductShoppingCard';

type Props = {
  productsInfos: ProductInfo[];
};

export const ProductGrid = (props: Props) => {
  const { productsInfos } = props;
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='stretch'
      rowSpacing={4}
      columnSpacing={4}
      width={{ xs: '100%', lg: '95%', xl: '85%'}}
      paddingX={5}
      paddingY={5}
    >
      {productsInfos.map((productInfo, index) => (
        <Grid item key={productInfo.name + index} 
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2.5}
          display="flex"
          justifyContent="center"
          alignContent="center">
          <ProductShoppingCard product={productInfo} />
        </Grid>
      ))}
    </Grid>
  );
};
