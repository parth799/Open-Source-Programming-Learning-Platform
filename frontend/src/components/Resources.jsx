import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button, 
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Code as CodeIcon,
  Assignment as AssignmentIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Resources = () => {
  const { languageId } = useParams();
  const { currentUser } = useAuth();
  const [language, setLanguage] = useState(null);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        setLoading(true);
        
        // Capitalize first letter for display
        const formattedName = languageId.charAt(0).toUpperCase() + languageId.slice(1);
        setLanguage({
          id: languageId,
          name: formattedName
        });
        
        // In a real app, fetch resources from API
        // For now, use mock data
        const mockResources = [
          {
            id: 1,
            title: 'Official Documentation',
            description: 'The official documentation for the language.',
            type: 'documentation',
            url: '#',
            difficulty: 'all-levels'
          },
          {
            id: 2,
            title: 'Beginner Tutorial',
            description: 'A comprehensive tutorial for beginners.',
            type: 'tutorial',
            url: '#',
            difficulty: 'beginner'
          },
          {
            id: 3,
            title: 'Video Course: Complete Guide',
            description: 'A video course covering all aspects of the language.',
            type: 'video',
            url: '#',
            difficulty: 'beginner'
          },
          {
            id: 4,
            title: 'Interactive Coding Exercises',
            description: 'Practice your skills with interactive exercises.',
            type: 'practice',
            url: '#',
            difficulty: 'intermediate'
          },
          {
            id: 5,
            title: 'Advanced Techniques',
            description: 'Learn advanced programming techniques.',
            type: 'tutorial',
            url: '#',
            difficulty: 'advanced'
          },
          {
            id: 6,
            title: 'Community Forum',
            description: 'Join the community to ask questions and share knowledge.',
            type: 'community',
            url: '#',
            difficulty: 'all-levels'
          },
          {
            id: 7,
            title: 'Project Ideas',
            description: 'A collection of project ideas to practice your skills.',
            type: 'practice',
            url: '#',
            difficulty: 'intermediate'
          },
          {
            id: 8,
            title: 'Best Practices Guide',
            description: 'Learn the best practices for writing clean code.',
            type: 'documentation',
            url: '#',
            difficulty: 'intermediate'
          }
        ];
        
        setResources(mockResources);
        setFilteredResources(mockResources);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching resources data:', err);
        setError('Failed to load resources data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchResourcesData();
  }, [languageId]);

  useEffect(() => {
    // Filter resources based on tab and search query
    let filtered = [...resources];
    
    // Filter by type based on tab
    if (tabValue === 1) {
      filtered = filtered.filter(resource => resource.type === 'documentation');
    } else if (tabValue === 2) {
      filtered = filtered.filter(resource => resource.type === 'tutorial');
    } else if (tabValue === 3) {
      filtered = filtered.filter(resource => resource.type === 'video');
    } else if (tabValue === 4) {
      filtered = filtered.filter(resource => resource.type === 'practice');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        resource => 
          resource.title.toLowerCase().includes(query) || 
          resource.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredResources(filtered);
  }, [tabValue, searchQuery, resources]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getIconForResourceType = (type) => {
    switch (type) {
      case 'documentation':
        return <BookIcon />;
      case 'tutorial':
        return <CodeIcon />;
      case 'video':
        return <VideoIcon />;
      case 'practice':
        return <AssignmentIcon />;
      default:
        return <LinkIcon />;
    }
  };

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
              {language.name} Resources
            </Typography>
            
            <Typography variant="body1" paragraph>
              Explore a curated collection of resources to help you learn {language.name}.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3 }}
            >
              <Tab label="All" />
              <Tab label="Documentation" />
              <Tab label="Tutorials" />
              <Tab label="Videos" />
              <Tab label="Practice" />
            </Tabs>
            
            <Divider sx={{ mb: 3 }} />
            
            {filteredResources.length > 0 ? (
              <Grid container spacing={3}>
                {filteredResources.map((resource) => (
                  <Grid item xs={12} md={6} key={resource.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ mr: 2 }}>
                            {getIconForResourceType(resource.type)}
                          </Box>
                          <Box>
                            <Typography variant="h6" component="div">
                              {resource.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {resource.description}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip 
                            label={resource.type} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                          <Chip 
                            label={resource.difficulty} 
                            size="small" 
                            variant="outlined" 
                          />
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resource
                        </Button>
                        <Button 
                          size="small"
                          onClick={() => {
                            // In a real app, save to user's bookmarks
                            console.log('Resource bookmarked:', resource.id);
                          }}
                        >
                          Bookmark
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No resources found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filters.
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Resources; 