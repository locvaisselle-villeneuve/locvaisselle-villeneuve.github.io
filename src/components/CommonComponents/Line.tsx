import { Box } from '@mui/material';

export function Line() {
  return (
    <Box
      component="hr"
      sx={{
        width: '25%',
        backgroundColor: '#294597',
        color: '#294597',
        height: '5px',
        borderRadius: '2.5px',
        border: 'none',
        mx: 'auto',
        my: { xs: 1, sm: 2, md: 3 }, 
      }}
    />
  );
}
