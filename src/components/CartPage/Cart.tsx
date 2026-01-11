// redux
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// components
import { DataGrid } from './DataGrid';

// email
import emailjs from '@emailjs/browser';

// pdf
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  pdf,
} from '@react-pdf/renderer';

// types
import { Item } from '../../types/types';

// utils
import { replaceUnderscores } from '../../utils/stringUtils';
import { CartForm } from './CartForm';

export const Cart = () => {
  const cartItems: Item[] = useSelector((state: any) => state.cart.items);
  const [pdfFile, setPdfFile] = useState<File>(new File([], ''));
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>('');
  const emailVaisselle = import.meta.env.VITE_EMAIL_VAISSELLE;

  // Handle email submission
  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);  // Store email in state
    console.log('User email:', email);
  };

  const PdfView = () => (
    <PDFViewer height='300px'width="100%">{generatePDF(cartItems)}</PDFViewer>
  );

  const generatePDF = (data: Item[]) => {
    // Crée un style pour les cellules du tableau
    const styles = StyleSheet.create({
      tableCell: {
        padding: 5,
        width: '20%',
        border: '1px solid black',
        fontSize: '16px',
      },
      tableHeaderCell: { padding: 5, fontWeight: 'bold' },
    });

    // Calcule les totaux et la TVA
    const totals = data.reduce(
      (acc, item) => {
        const totalHT = item.price * item.quantity;
        const tva = totalHT * 0.2;
        acc.totalHT += totalHT;
        acc.tva += tva;
        acc.totalTTC += totalHT + tva;
        return acc;
      },
      { totalHT: 0, tva: 0, totalTTC: 0 }
    );

    // Génère le contenu du PDF
    const PDFContent = (
      <Document>
        <Page size='A4' style={{ padding: '20px' }}>
          <Image
            source={'/logo_lv2.png'}
            style={{ width: '100px', position: 'absolute', top: 10, left: 20 }}
          />
          <Text
            style={{
              fontSize: '20px',
              marginBottom: '20px',
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
            Panier créé le {new Date().toLocaleDateString()}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Text style={styles.tableHeaderCell}>Produit</Text>
            <Text style={styles.tableHeaderCell}>Quantité</Text>
            <Text style={styles.tableHeaderCell}>Prix HT</Text>
            <Text style={styles.tableHeaderCell}>Total HT</Text>
            <Text style={styles.tableHeaderCell}>TVA</Text>
            <Text style={styles.tableHeaderCell}>Total TTC</Text>
          </View>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
                textAlign: 'center',
              }}
            >
              <Text style={styles.tableCell}>
                {replaceUnderscores(item.name)}
                {item.variant && ` (${item.variant})`}
              </Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price.toFixed(2)}</Text>
              <Text style={styles.tableCell}>
                {(item.price * item.quantity).toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                {(item.price * item.quantity * 0.2).toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                {(
                  item.price * item.quantity +
                  item.price * item.quantity * 0.2
                ).toFixed(2)}
              </Text>
            </View>
          ))}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.tableHeaderCell}>
              TOTAL HT: {totals.totalHT.toFixed(2)} €
            </Text>
            <Text style={styles.tableHeaderCell}>
              TOTAL TVA: {totals.tva.toFixed(2)} €
            </Text>
            <Text style={styles.tableHeaderCell}>
              TOTAL TTC: {totals.totalTTC.toFixed(2)} €
            </Text>
          </View>
        </Page>
      </Document>
    );

    return PDFContent;
  };

  // Generate the PDF and pass it to the CartForm component
  const handleGeneratePDF = async () => {
    const doc = generatePDF(cartItems);
    const blob = await pdf(doc).toBlob();
    const PDF = new File([blob], 'order.pdf', { type: 'application/pdf' }); // Convert Blob to File
    setPdfFile(PDF);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      handleGeneratePDF(); // Generate PDF when cart items are available
    }
  }, [cartItems]);

  return (
    <Box
      marginTop='100px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      marginBottom='1rem'
      boxSizing='border-box'
      sx={{ overflowX: 'hidden' }}
    >
      {cartItems.length > 0 ? (
        <>
          <Box
            display='flex'
            justifyContent='center'
            flexDirection={{ xs: 'column', lg: 'row' }}
            margin='1rem 0'
            width={{ xs: '90%', md: '95%' }}
            gap='1rem'
            alignItems='flex-start'
          >
            <DataGrid items={cartItems} />
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width={{ xs: '100%', lg: '600px', xl: '50%' }}>
              <PdfView />
              <CartForm cartItems={cartItems} pdfFile={pdfFile} onEmailSubmit={handleEmailSubmit} />
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          gap='1rem'
          marginY='3rem'
          height='100%'
        >
          <Typography variant='h4' style={{ color: '#204597' }}>Le panier est vide.</Typography>
          <img src='/panier_vide.png' alt='panier vide' width='300px' />
          <Typography>
            Choisissez au moins un produit pour le remplir 🍽️
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/accueil#category-grid')}
            sx={{
              background: "linear-gradient(to right, #204597, #2f4fb0, #546ed2ff)",
              borderRadius: '10px',
              fontWeight: 600,
              color: "#fff",
              padding: '15px 30px', 
              '&:hover': {
                background: "linear-gradient(to right, #123070ff, #1d3ea2ff, #3f5ddeff)", // slightly darker on hover
              },
            }}
          >
            Voir les catégories
          </Button>
        </Box>
      )}
    </Box>
  );
};
