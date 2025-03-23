import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Roadmap = () => {
  const { languageId } = useParams();
  const { currentUser } = useAuth();
  const [roadmap, setRoadmap] = useState([]);
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        
        // Capitalize first letter for display
        const formattedName = languageId.charAt(0).toUpperCase() + languageId.slice(1);
        setLanguage({
          id: languageId,
          name: formattedName
        });
        
        // In a real app, fetch roadmap data from API
        // For now, use mock data
        setRoadmap([
          {
            id: 1,
            title: 'Getting Started',
            description: 'Learn the basics and set up your development environment.',
            topics: [
              'Introduction to programming',
              'Setting up your development environment',
              'Hello World program',
              'Basic syntax and data types'
            ]
          },
          {
            id: 2,
            title: 'Core Concepts',
            description: 'Master the fundamental concepts of the language.',
            topics: [
              'Variables and constants',
              'Operators and expressions',
              'Control flow (if/else, loops)',
              'Functions and methods'
            ]
          },
          {
            id: 3,
            title: 'Data Structures',
            description: 'Learn how to organize and manipulate data efficiently.',
            topics: [
              'Arrays and lists',
              'Objects and dictionaries',
              'Sets and maps',
              'Working with complex data structures'
            ]
          },
          {
            id: 4,
            title: 'Advanced Topics',
            description: 'Dive deeper into more complex language features.',
            topics: [
              'Object-oriented programming',
              'Error handling',
              'Asynchronous programming',
              'Modules and packages'
            ]
          },
          {
            id: 5,
            title: 'Projects and Practice',
            description: 'Apply your knowledge by building real projects.',
            topics: [
              'Small practice exercises',
              'Building a command-line application',
              'Creating a web application',
              'Contributing to open source'
            ]
          }
        ]);
        
        // Get user progress for this language
        if (currentUser && currentUser.learningProgress) {
          const progress = currentUser.learningProgress.find(
            item => item.language.toLowerCase() === languageId.toLowerCase()
          );
          setUserProgress(progress);
          
          // Set active step based on progress
          if (progress && progress.progress) {
            const step = Math.floor((progress.progress / 100) * 5);
            setActiveStep(Math.min(step, 4)); // 0-4 for 5 steps
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        setError('Failed to load roadmap data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchRoadmapData();
  }, [languageId, currentUser]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {language && (
        <>
          <Box sx={{ mb: 4 }}>
            <Button 
              component={Link} 
              to={`/language/${languageId}`}
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2 }}
            >
              Back to {language.name}
            </Button>
            
            <Typography variant="h4" component="h1" gutterBottom>
              {language.name} Learning Path
            </Typography>
            
            <Typography variant="body1" paragraph>
              Follow this roadmap to master {language.name} programming from beginner to advanced level.
            </Typography>
            
            {userProgress && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Your Progress: {userProgress.progress || 0}%
                </Typography>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 10, 
                    backgroundColor: 'grey.300',
                    borderRadius: 5,
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: `${userProgress.progress || 0}%`, 
                      height: '100%', 
                      backgroundColor: 'primary.main',
                      borderRadius: 5
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Stepper activeStep={activeStep} orientation="vertical">
            {roadmap.map((step, index) => (
              <Step key={step.id}>
                <StepLabel>
                  <Typography variant="h6">{step.title}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" paragraph>
                    {step.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Key Topics:
                    </Typography>
                    <List dense>
                      {step.topics.map((topic, i) => (
                        <ListItem key={i}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            {index < activeStep ? (
                              <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                              <RadioButtonUncheckedIcon fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={topic} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/language/${languageId}`}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index <= activeStep ? 'Continue Learning' : 'Start Learning'}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === roadmap.length && (
            <Paper square elevation={0} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Congratulations! You've completed the {language.name} learning path.
              </Typography>
              <Typography paragraph>
                Continue practicing and building projects to strengthen your skills.
              </Typography>
              <Button 
                variant="contained" 
                component={Link} 
                to={`/language/${languageId}`}
              >
                Explore More Content
              </Button>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default Roadmap; 