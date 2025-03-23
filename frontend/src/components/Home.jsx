import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  LinearProgress,
  Divider,
  Chip
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  const [featuredLanguages, setFeaturedLanguages] = useState([]);

  useEffect(() => {
    // If user has selected languages, use those
    if (currentUser && currentUser.learningProgress && currentUser.learningProgress.length > 0) {
      setFeaturedLanguages(currentUser.learningProgress.map(item => ({
        id: item.language.toLowerCase(),
        name: item.language,
        progress: item.progress || 0,
        description: `Continue your learning journey with ${item.language}.`,
        image: `/images/languages/${item.language.toLowerCase()}.png`
      })));
    } else {
      // Otherwise show some default featured languages
      setFeaturedLanguages([
        {
          id: 'javascript',
          name: 'JavaScript',
          progress: 0,
          description: 'Learn the language of the web. Build interactive websites and web applications.',
          image: '/images/languages/javascript.png'
        },
        {
          id: 'python',
          name: 'Python',
          progress: 0,
          description: 'A versatile language used in data science, web development, and automation.',
          image: '/images/languages/python.png'
        },
        {
          id: 'java',
          name: 'Java',
          progress: 0,
          description: 'Build enterprise applications, Android apps, and more with this powerful language.',
          image: '/images/languages/java.png'
        }
      ]);
    }
  }, [currentUser]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome{currentUser ? `, ${currentUser.username}!` : '!'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {currentUser 
            ? 'Continue your learning journey or explore new programming languages.'
            : 'Explore programming languages and start your learning journey.'}
        </Typography>
      </Box>

      {currentUser && currentUser.learningProgress && currentUser.learningProgress.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Learning Progress
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {currentUser.learningProgress.map((item) => (
              <Grid item xs={12} md={4} key={item.language}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.language}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.progress || 0} 
                          sx={{ height: 10, borderRadius: 5 }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {`${Math.round(item.progress || 0)}%`}
                        </Typography>
                      </Box>
                    </Box>
                    {item.completedTopics && item.completedTopics.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Completed Topics:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {item.completedTopics.map((topic) => (
                            <Chip 
                              key={topic} 
                              label={topic} 
                              size="small" 
                              variant="outlined" 
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/language/${item.language.toLowerCase()}`}
                    >
                      Continue Learning
                    </Button>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/roadmap/${item.language.toLowerCase()}`}
                    >
                      View Roadmap
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {currentUser ? 'Explore More Languages' : 'Featured Languages'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {featuredLanguages.map((language) => (
            <Grid item xs={12} md={4} key={language.id}>
              <Card>
                <Box 
                  sx={{ 
                    height: 140, 
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h3" component="div">
                    {language.name}
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {language.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {language.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/language/${language.id}`}
                  >
                    Learn More
                  </Button>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/roadmap/${language.id}`}
                  >
                    View Roadmap
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 