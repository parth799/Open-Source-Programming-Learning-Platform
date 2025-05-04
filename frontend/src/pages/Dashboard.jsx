import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
  Divider,
  Chip,
  CardMedia,
  Alert,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import { getProfile } from '../store/slices/userSlice';
import { getContentByLanguage } from '../store/slices/contentSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Get user and content from Redux store
  const { user } = useSelector((state) => state.auth);
  const { profile, learningProgress, isLoading: isUserLoading } = useSelector((state) => state.user);
  const { contents, isLoading: isContentLoading } = useSelector((state) => state.content);

  useEffect(() => {
    // Fetch user profile data
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    // If user has selected languages and profile is loaded
    if (profile && profile.learningProgress && profile.learningProgress.length > 0) {
      // Set default selected language to the first one
      const defaultLanguage = profile.learningProgress[0].language;
      setSelectedLanguage(defaultLanguage);
      
      // Fetch content for the selected language
      dispatch(getContentByLanguage(defaultLanguage));
    }
  }, [profile, dispatch]);

  // Handle language tab change
  const handleLanguageChange = (event, newValue) => {
    setTabValue(newValue);
    if (profile && profile.learningProgress && profile.learningProgress[newValue]) {
      const language = profile.learningProgress[newValue].language;
      setSelectedLanguage(language);
      dispatch(getContentByLanguage(language));
    }
  };

  // Get current progress for selected language
  const getCurrentProgress = () => {
    if (!selectedLanguage || !profile || !profile.learningProgress) return null;
    return profile.learningProgress.find(
      item => item.language.toLowerCase() === selectedLanguage.toLowerCase()
    );
  };

  const currentProgress = getCurrentProgress();

  // Loading state
  if (isUserLoading || isContentLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // Check if user has selected languages
  if (!profile || !profile.learningProgress || profile.learningProgress.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          You haven't selected any programming languages yet. Please update your profile to select languages.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/profile')}
        >
          Update Profile
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Learning Dashboard
      </Typography>
      
      {/* Language Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleLanguageChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {profile.learningProgress.map((lang, index) => (
            <Tab key={lang.language} label={lang.language} icon={<CodeIcon />} />
          ))}
        </Tabs>
      </Paper>

      {selectedLanguage && (
        <>
          {/* Progress Overview */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {selectedLanguage} Learning Progress
            </Typography>
            {currentProgress && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Overall Progress: {Math.round(currentProgress.progress || 0)}%
                    </Typography>
                    <Chip 
                      label={`${currentProgress.completedTopics?.length || 0} Topics Completed`}
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={currentProgress.progress || 0} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/roadmap/${selectedLanguage.toLowerCase()}`)}
                    startIcon={<SchoolIcon />}
                  >
                    View Learning Path
                  </Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/resources/${selectedLanguage.toLowerCase()}`)}
                    startIcon={<BookIcon />}
                  >
                    Browse Resources
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>

          {/* Recommended Courses */}
          <Typography variant="h5" gutterBottom>
            Recommended Courses
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {contents && contents.filter(content => content.type === 'tutorial').slice(0, 3).map((course) => (
              <Grid item xs={12} md={4} key={course._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/images/${selectedLanguage.toLowerCase()}_course.jpg`}
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = '/images/default_course.jpg';
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                    <Chip 
                      label={course.difficulty} 
                      color={
                        course.difficulty === 'beginner' ? 'success' :
                        course.difficulty === 'intermediate' ? 'warning' : 'error'
                      }
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.description?.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/content/${course._id}`)}>
                      Start Learning
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {(!contents || contents.filter(content => content.type === 'tutorial').length === 0) && (
              <Grid item xs={12}>
                <Alert severity="info">
                  No courses available for {selectedLanguage} yet. Check back soon!
                </Alert>
              </Grid>
            )}
          </Grid>

          {/* Recent Activity */}
          <Typography variant="h5" gutterBottom>
            Recent Activity
          </Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              {currentProgress && currentProgress.completedTopics && currentProgress.completedTopics.length > 0 ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Recently Completed Topics:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentProgress.completedTopics.slice(-5).map((topic, index) => (
                      <Chip key={index} label={topic} color="primary" />
                    ))}
                  </Box>
                </>
              ) : (
                <Typography>
                  You haven't completed any topics yet. Start learning to track your progress!
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Practice Exercises */}
          <Typography variant="h5" gutterBottom>
            Practice Exercises
          </Typography>
          <Grid container spacing={3}>
            {contents && contents.filter(content => content.type === 'practice').slice(0, 3).map((exercise) => (
              <Grid item xs={12} md={4} key={exercise._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {exercise.title}
                    </Typography>
                    <Chip 
                      label={exercise.difficulty} 
                      color={
                        exercise.difficulty === 'beginner' ? 'success' :
                        exercise.difficulty === 'intermediate' ? 'warning' : 'error'
                      }
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {exercise.description?.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/content/${exercise._id}`)}>
                      Start Practice
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {(!contents || contents.filter(content => content.type === 'practice').length === 0) && (
              <Grid item xs={12}>
                <Alert severity="info">
                  No practice exercises available for {selectedLanguage} yet. Check back soon!
                </Alert>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard; 