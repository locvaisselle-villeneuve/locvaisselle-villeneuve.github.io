import { useDispatch } from 'react-redux';
import { setItemQuantity, clearItemFromCart } from '../../reducers/cart';
import { Item } from '../../types/types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { replaceUnderscores } from '../../utils/stringUtils';

type Props = {
  items: Item[];
};

export const DataGrid = ({ items }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (value: number, item: Item) => {
    dispatch(
      setItemQuantity({
        name: item.name,
        variant: item.variant,
        quantity: value,
      })
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      maxHeight='60vh'
      sx={{
        border: '1px solid black', 
        overflowX: 'scroll', 
        overflowY: 'scroll', 
        scrollbarWidth: 'thin', // Firefox
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.05)',
        },
      }}
    >
      <Table sx={{ minWidth: 700 }}>
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 2,
          }}>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                left: 0,
                top: 0,
                backgroundColor: 'white',
                zIndex: 10,
              }}>
              Nom
            </TableCell>
            <TableCell>Quantité</TableCell>
            <TableCell>Prix unitaire HT</TableCell>
            <TableCell>Prix total HT</TableCell>
            <TableCell>TVA</TableCell>
            <TableCell>Prix total TTC</TableCell>
            <TableCell>Supprimer</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item: Item, index: number) => {
            const priceTimesQuantity = Number((item.price * item.quantity).toFixed(2));
            const tva = Number((priceTimesQuantity * 0.2).toFixed(2));
            const totalTTC = Number((priceTimesQuantity + tva).toFixed(2));

            return (
              <TableRow key={index} sx={{ bgcolor: 'lightblue' }}>
                {/* Sticky first column: Name */}
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'lightblue',
                    zIndex: 1,
                  }}
                >
                  {replaceUnderscores(item.name)}
                  {item.variant && ` (${item.variant})`}
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    sx={{ width: '5rem' }}
                    inputProps={{ min: 1 }}
                    value={item.quantity}
                    onChange={(e) => handleChange(Number(e.target.value), item)
                    }
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.price.toFixed(2)} €</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{priceTimesQuantity.toFixed(2)} €</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{tva.toFixed(2)} €</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{totalTTC.toFixed(2)} €</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      dispatch(
                        clearItemFromCart({
                          name: item.name,
                          variant: item.variant,
                        })
                      )
                    }
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          {/* TOTAL ROW */}
          <TableRow sx={{
            bgcolor: '#76a7b7ff', fontWeight: 'bold', position: 'sticky',
            bottom: 0,
            zIndex: 2
          }}>
            <TableCell>Totaux</TableCell>
            <TableCell>
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              {items
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)} €
            </TableCell>
            <TableCell>
              {items
                .reduce((acc, item) => acc + item.price * item.quantity * 0.2, 0)
                .toFixed(2)} €
            </TableCell>
            <TableCell>
              {items
                .reduce(
                  (acc, item) => acc + item.price * item.quantity * 1.2,
                  0
                )
                .toFixed(2)} €
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
