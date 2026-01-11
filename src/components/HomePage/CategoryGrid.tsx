import { Grid } from '@mui/material';
import { Card } from './Card';

type Props = {
  products: string[];
};

export function CategoryGrid(props: Props) {
  const { products } = props;

  return (
    <Grid
      id="category-grid"
      container
      gap={{ xs: 2, sm: 2, md: 1, lg: 2 }}
      alignItems='stretch'
      justifyContent='center'
      pt={{ xs: 2, md: 4 }}
      pb={{ xs: 4, md: 6 }}
      px={{ xs: 1, md: 2 }}
      sx={{
        backgroundColor: '#efefef',
        ml: 0,
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      {products.map((product: string, index) => (
        <Grid item xs={5} sm={3} md={1.9} lg={1.8} key={product + index}>
          <Card
            title={product.toUpperCase()}
            image={`/tooltips/${product}.jpg`}
            navLink
          />
        </Grid>
      ))}
    </Grid>
  );
}
