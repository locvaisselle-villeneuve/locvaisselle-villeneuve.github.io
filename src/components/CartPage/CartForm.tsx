import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Item } from '../../types/types';
import { replaceUnderscores } from '../../utils/stringUtils';
import { MouseEvent } from 'react';

type Props = {
  cartItems: Item[];
  onEmailSubmit: (email: string) => void;
  pdfFile: File;
};

export const CartForm = (props: Props) => {
  // init states for each input field in the form
  const [state, setState] = useState({
    name: '',
    firstName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    message: '',
    address: '',
    city: '',
    product_table: '',
    product_list: '',
    totalPrice: '',
  });

  const [isMailSend, setMailSend] = useState(false);

  const formatDateForCalendar = (dateStr: string) => dateStr.replace(/-/g, '');


  useEffect(() => {

    let totalHT = 0;
    let totalTVA = 0;
    let totalTTC = 0;

    const productList = props.cartItems
      .map((item) => `${item.quantity}x ${replaceUnderscores(item.name)}${item.variant ? ` (${item.variant})` : ''}`)
      .join('\n');

    const generateTableRows = props.cartItems.map((item) => {
      const priceTimesQuantity = Number((item.price * item.quantity).toFixed(2));
      const TVA = ((priceTimesQuantity / 100) * 20).toFixed(2);
      const totalWithTax = ((priceTimesQuantity / 100) * 120).toFixed(2);

      totalHT += priceTimesQuantity;
      totalTVA += parseFloat(TVA);
      totalTTC += parseFloat(totalWithTax);

      return `
        <tr>
          <td>${replaceUnderscores(item.name)}${item.variant ? ` (${item.variant})` : ''}</td>
          <td>${item.quantity}</td>
          <td>${item.price} €</td>
          <td>${priceTimesQuantity} €</td>
          <td>${TVA} €</td>
          <td>${totalWithTax} €</td>
        </tr>
      `;
    }).join('');

    const tableHTML = `
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Qté</th>
            <th>Prix unitaire HT</th>
            <th>Prix total HT</th>
            <th>TVA</th>
            <th>Prix total TTC</th>
          </tr>
        </thead>
        <tbody>
          ${generateTableRows}
          <tr style="font-weight: bold;">
          <td colspan="3" style="text-align: right;">Montant total:</td>
          <td style="white-space: nowrap">${totalHT.toFixed(2)} €</td>
          <td style="white-space: nowrap">${totalTVA.toFixed(2)} €</td>
          <td style="white-space: nowrap">${totalTTC.toFixed(2)} €</td>
        </tr>
        </tbody>
      </table>`;

    setState({
      ...state,
      product_table: tableHTML,
      product_list: productList,
      totalPrice: Math.round(props.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)) + ' €',
    });
    setMailSend(false);
  }, [props.cartItems]);

  const sendEmail = (e: any) => {
    e.preventDefault();

    // Format date for emails
    const formatDateForEmail = (dateStr: string) => {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    const formattedStart = formatDateForEmail(state.startDate);
    const formattedEnd = formatDateForEmail(state.endDate);

    console.log('Start Date:', formattedStart);
    console.log('End Date:', formattedEnd);

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_TEMPLATE_KEY,
        {
          user_lastname: state.name,
          user_firstname: state.firstName,
          user_email: state.email,
          user_phone: state.phone,
          user_address: state.address,
          user_city: state.city,
          start_date: formattedStart,
          end_date: formattedEnd,
          message: state.message,
          product_table: state.product_table,
          product_list: state.product_list,
          total_price: state.totalPrice,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setMailSend(true);
        },
        (error) => {
          console.log('Email send failed:', error.text);
          alert(
            "Votre réservation n'a pas pu être envoyée. Veuillez réessayer plus tard ou nous contacter directement."
          );
        }
      );
  };

  const handleClick = (e: MouseEvent) => {
    setMailSend(true);
    sendEmail(e);

    if (state.email) {
      props.onEmailSubmit(state.email);
    }
  };

  return (
    <Box
      width={{ xs: '100%', md: '80%', lg: '100%' }}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      marginTop='2rem'
    >
      <Typography variant='h4' style={{ color: '#204597', textAlign: 'center' }} sx={{ marginBottom: '1rem' }}>
        Réservation de commande
      </Typography>
      <FormControl id="contact-form">
        <Box display='flex' width='100%' gap='1rem' paddingTop='1rem'>
          <TextField
            label='Nom'
            name="user_lastname"
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.name || ''}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            required
          />
          <TextField
            label='Prénom'
            name="user_firstname"
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.firstName || ''}
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
            required
          />
        </Box>
        <Box width='100%' display='flex' gap='1rem' paddingTop='1rem'>
          <TextField
            label='Email'
            name="user_email"
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.email || ''}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            required
          />
          <TextField
            label='Téléphone'
            name="user_phone"
            variant='outlined'
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.phone || ''}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            required
          />
        </Box>
        <Box
          width='100%'
          display='flex'
          gap='1rem'
          paddingTop='1rem'
          justifyContent='center'
        >
          <TextField
            label='Adresse'
            name="user_address"
            variant='outlined'
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.address || ''}
            onChange={(e) => setState({ ...state, address: e.target.value })}
            required
          />
          <TextField
            label='Ville et code postale'
            name="user_city"
            variant='outlined'
            sx={{ marginBottom: '1rem', width: '50%' }}
            value={state.city || ''}
            onChange={(e) => setState({ ...state, city: e.target.value })}
            required
          />
        </Box>
        <Box
          width='100%'
          display='flex'
          gap='1rem'
          padding-bottom='0.5rem'
          justifyContent='center'
        >
          <Typography>
            Même prix pour une journée ou week-end
          </Typography>
        </Box>
        <Box
          width='100%'
          display='flex'
          gap='1rem'
          paddingTop='1rem'
          justifyContent='center'
        >
          <TextField
            type='date'
            label='Date de début'
            name="start_date"
            InputLabelProps={{ shrink: true }}
            value={state.startDate || ''}
            onChange={(e) => setState({ ...state, startDate: e.target.value })}
            sx={{ marginBottom: '1rem', width: '50%' }}
            required
          />
          <TextField
            type='date'
            label='Date de fin'
            name="end_date"
            InputLabelProps={{ shrink: true }}
            size='medium'
            value={state.endDate || ''}
            onChange={(e) => setState({ ...state, endDate: e.target.value })}
            sx={{ marginBottom: '1rem', width: '50%' }}
            required
          />
        </Box>
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          paddingTop='1rem'
          alignContent='center'
          justifyContent='center'
        >
          <TextField
            label='Message'
            name="message"
            multiline
            rows={4}
            variant='outlined'
            sx={{ marginBottom: '1rem', width: '100%' }}
            InputLabelProps={{ shrink: true }}
            value={state.message || ''}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            placeholder='Merci de nous fournir le plus de détails possible sur votre commande.'
          />
          {!isMailSend ? (
            <Button
              variant='contained'
              sx={{
                margin: '0 auto',

                background: "linear-gradient(to right, #204597, #2f4fb0, #546ed2ff)",
                borderRadius: '10px',
                fontWeight: 600,
                maxWidth: '230px',
                color: "#fff",
                '&:hover': {
                  background: "linear-gradient(to right, #123070ff, #1d3ea2ff, #3f5ddeff)", // slightly darker on hover
                },
                "&.Mui-disabled": {
                  opacity: 0.7,
                  cursor: "default",
                  color: "#fff",
                },
              }}
              onClick={(e: any) => handleClick(e)}
              disabled={
                !state.name ||
                !state.firstName ||
                !state.email ||
                !state.phone ||
                !state.address ||
                !state.city ||
                !state.startDate ||
                !state.endDate
              }
            >
              Réserver
            </Button>
          ) : (
            <Typography>
              Merci pour votre réservation ! Vous recevrez une confirmation par mail.
            </Typography>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};
