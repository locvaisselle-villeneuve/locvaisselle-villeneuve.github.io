import { Box, Grid, Typography, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock} from '@fortawesome/free-solid-svg-icons';

export function ContactContent() {
  const map = (
    <Box display='flex' 
      justifyContent='center' 
      gap='1rem' 
      alignItems={{ xs: 'flex-start', md: 'center' }}
      width={{ sm: '50%' }}
      paddingLeft='1.5rem'
      paddingRight={{ xs: '1.5rem', md: '0' }}
      >
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.560847615986!2d4.829425311833962!3d46.01995699606592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4995bda25fc49%3A0xee479cff8e1d176!2slocation%20vaisselle%20villeneuve%2001!5e0!3m2!1sfr!2sfr!4v1690971909644!5m2!1sfr!2sfr'
        width='400'
        height='300'
        style={{ border: '3px solid #204597', borderRadius: '16px' }}
        loading='lazy'
      ></iframe>
    </Box>
  );

  const contactText = (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      gap='1rem'
      width={{ xs: '100%', sm: '50%' }}
      paddingLeft={{ xs: '1rem', md: '0' }}
      paddingRight={{ xs: '1rem', md: '0' }}
    >
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        width={{ xs: '95%', lg: '90%' }}
        sx={{
          gap: '1rem',
          backgroundColor: '#efefef',
          padding: { xs: '1rem', md: '1rem 2rem' },
          borderRadius: '16px',
        }}
      >
        <FontAwesomeIcon icon={faPhone} size="xl" style={{ color: "#204597", }} />
        <Box
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent='flex-start'
          gap={{ xs: '0.3rem', md: '1rem' }}
        >
          <Typography>
            Julie{' '}
            <Link
              href="tel:+33645846410"
              color="inherit"
              underline="hover"
            >
              06 45 84 64 10
            </Link>
          </Typography>
          <Typography>
            Franck{' '}
            <Link
              href="tel:+33674421087"
              color="inherit"
              underline="hover"
            >
              06 74 42 10 87
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        width={{ xs: '95%', lg: '90%' }}
        sx={{
          gap: '1rem',
          backgroundColor: '#efefef',
          padding: { xs: '1rem', md: '1rem 2rem' },
          borderRadius: '16px',
        }}
      >
        <FontAwesomeIcon icon={faEnvelope} size="xl" style={{ color: "#204597", }} />
        <Typography>
          <Link
            href="mailto:locvaisselle.villeneuve@gmail.com"
            color="inherit"
            underline="hover"
          >
            locvaisselle.villeneuve@gmail.com
          </Link>
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        width={{ xs: '95%', lg: '90%' }}
        sx={{
          gap: '1rem',
          backgroundColor: '#efefef',
          padding: { xs: '1rem', md: '1rem 2rem' },
          borderRadius: '16px',
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} size="xl" style={{ color: "#204597", }} />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Typography>
            LV2 SAS 71 Zone Artisanale de Vaize 01480 Villeneuve
          </Typography>
          <Typography>En face de Auto Contrôle Villeneuvois</Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        width={{ xs: '95%', lg: '90%' }}
        sx={{
          gap: '1rem',
          backgroundColor: '#efefef',
          padding: { xs: '1rem', md: '1rem 2rem' },
          borderRadius: '16px',
        }}
      >
        <FontAwesomeIcon icon={faClock} size="xl" style={{ color: "#204597", }} />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent='center'
            alignItems='flex-start'
            gap={{ xs: '0rem', md: '1rem' }}
          >
            <Typography>Retrait: Vendredi 18h</Typography>
            <Typography>Retour: Lundi 8h</Typography>
          </Box>
          <Typography>Pour autres horaires, appelez nous !</Typography>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box
      width='100%'
      display='flex'
      gap='1rem'
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent='center'
      marginTop='calc(30px + 1rem)'
      marginBottom='calc(30px + 1rem)'
    >
      {map}
      {contactText}
    </Box>
  );
}
