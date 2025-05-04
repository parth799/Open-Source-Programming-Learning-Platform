import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// Sample data for when API is not available
const sampleContent = {
  javascript: [
    {
      _id: 'js-tutorial-1',
      type: 'tutorial',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript including variables, data types, functions, and control flow.',
      difficulty: 'beginner',
      language: 'javascript',
      topics: ['variables', 'data types', 'functions', 'control flow'],
      estimatedTime: '3 hours',
    },
    {
      _id: 'js-tutorial-2',
      type: 'tutorial',
      title: 'DOM Manipulation',
      description: 'Learn how to interact with the Document Object Model to create dynamic web pages.',
      difficulty: 'intermediate',
      language: 'javascript',
      topics: ['DOM', 'events', 'selectors', 'event listeners'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'js-practice-1',
      type: 'practice',
      title: 'JavaScript Coding Challenges',
      description: 'Test your JavaScript skills with these coding challenges covering fundamental concepts.',
      difficulty: 'beginner',
      language: 'javascript',
      topics: ['problem solving', 'algorithms', 'logic'],
      estimatedTime: '2 hours',
    },
  ],
  python: [
    {
      _id: 'py-tutorial-1',
      type: 'tutorial',
      title: 'Python Basics',
      description: 'Introduction to Python programming language, covering basic syntax, variables, and data structures.',
      difficulty: 'beginner',
      language: 'python',
      topics: ['syntax', 'variables', 'data structures'],
      estimatedTime: '3 hours',
    },
    {
      _id: 'py-tutorial-2',
      type: 'tutorial',
      title: 'Python Functions & OOP',
      description: 'Learn about functions, classes, and object-oriented programming in Python.',
      difficulty: 'intermediate',
      language: 'python',
      topics: ['functions', 'classes', 'inheritance', 'OOP'],
      estimatedTime: '5 hours',
    },
    {
      _id: 'py-practice-1',
      type: 'practice',
      title: 'Python Coding Exercises',
      description: 'Practice Python with exercises covering fundamental programming concepts.',
      difficulty: 'beginner',
      language: 'python',
      topics: ['algorithms', 'data structures', 'problem solving'],
      estimatedTime: '3 hours',
    },
  ],
  java: [
    {
      _id: 'java-tutorial-1',
      type: 'tutorial',
      title: 'Java Fundamentals',
      description: 'Introduction to Java programming, covering syntax, variables, and control structures.',
      difficulty: 'beginner',
      language: 'java',
      topics: ['syntax', 'variables', 'control flow'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'java-tutorial-2',
      type: 'tutorial',
      title: 'Java Object-Oriented Programming',
      description: 'Learn about classes, objects, inheritance, and polymorphism in Java.',
      difficulty: 'intermediate',
      language: 'java',
      topics: ['classes', 'objects', 'inheritance', 'polymorphism'],
      estimatedTime: '6 hours',
    },
    {
      _id: 'java-practice-1',
      type: 'practice',
      title: 'Java Programming Exercises',
      description: 'Practice Java with exercises covering object-oriented programming concepts.',
      difficulty: 'intermediate',
      language: 'java',
      topics: ['OOP', 'algorithms', 'data structures'],
      estimatedTime: '4 hours',
    },
  ],
  cpp: [
    {
      _id: 'cpp-tutorial-1',
      type: 'tutorial',
      title: 'C++ Basics',
      description: 'Introduction to C++ programming, covering syntax, variables, and data types.',
      difficulty: 'beginner',
      language: 'cpp',
      topics: ['syntax', 'variables', 'data types'],
      estimatedTime: '4 hours',
    },
    {
      _id: 'cpp-tutorial-2',
      type: 'tutorial',
      title: 'C++ Object-Oriented Programming',
      description: 'Learn about classes, objects, inheritance, and polymorphism in C++.',
      difficulty: 'intermediate',
      language: 'cpp',
      topics: ['classes', 'objects', 'inheritance', 'polymorphism'],
      estimatedTime: '5 hours',
    },
    {
      _id: 'cpp-practice-1',
      type: 'practice',
      title: 'C++ Coding Challenges',
      description: 'Test your C++ skills with these programming challenges.',
      difficulty: 'advanced',
      language: 'cpp',
      topics: ['memory management', 'algorithms', 'optimization'],
      estimatedTime: '6 hours',
    },
  ],
};

export const useContentLoader = (language) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!language) {
        setContent([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const response = await axios.get(`/api/content/language/${language.toLowerCase()}`);
        
        if (response.data && response.data.length > 0) {
          setContent(response.data);
        } else {
          // If no data from API, use sample data
          setContent(sampleContent[language.toLowerCase()] || []);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading content:', err);
        // Fallback to sample data on error
        setContent(sampleContent[language.toLowerCase()] || []);
        setError('Could not load content from server. Using sample data instead.');
        setIsLoading(false);
      }
    };

    loadContent();
  }, [language]);

  return { content, isLoading, error };
};

export default useContentLoader; 