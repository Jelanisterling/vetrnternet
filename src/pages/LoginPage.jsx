import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  VStack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const validUser = {
    email: 'admin@vetclinic.com',
    password: 'secure123',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === validUser.email && password === validUser.password) {
      onLogin();
      toast({
        title: 'Login successful',
        description: `Welcome, ${email}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Flex
      height="100vh"
      width="100%"
      backgroundImage="url('/images/login-bg.jpg')" 
      backgroundSize="cover"
      backgroundPosition="center"
      justify="center"
      align="center"
    >
      <Box
        maxW="sm"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="whiteAlpha.900" 
      >
        <Heading mb={6} textAlign="center" size="lg">
          Vet Clinic Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!error}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vetclinic.com"
                required
              />
            </FormControl>

            <FormControl isInvalid={!!error}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="secure123"
                required
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" width="full" type="submit">
              Login
            </Button>
          </VStack>
        </form>

        <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
          Hint: admin@vetclinic.com / secure123
        </Text>
      </Box>
    </Flex>
  );
}
