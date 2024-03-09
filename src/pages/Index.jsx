import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, useToast, Heading, VStack, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toast = useToast();

  const apiUrl = "https://backengine-0lim.fly.dev";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      toast({
        title: "Login Successful",
        description: `Access Token: ${data.accessToken}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      toast({
        title: "Signup Successful",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoggingIn(true);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <VStack spacing={8} py={10}>
        <Heading>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
        <form onSubmit={isLoggingIn ? handleLogin : handleSignup}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={isLoggingIn ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" width="full" type="submit">
              {isLoggingIn ? "Login" : "Sign Up"}
            </Button>
          </Stack>
        </form>
        <Box>
          <Text>{isLoggingIn ? "Don't have an account?" : "Already have an account?"}</Text>
          <Button variant="link" onClick={() => setIsLoggingIn(!isLoggingIn)}>
            {isLoggingIn ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
