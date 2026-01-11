import { Box, Typography, Button } from '@mui/material';
import { Line } from '../CommonComponents/Line';
import { useNavigate } from 'react-router-dom';


export function GeneralConditionsContent() {
  const navigate = useNavigate();
  return (
    
    <Box width='100%'
      height='100%'
      paddingLeft={{ xs: '1rem', sm: '2rem', md: '3rem' }}
      paddingRight={{ xs: '1rem', sm: '2rem',md: '3rem' }}
      paddingTop={{ xs: '1rem', md: '2rem', lg: '3rem' }}
      paddingBottom={{ xs: '1rem', md: '2rem', lg: '3rem' }}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
        <Line />
        <Typography 
        lineHeight={1.7}
        fontSize={{xs: '1rem', md: '18px', xl: '20px'}}>
          <ol>
            <li>Les tarifs sont valables à la journée ou pour le week-end.</li>
            <li>Tout les prix affiché sont les prix hors taxes; La location est due même si le matériel n’a pas servi.</li>
            <li>Le matériel est sous l’entière responsabilité du client jusqu’à la reprise ou restitution.</li>
            <li>Le client est responsable du matériel dès la remise à disposition de celui-ci.</li>
            <li>La vaisselle arrive propre dans des conditionnements appropriés et sera retournée sale, mais débarrassée des aliments dans les mêmes conditionnements.</li>
            <li>En cas de perte,casse ou detérioraton, l’article manquant sera facturé 3€ pieces (Sauf rubrique "accessoires pour la table" et "machines et mobilier" à prix coûtant).</li>
            <li>Un chèque de caution sera réclamé à la remise du matériel et restitué après contrôle au retour du matériel, et encaissement de la facture.</li>
            <li>Pour éviter toute contestation, le client est tenu d’être présent à la remise ainsi qu’à la reprise du matériel pour vérification.</li>
            <li>Toute manutention non prévue au devis initial, ou temps d’attente, feront l’objet d’une facture complémentaire.</li>
            <li>Dans le site, les photos ne sont pas contractuelles.</li>
          </ol>
        </Typography>
        <Button
            variant="contained"
            onClick={() => navigate('/accueil#category-grid')}
            sx={{
              background: "linear-gradient(to right, #204597, #2f4fb0, #546ed2ff)",
              borderRadius: '16px',
              padding: '15px 30px',
              margin: '20px 0',
              fontWeight: 600,
              whiteSpace: "nowrap",
              '&:hover': {
                background: "linear-gradient(to right, #123070ff, #1d3ea2ff, #3f5ddeff)", // slightly darker on hover
              },
            }}
          >
            Voir les produits
          </Button>
        <Line />
    </Box>
  );
};
