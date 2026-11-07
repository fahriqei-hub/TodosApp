import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { firebase } from '../config';

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection('todos');
  const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.trim().length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading.trim(),
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update Todo"
      />
      <TouchableOpacity
        style={styles.buttonUpdate}
        onPress={updateTodo}
      >
        <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#0de065',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Detail;