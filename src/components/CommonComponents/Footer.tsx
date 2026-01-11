import { Box, Grid, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { SendEmailV3_1 } from 'node-mailjet';

export function Footer() {
  return (
    <Box id="contact" sx={{ backgroundColor: '#1e3a5f', color: 'white' }}>
      <Box maxWidth="7xl" sx={{ mx: 'auto', px: { xs: 4, sm: 4, lg: 5 }, py: 5 }}>
        <Grid container justifyContent={{xs:'flex-start', md:"space-evenly"}} columnGap={{ xs: '1', md: '0' }} rowGap={2}>
          {/* Hours */}
          <Grid item xs={12} sm={4} md={3} mr={2}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(96, 165, 250, 0.2)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faClock} style={{ color: '#93c5fd' }} />
              </Box>
              <Typography variant="h6">Horaires support</Typography>
            </Box>
            <Box sx={{ color: '#bfdbfe' }}>
              <Typography>Retrait: Vendredi 18h</Typography>
              <Typography>Retour: Lundi 8h</Typography>
              <Typography sx={{ pt: 1 }} fontSize="0.875rem">Pour autres horaires, appelez nous !</Typography>
            </Box>
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={3} md={3} mr={2}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(96, 165, 250, 0.2)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faLocationDot} style={{ color: '#93c5fd' }} />
              </Box>
              <Typography variant="h6">Adresse</Typography>
            </Box>
            <Box sx={{ color: '#bfdbfe' }}>
              <Typography>LV2 SAS</Typography>
              <Typography>71 ZA de Vaize</Typography>
              <Typography>01480 VILLENEUVE</Typography>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4} md={3}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(96, 165, 250, 0.2)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faPhone} style={{ color: '#93c5fd' }} />
              </Box>
              <Typography variant="h6">Contact</Typography>
            </Box>
            <Box sx={{ color: '#bfdbfe' }}>
              <Box mb={1}><Link href="tel:+33645846410" color="inherit" underline="hover">Julie 06 45 84 64 10</Link></Box>
              <Box mb={1}><Link href="tel:+33674421087" color="inherit" underline="hover">Franck 06 74 42 10 87</Link></Box>
              <Box><Link href="mailto:locvaisselle.villeneuve@gmail.com" color="inherit" underline="hover">locvaisselle.villeneuve@gmail.com</Link></Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider and Conditions générales */}
        <Box mt={{xs:3, md:5}} pt={{xs:3, md:5}} borderTop="1px solid rgba(96, 165, 250, 0.2)" textAlign="center">
          <NavLink to="/conditions-generales" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '0.875rem' }}>
            Conditions générales
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}