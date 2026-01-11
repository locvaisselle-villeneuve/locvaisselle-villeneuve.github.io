import { Box, Button, Menu, MenuItem, Badge, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logos/logo_lv2.png';

export function Header() {
  const products: string[] = [
    'Assiettes',
    'Couverts',
    'Verres',
    'Desserts et café',
    'Accessoires pour la table',
    'Mobiliers et machines',
  ];

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open: boolean = !!anchorEl;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const cartItems = useSelector((state: any) => state.cart.items);
  const totalItems = cartItems.length;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      width='100%'
      maxWidth='100vw'
      overflow='hidden'
      height='100px'
      position='fixed'
      top='0'
      bgcolor='white'
      borderBottom='1px solid black'
      zIndex={4}
      sx={{ px: { xs: 1, sm: 2, md: 3 } }}
    >
      {/* LOGO + TITLE */}
      <Box
        display='flex'
        alignItems='center'
        minWidth={0}
        flexShrink={0}
      >
        <NavLink to='/' style={{ display: 'block', width: 80, minWidth: 60 }}>
          <Button sx={{ borderRadius: '15%', p: 0, minWidth: 0 }}>
            <img
              src={logo}
              alt='Logo Location Vaisselle Villeneuve'
              width='100%'
              height='100%'
            />
          </Button>
        </NavLink>
        <Typography variant='h4'
          style={{ color: '#204597' }}
          sx={{
            fontSize: { sm: '1.25rem' },
            display: { xs: 'none', md: 'block' },
            ml: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          Location Vaisselle Villeneuve
        </Typography>
      </Box>

      {/* RIGHT MENU*/}
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        minWidth={0}
        flexShrink={1}
        flexGrow={0}
        sx={{
          ml: 'auto',
        }}
      >
        <NavLink to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
          <Badge
            badgeContent={totalItems}
            color='error'
            overlap='rectangular'
            invisible={totalItems === 0}
          >
            <Button sx={{borderRadius: '15%'}}>
              Panier
            </Button>
          </Badge>
        </NavLink>
        <Button
          sx={{borderRadius: '15%'}}
          onClick={handleClick}
          onMouseEnter={handleClick}
        >
          Locations
        </Button>
        {/* menu to display the products */}

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
          disableScrollLock
        >
          {products.map((product, index) => (
            <NavLink
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/produits/${product.split(' ')[0].toLowerCase()}`}
              key={`${product}-${index}`}
            >
              {/* remove link style */}
              <MenuItem sx={{ justifyContent: 'center' }} onClick={handleClose}>
                {product.toUpperCase()}
              </MenuItem>
            </NavLink>
          ))}
        </Menu>
        <NavLink to='/contact'>
          <Button sx={{borderRadius: '15%'}}>
            Contact
          </Button>
        </NavLink>
      </Box>
    </Box >
  );
}
