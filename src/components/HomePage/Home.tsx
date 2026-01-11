import { Box, Typography } from '@mui/material';
import backgroundImage from '../../assets/background.jpg';
import logo from '../../assets/logos/logo_lv2.png';
import { Description } from './Description';
import { Line } from '../CommonComponents/Line';
import { CategoryGrid } from './CategoryGrid';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Accueil() {
  const products = [
    'assiettes',
    'couverts',
    'verres',
    'desserts_et_cafe',
    'accessoires_pour_la_table',
    'mobiliers_et_machines',
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#category-grid') {
      const element = document.getElementById('category-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <Box width='100%' maxWidth="100vw" boxSizing='border-box'>
      <Box
        minHeight='100%'
        width='100%'
        display='flex'
        justifyContent={{ xs: 'flex-start', sm: 'center', md: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
        alignItems='center'
        gap={{ xs: 2, sm: 3, md: 3 }}
        paddingTop={{ xs: '11rem', sm: '11rem', md: '10rem' }}
        paddingBottom={{ xs: '4rem', sm: '6rem', md: '3rem' }}
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(222,222, 222, .85), rgba(222,222, 222, .85)),  url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: { xs: 'scroll', lg: 'fixed' },
        }}
      >
        <Box display='flex'
          justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
          alignItems='center'
          width={{ xs: '300px', md: '500px', lg: '700px' }} >
          <img
            src={logo}
            alt='Logo Location Vaisselle Villeneuve'
            width='90%'
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Typography variant='h2'>LOCATION</Typography>
          <Typography variant='h2'>VAISSELLE</Typography>
          <Typography variant='h4' sx={{ mt: 2 }}>On loue, on lave</Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        padding='1rem 0'>
        <Line />
        <Description
          text='Pour vos Anniversaires, repas, fête ou tout autres événements, LV2 vous propose un large choix de vaisselles et matériels.
Installé à Villeneuve, nous vous proposons un service convivial de qualité pour que votre occasion soit à votre image.
Nous restons joignables pour tout renseignements et réservations.'
        />
        <Line />
      </Box>
      <CategoryGrid products={products} />
    </Box>
  );
}
