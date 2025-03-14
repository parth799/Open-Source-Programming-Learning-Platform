import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { useState } from 'react';

const languageData = {
  javascript: {
    name: 'JavaScript',
    description: 'JavaScript is a versatile programming language that powers the modern web. It enables interactive web pages and is an essential part of web applications.',
    features: [
      'Dynamic typing and automatic memory management',
      'First-class functions and closures',
      'Prototype-based object orientation',
      'Rich ecosystem of libraries and frameworks',
    ],
    useCases: [
      'Web Development',
      'Mobile App Development',
      'Server-side Development',
      'Game Development',
    ],
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic understanding of HTML and CSS'],
  },
  python: {
    name: 'Python',
    description: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It is widely used in various domains including web development, data science, and artificial intelligence.',
    features: [
      'Simple and readable syntax',
      'Large standard library',
      'Cross-platform compatibility',
      'Strong community support',
    ],
    useCases: [
      'Data Science and Machine Learning',
      'Web Development',
      'Automation and Scripting',
      'Scientific Computing',
    ],
    difficulty: 'Beginner Friendly',
    prerequisites: ['Basic computer knowledge'],
  },
  // Add more languages as needed
};

const LanguagePage = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const language = languageData[languageId];

  if (!language) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Language not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        {language.name}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {language.description}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Features" />
          <Tab label="Use Cases" />
          <Tab label="Getting Started" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Difficulty Level
                </Typography>
                <Typography variant="body1">
                  {language.difficulty}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Prerequisites
                </Typography>
                <ul>
                  {language.prerequisites.map((prereq, index) => (
                    <li key={index}>
                      <Typography variant="body1">{prereq}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Key Features
            </Typography>
            <ul>
              {language.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Common Use Cases
            </Typography>
            <ul>
              {language.useCases.map((useCase, index) => (
                <li key={index}>
                  <Typography variant="body1">{useCase}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Getting Started
          </Typography>
          <Typography variant="body1" paragraph>
            Ready to start learning {language.name}? Here's how you can begin:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/roadmap/${languageId}`)}
            sx={{ mr: 2 }}
          >
            View Learning Roadmap
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/resources/${languageId}`)}
          >
            Browse Resources
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ my: 2 }} />
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default LanguagePage; 