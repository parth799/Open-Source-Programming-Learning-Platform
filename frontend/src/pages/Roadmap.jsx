import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { useState } from 'react';

const roadmapData = {
  javascript: {
    name: 'JavaScript Learning Path',
    description: 'A comprehensive roadmap to master JavaScript programming',
    steps: [
      {
        title: 'JavaScript Basics',
        topics: [
          'Variables and Data Types',
          'Control Flow (if/else, loops)',
          'Functions and Scope',
          'Arrays and Objects',
          'DOM Manipulation',
        ],
        duration: '2-3 weeks',
        resources: [
          'MDN Web Docs - JavaScript Basics',
          'JavaScript.info - Modern JavaScript Tutorial',
          'Codecademy - JavaScript Course',
        ],
      },
      {
        title: 'Advanced JavaScript',
        topics: [
          'ES6+ Features',
          'Promises and Async/Await',
          'Error Handling',
          'Modules and Packages',
          'Testing with Jest',
        ],
        duration: '3-4 weeks',
        resources: [
          'Eloquent JavaScript',
          'JavaScript Design Patterns',
          'Testing JavaScript Applications',
        ],
      },
      {
        title: 'Frontend Development',
        topics: [
          'React.js Fundamentals',
          'State Management',
          'Routing',
          'API Integration',
          'Performance Optimization',
        ],
        duration: '4-5 weeks',
        resources: [
          'React Official Documentation',
          'Redux Toolkit Guide',
          'React Router Documentation',
        ],
      },
      {
        title: 'Backend Development',
        topics: [
          'Node.js Basics',
          'Express.js Framework',
          'RESTful APIs',
          'Database Integration',
          'Authentication & Authorization',
        ],
        duration: '4-5 weeks',
        resources: [
          'Node.js Documentation',
          'Express.js Guide',
          'MongoDB with Mongoose',
        ],
      },
    ],
  },
  python: {
    name: 'Python Learning Path',
    description: 'A structured path to become proficient in Python programming',
    steps: [
      {
        title: 'Python Fundamentals',
        topics: [
          'Variables and Data Types',
          'Control Structures',
          'Functions and Modules',
          'Object-Oriented Programming',
          'File Handling',
        ],
        duration: '2-3 weeks',
        resources: [
          'Python Official Documentation',
          'Real Python Tutorials',
          'Python for Beginners',
        ],
      },
      {
        title: 'Data Structures and Algorithms',
        topics: [
          'Lists, Sets, and Dictionaries',
          'Stacks and Queues',
          'Sorting and Searching',
          'Recursion',
          'Big O Notation',
        ],
        duration: '3-4 weeks',
        resources: [
          'Python Data Structures',
          'Algorithm Design Manual',
          'LeetCode Python Solutions',
        ],
      },
      {
        title: 'Web Development',
        topics: [
          'Django Framework',
          'Flask Framework',
          'REST APIs',
          'Database Design',
          'Authentication',
        ],
        duration: '4-5 weeks',
        resources: [
          'Django Documentation',
          'Flask Documentation',
          'Python Web Development',
        ],
      },
      {
        title: 'Data Science & Machine Learning',
        topics: [
          'NumPy and Pandas',
          'Data Visualization',
          'Machine Learning Basics',
          'Deep Learning',
          'Project Work',
        ],
        duration: '6-8 weeks',
        resources: [
          'Python for Data Science',
          'Scikit-learn Documentation',
          'TensorFlow Guide',
        ],
      },
    ],
  },
  // Add more languages as needed
};

const Roadmap = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const roadmap = roadmapData[languageId];

  if (!roadmap) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Roadmap not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </Container>
    );
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        {roadmap.name}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {roadmap.description}
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {roadmap.steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {roadmap.steps[activeStep].title}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Topics to Cover
                </Typography>
                <ul>
                  {roadmap.steps[activeStep].topics.map((topic, index) => (
                    <li key={index}>
                      <Typography variant="body1">{topic}</Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recommended Resources
                </Typography>
                <ul>
                  {roadmap.steps[activeStep].resources.map((resource, index) => (
                    <li key={index}>
                      <Typography variant="body1">{resource}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Estimated Duration: {roadmap.steps[activeStep].duration}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === roadmap.steps.length - 1}
        >
          Next
        </Button>
      </Box>

      <Button
        variant="outlined"
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default Roadmap; 