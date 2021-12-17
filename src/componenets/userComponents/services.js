import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
 


const tiers = [
  {
    title: 'Produit disponible',
    description: [
        'Notre entreprise offer la possibilite de choisir', 
        'd\'une grande liste des offres des tartes disponibles',
        
        <strong style={{fontSize:'17px'}}> Tarte de haute Qualite<br/>
                 Tarte prete a la livraison<br/>
                 Tres bon prix<br/>
        </strong>
    ],
    buttonText: 'Liste des produits',
    buttonVariant: 'contained',
  },
  {
    title: 'Produit personnalisé',
    subheader: '(Plus populaire)',
    description: [
      'Notre entreprise offer la possibilite de choisir le',
      'design et le gout que vous preferez pour votre tarte',
            <strong>Tarte de haute Qualite<br/>
        Designs personalises<br/>
        Tarte selon votre gout<br/>
        Tartes pour tout evenement</strong>

    ],
    buttonText: 'Commander un produit',
    buttonVariant: 'contained',
  },
  {
    title: 'Livraison',
    description: [
      'Notre entreprise offre le service de livraison',
      'des tartes disponible tout les jours de la semaine',
    <strong>
        Transport tres fidele et equipee<br/>
        Conducteur avec plus de 5ans d'experiece<br/>
        Livraison dans l'entourage de 60 km 

    </strong>
    ],
    buttonText: 'Livrer un produit',
    buttonVariant: 'contained',
  },
];



function Services() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    
      <Container maxWidth="100px" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: "#AB7CF7",borderRadius:'20px',
                  }}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button style={{backgroundColor:'#C59BF9',borderRadius:'20px',maxWidth:'300px',marginLeft:'50px'}} fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </React.Fragment>
  );
}

export default function Pricing() {
  return <Services />;
}