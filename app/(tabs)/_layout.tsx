import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F15A24",
        headerShown: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      }}>
      <Tabs.Screen
        name="login"
        options={{
          tabBarLabel: "Ingresar",
          title: 'Ingresar',
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name='login' size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          tabBarLabel: "Registrarse",
          title: "Registrarse",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="adduser" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
