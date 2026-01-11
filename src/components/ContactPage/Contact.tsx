import { Box } from '@mui/material';
import { ContactContent } from './ContactContent';
import { ProductBanner } from '../ProductPage/ProductBanner';

export const Contact = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <ProductBanner product='Contactez-nous' />
      <ContactContent />
    </Box>
  );
};
