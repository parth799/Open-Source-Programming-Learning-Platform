import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const featuredLanguages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Learn the language of the web with modern JavaScript.',
    image: '/images/javascript.png',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Master Python programming from basics to advanced concepts.',
    image: '/images/python.png',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Build robust applications with Java programming.',
    image: '/images/java.png',
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'Learn system programming with C++.',
    image: '/images/cpp.png',
  },
];

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', mb: 6 }}
      >
        Welcome to Programming Learning Platform
      </Typography>
      
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Featured Programming Languages
      </Typography>

      <Grid container spacing={4}>
        {featuredLanguages.map((language) => (
          <Grid item xs={12} sm={6} md={3} key={language.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={language.image}
                alt={language.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {language.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {language.description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/language/${language.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 4 }}
      >
        Why Choose Our Platform?
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Structured Learning Path
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow carefully curated roadmaps designed by industry experts to master programming languages effectively.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interactive Examples
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Practice with real-time coding examples and get instant feedback on your code.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Comprehensive Resources
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access a wide range of learning materials, from documentation to video tutorials.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 