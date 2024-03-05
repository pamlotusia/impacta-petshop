import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async (name, email, password, phone) => {
    try {
      // Call the API function for user creation
      const response = await fetch('http://127.0.0.1:5000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      // Assuming the API returns the user data or token
      setUser(data.user);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Error creating user:', error);
    }
  };

  const logout = async () => {
    try {
      // Call the API function for signing out
      await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        // Add headers or authentication tokens if needed
      });

      // Reset the user state
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      // Call the API function for user sign-in
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Assuming the API returns the user data or token
      setUser(data.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call the API function to check authentication status
        const response = await fetch('http://127.0.0.1:5000/check-auth', {
          // Add headers or authentication tokens if needed
        });

        const data = await response.json();

        // Assuming the API returns the user data or token
        setUser(data.user);
      } catch (error) {
        // Reset the user state if not authenticated
        setUser(null);
      }
    };

    // Check authentication status on component mount
    checkAuth();

    // Clean up function to unsubscribe from authentication status updates
    return () => {
      // Unsubscribe logic if needed
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
