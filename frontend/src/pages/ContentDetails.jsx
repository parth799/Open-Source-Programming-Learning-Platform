import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { getContentById } from '../store/slices/contentSlice';
import { updateProgress } from '../store/slices/userSlice';

const ContentDetails = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const { selectedContent, isLoading: isContentLoading } = useSelector((state) => state.content);
  const { profile, isLoading: isUserLoading } = useSelector((state) => state.user);
  
  useEffect(() => {
    // Fetch content details
    dispatch(getContentById(contentId));
  }, [contentId, dispatch]);
  
  useEffect(() => {
    // Check if content is already completed by user
    if (selectedContent && profile && profile.learningProgress) {
      const languageProgress = profile.learningProgress.find(
        item => item.language.toLowerCase() === selectedContent.language.toLowerCase()
      );
      
      if (languageProgress && languageProgress.completedTopics) {
        const isCompleted = languageProgress.completedTopics.some(
          topic => selectedContent.topics && selectedContent.topics.includes(topic)
        );
        setCompleted(isCompleted);
      }
    }
  }, [selectedContent, profile]);
  
  const handleProgressUpdate = () => {
    // Set progress to 100% and mark as completed
    setProgress(100);
    setCompleted(true);
    
    if (selectedContent && selectedContent.topics && selectedContent.topics.length > 0) {
      // Choose the first topic as the completed one for simplicity
      const completedTopic = selectedContent.topics[0];
      
      // Calculate new progress for the language
      let newProgress = 0;
      if (profile && profile.learningProgress) {
        const languageProgress = profile.learningProgress.find(
          item => item.language.toLowerCase() === selectedContent.language.toLowerCase()
        );
        
        if (languageProgress) {
          // If language already exists, increment its progress by 5%
          newProgress = Math.min(languageProgress.progress + 5, 100);
        } else {
          // If new language, set initial progress to 5%
          newProgress = 5;
        }
      }
      
      // Update user progress
      dispatch(updateProgress({
        language: selectedContent.language,
        progress: newProgress,
        completedTopic
      }));
    }
  };
  
  if (isContentLoading || isUserLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!selectedContent) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Content not found. The requested resource may have been removed or is unavailable.
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" component="h1">
            {selectedContent.title}
          </Typography>
          <Chip
            label={selectedContent.difficulty}
            color={
              selectedContent.difficulty === 'beginner' ? 'success' :
              selectedContent.difficulty === 'intermediate' ? 'warning' : 'error'
            }
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Chip
            icon={<CodeIcon />}
            label={selectedContent.language}
            variant="outlined"
          />
          {selectedContent.estimatedTime && (
            <Chip
              icon={<AccessTimeIcon />}
              label={selectedContent.estimatedTime}
              variant="outlined"
            />
          )}
        </Box>
        
        <Typography variant="body1" paragraph>
          {selectedContent.description}
        </Typography>
        
        {selectedContent.topics && selectedContent.topics.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Topics Covered
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedContent.topics.map((topic, index) => (
                <Chip key={index} label={topic} variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {selectedContent.type === 'tutorial' ? 'Tutorial Content' : 'Practice Exercise'}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {/* This would be the actual content - for demo purposes we'll use placeholder */}
            <Typography variant="body1" paragraph>
              This is where the {selectedContent.type === 'tutorial' ? 'tutorial content' : 'practice exercise'} 
              would be displayed. In a real application, this would contain detailed learning materials,
              code examples, and interactive elements.
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sample Code
              </Typography>
              <Box
                component="pre"
                sx={{
                  bgcolor: 'background.paper',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                {selectedContent.language === 'javascript' && `// JavaScript example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
                
                {selectedContent.language === 'python' && `# Python example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`}
                
                {selectedContent.language === 'java' && `// Java example
public class Greeting {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }
}`}
                
                {selectedContent.language === 'cpp' && `// C++ example
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}`}

                {!['javascript', 'python', 'java', 'cpp'].includes(selectedContent.language) && 
                  `// Example code would go here`}
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Progress
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {completed ? 'Completed' : 'In Progress'}
                  </Typography>
                  <Typography variant="body2">
                    {progress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ height: 8, borderRadius: 4 }}
                  color={completed ? 'success' : 'primary'}
                />
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                color={completed ? 'success' : 'primary'}
                onClick={handleProgressUpdate}
                startIcon={completed ? <CheckCircleIcon /> : <SchoolIcon />}
                disabled={completed}
              >
                {completed ? 'Completed' : 'Mark as Completed'}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Related Content
              </Typography>
              <List>
                <ListItem button onClick={() => navigate(`/roadmap/${selectedContent.language.toLowerCase()}`)}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${selectedContent.language} Learning Path`}
                    secondary="Follow the complete roadmap"
                  />
                </ListItem>
                <ListItem button onClick={() => navigate(`/resources/${selectedContent.language.toLowerCase()}`)}>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${selectedContent.language} Resources`}
                    secondary="Explore more learning materials"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentDetails; 