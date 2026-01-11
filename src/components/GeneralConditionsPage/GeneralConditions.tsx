import { Box } from '@mui/material';
import { GeneralConditionsContent } from './GeneralConditionsContent';
import { ProductBanner } from '../ProductPage/ProductBanner';

export const GeneralConditions = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <ProductBanner product='Nos conditions générales' />
      <GeneralConditionsContent />
    </Box>
  );
};
