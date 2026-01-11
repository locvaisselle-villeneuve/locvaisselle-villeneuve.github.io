import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { replaceUnderscores } from '../../utils/stringUtils';

type Props = {
  title: string;
  image: string;
  price?: number;
  description?: string;
  navLink?: boolean;
};

export function Card(props: Props) {
  const { title, image } = props;

  const card = (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
      width={{ xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
      height='100%'
      boxShadow='0 4px 10px rgba(19, 41, 90, 0.5)'
      borderRadius='1rem'
      bgcolor='white'
      
      // translate the card up when the mouse is over it with 0.3s of animation
      onMouseOver={(e) => {
        e.currentTarget.style.transition = '0.3s';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transition = '0.3s';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <img
        src={image}
        alt={title}
        width='100%'
        height='70%'
        style={{
          objectFit: 'cover',
          borderRadius: '1rem 1rem 0 0',
          display: 'block'
        }}
      />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        flexDirection='column'
        width='100%'
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        height={{ xs: '100%', md: '100px' }}
        padding='1rem'
        margin='0'
        borderRadius='1rem'
        bgcolor= 'white'
        fontSize={{ xs: '1rem', sm: '1.1rem', md: '1rem', lg: '1.3rem' }}
      >
        <p style={{ margin: '0' }}>{replaceUnderscores(title)}</p>
        {props.price && (
          <Box>
            <p style={{ fontWeight: 'bold' }}>Prix : {props.price}€</p>
            {props.description && <p>{props.description}</p>}
          </Box>
        )}
      </Box>
    </Box>
  );

  if (!props.navLink) {
    return card;
  }

  return (
    <NavLink
      to={`/produits/${title.split('_')[0].toLowerCase()}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      {card}
    </NavLink>
  );
}
