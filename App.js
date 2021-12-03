import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, TabBarIcon } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const [personas, setPersonas] = useState([
    { id: '1', nombre: 'Antonio Morlanes', edad: 46, género: 'Varón' },
    { id: '2', nombre: 'Margarita Fuentes', edad: 21, género: 'Mujer' },
    { id: '3', nombre: 'Manuel Machado', edad: 66, género: 'Varón' }
  ]);
  
  return (
    <View>
      <FlatList
        data={personas}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalles', item)}>
            <Text style={style.item}> {item.nombre} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Esta App permite conocer </Text>
      <Text>en más profundidad las pesonas.</Text>
    </View>
  );
}

function DetallesScreen({ navigation, route }) {
  return (
    <View>
      <Text style={style.item}>
        Nombre: {route.params.nombre}
      </Text>
      <Text style={style.item}>
        Edad: {route.params.edad}
      </Text>
      <Text style={style.item}>
       Género: {route.params.género}
      </Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Listado" component={HomeScreen} initialParams={{}} options={{
        title: 'Listado',
        headerTitleAlign:'center',
        headerStyle: {
          backgroundColor: "#FF9E27",           
        },        
        headerTintColor: '#fff',
      }} />
      <HomeStack.Screen name="Detalles" component={DetallesScreen} options={{
        title: 'Detalles',
        headerTitleAlign:'center',
        headerStyle:{
          backgroundColor:"#FF9E27"
        },
        headerTintColor:'#fff',
      }}/>
    </HomeStack.Navigator>
  );
}


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Listado" component={HomeStackScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="orange" size={28} />
          ),        
        }}
        />
        <Tab.Screen name="Información" component={InfoScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color="orange" size={28} />
          ),
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:"#FF9E27"
          },
          headerTintColor:'#fff',
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  texto: {
    marginTop: 180,
    textAlign: 'center',
    fontSize: 18
  },
  item:{
    marginTop:14,
    marginLeft:14, 
  },  
});