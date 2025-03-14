import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Tabs,
  Tab,
  Link,
  Chip,
} from '@mui/material';
import { useState } from 'react';

const resourcesData = {
  javascript: {
    name: 'JavaScript Resources',
    description: 'A curated collection of resources to help you learn JavaScript programming',
    categories: {
      documentation: [
        {
          title: 'MDN Web Docs',
          description: 'Comprehensive documentation for JavaScript and web technologies',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          type: 'Documentation',
          difficulty: 'Beginner to Advanced',
        },
        {
          title: 'JavaScript.info',
          description: 'Modern JavaScript tutorial with detailed explanations',
          url: 'https://javascript.info/',
          type: 'Documentation',
          difficulty: 'Beginner to Advanced',
        },
      ],
      tutorials: [
        {
          title: 'Codecademy JavaScript Course',
          description: 'Interactive learning platform with hands-on exercises',
          url: 'https://www.codecademy.com/learn/introduction-to-javascript',
          type: 'Tutorial',
          difficulty: 'Beginner',
        },
        {
          title: 'Eloquent JavaScript',
          description: 'A modern introduction to programming with JavaScript',
          url: 'https://eloquentjavascript.net/',
          type: 'Tutorial',
          difficulty: 'Intermediate',
        },
      ],
      videos: [
        {
          title: 'JavaScript Fundamentals',
          description: 'Comprehensive video course covering JavaScript basics',
          url: 'https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXlk5L9oQ5G_6nNq',
          type: 'Video',
          difficulty: 'Beginner',
        },
        {
          title: 'Advanced JavaScript Concepts',
          description: 'Deep dive into advanced JavaScript topics',
          url: 'https://www.youtube.com/playlist?list=PL0zVEGEvSaeG2T5n8FuPGbCJqBQJ1pD7W',
          type: 'Video',
          difficulty: 'Advanced',
        },
      ],
      practice: [
        {
          title: 'LeetCode JavaScript Problems',
          description: 'Practice JavaScript coding problems',
          url: 'https://leetcode.com/tag/javascript/',
          type: 'Practice',
          difficulty: 'Intermediate to Advanced',
        },
        {
          title: 'CodeWars',
          description: 'Interactive coding challenges in JavaScript',
          url: 'https://www.codewars.com/kata/search/javascript',
          type: 'Practice',
          difficulty: 'Beginner to Advanced',
        },
      ],
    },
  },
  python: {
    name: 'Python Resources',
    description: 'A curated collection of resources to help you learn Python programming',
    categories: {
      documentation: [
        {
          title: 'Python Official Documentation',
          description: 'Comprehensive documentation for Python programming language',
          url: 'https://docs.python.org/3/',
          type: 'Documentation',
          difficulty: 'Beginner to Advanced',
        },
        {
          title: 'Real Python',
          description: 'Python tutorials and articles for all skill levels',
          url: 'https://realpython.com/',
          type: 'Documentation',
          difficulty: 'Beginner to Advanced',
        },
      ],
      tutorials: [
        {
          title: 'Python for Beginners',
          description: 'Step-by-step guide to learning Python',
          url: 'https://www.python.org/about/gettingstarted/',
          type: 'Tutorial',
          difficulty: 'Beginner',
        },
        {
          title: 'Python Tutorial',
          description: 'Comprehensive Python tutorial with examples',
          url: 'https://www.w3schools.com/python/',
          type: 'Tutorial',
          difficulty: 'Beginner to Intermediate',
        },
      ],
      videos: [
        {
          title: 'Python Programming for Beginners',
          description: 'Complete Python course for beginners',
          url: 'https://www.youtube.com/playlist?list=PL0zVEGEvSaeG2T5n8FuPGbCJqBQJ1pD7W',
          type: 'Video',
          difficulty: 'Beginner',
        },
        {
          title: 'Advanced Python Programming',
          description: 'Advanced Python concepts and best practices',
          url: 'https://www.youtube.com/playlist?list=PL0zVEGEvSaeG2T5n8FuPGbCJqBQJ1pD7W',
          type: 'Video',
          difficulty: 'Advanced',
        },
      ],
      practice: [
        {
          title: 'HackerRank Python',
          description: 'Practice Python coding problems',
          url: 'https://www.hackerrank.com/domains/python',
          type: 'Practice',
          difficulty: 'Beginner to Advanced',
        },
        {
          title: 'Project Euler',
          description: 'Mathematical programming problems in Python',
          url: 'https://projecteuler.net/',
          type: 'Practice',
          difficulty: 'Intermediate to Advanced',
        },
      ],
    },
  },
  // Add more languages as needed
};

const Resources = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const resources = resourcesData[languageId];

  if (!resources) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Resources not found
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

  const categories = Object.keys(resources.categories);
  const currentCategory = categories[activeTab];

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        {resources.name}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {resources.description}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {categories.map((category) => (
            <Tab
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {resources.categories[currentCategory].map((resource, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={resource.type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={resource.difficulty}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Resource
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
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

export default Resources; 