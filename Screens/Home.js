import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../config';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('Todos');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  // Membaca data dari Firestore secara real-time
  useEffect(() => {
    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const todosData = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        todosData.push({
          id: doc.id,
          heading,
        });
      });
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  // Menghapus data todo dari Firestore
  const deleteTodo = (item) => {
    todoRef
      .doc(item.id)
      .delete()
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil dihapus');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  // Menambahkan todo baru ke Firestore
  const addTodo = () => {
    if (addData && addData.trim().length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData.trim(),
        createdAt: timestamp,
      };

      todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}>Todos App</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAddData(text)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>{item.heading}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeadingContainer: {
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 30,
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  todoIcon: {
    fontSize: 20,
    marginLeft: 14,
  },
});

export default Home;