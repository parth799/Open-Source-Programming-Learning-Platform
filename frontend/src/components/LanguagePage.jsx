import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Tabs, 
  Tab, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Code as CodeIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LanguagePage = () => {
  const { languageId } = useParams();
  const { currentUser, updateProgress } = useAuth();
  const [language, setLanguage] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        setLoading(true);
        
        // Capitalize first letter for display
        const formattedName = languageId.charAt(0).toUpperCase() + languageId.slice(1);
        setLanguage({
          id: languageId,
          name: formattedName,
          description: `${formattedName} is a popular programming language used for various applications.`,
          image: `/images/languages/${languageId}.png`
        });
        
        // Fetch content for this language
        const response = await axios.get(`/api/content/language/${languageId}`);
        setContent(response.data || []);
        
        // Get user progress for this language
        if (currentUser && currentUser.learningProgress) {
          const progress = currentUser.learningProgress.find(
            item => item.language.toLowerCase() === languageId.toLowerCase()
          );
          setUserProgress(progress);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching language data:', err);
        setError('Failed to load language data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchLanguageData();
  }, [languageId, currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMarkComplete = async (topicId) => {
    if (!currentUser) return;
    
    try {
      // Find current progress
      const progress = {...userProgress};
      
      // Add topic to completed topics if not already there
      if (!progress.completedTopics.includes(topicId)) {
        progress.completedTopics.push(topicId);
      }
      
      // Calculate new progress percentage
      // This is simplified - in a real app you'd have a more sophisticated calculation
      const totalTopics = content.length;
      const completedCount = progress.completedTopics.length;
      const newProgressValue = Math.round((completedCount / totalTopics) * 100);
      
      progress.progress = newProgressValue;
      
      // Update in backend
      await updateProgress(language.name, newProgressValue, progress.completedTopics);
      
      // Update local state
      setUserProgress(progress);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  // Filter content based on selected tab
  const filteredContent = content.filter(item => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return item.type === 'documentation';
    if (tabValue === 2) return item.type === 'tutorial';
    if (tabValue === 3) return item.type === 'practice';
    return false;
  });

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
            <Typography variant="h4" component="h1" gutterBottom>
              {language.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {language.description}
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
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to={`/roadmap/${languageId}`}
                startIcon={<SchoolIcon />}
              >
                Learning Path
              </Button>
              <Button 
                variant="outlined" 
                component={Link} 
                to={`/resources/${languageId}`}
                startIcon={<BookIcon />}
              >
                Resources
              </Button>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              sx={{ mb: 2 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All" />
              <Tab label="Documentation" />
              <Tab label="Tutorials" />
              <Tab label="Practice" />
            </Tabs>
            
            {filteredContent.length > 0 ? (
              <Grid container spacing={3}>
                {filteredContent.map((item) => (
                  <Grid item xs={12} key={item._id || item.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" component="div">
                              {item.title}
                              {userProgress?.completedTopics?.includes(item._id || item.id) && (
                                <CheckCircleIcon color="success" sx={{ ml: 1, verticalAlign: 'middle' }} />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {item.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip 
                                label={item.type || 'Content'} 
                                size="small" 
                                color="primary" 
                                variant="outlined" 
                              />
                              <Chip 
                                label={item.difficulty || 'Beginner'} 
                                size="small" 
                                variant="outlined" 
                              />
                            </Box>
                          </Box>
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => handleMarkComplete(item._id || item.id)}
                            disabled={userProgress?.completedTopics?.includes(item._id || item.id)}
                          >
                            {userProgress?.completedTopics?.includes(item._id || item.id) 
                              ? 'Completed' 
                              : 'Mark Complete'}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No content available in this category yet.
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default LanguagePage; 