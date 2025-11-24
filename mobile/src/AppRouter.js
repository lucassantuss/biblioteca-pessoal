import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import BookListScreen from "./screens/BookListScreen";
import AddBookScreen from "./screens/AddBookScreen";
import EditBookScreen from "./screens/EditBookScreen";
import TopBooksScreen from "./screens/TopBooksScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Entrar" }}/>
        <Stack.Screen name="BookList" component={BookListScreen} options={{ title: "Meus Livros" }}/>
        <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: "Adicionar Livro" }}/>
        <Stack.Screen name="EditBook" component={EditBookScreen} options={{ title: "Editar Livro" }}/>
        <Stack.Screen name="TopBooks" component={TopBooksScreen} options={{ title: "Livros Mais Lidos" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Criar Conta" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
