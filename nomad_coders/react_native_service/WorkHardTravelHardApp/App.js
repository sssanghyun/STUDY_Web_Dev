import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  Text, TouchableOpacity, View, TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from './colors';
import AsnyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);
  const travel = async () => {
    setWorking(false);
    await AsnyncStorage.setItem("@work", "false");
  }
  const work = async () => {
    setWorking(true);
    await AsnyncStorage.setItem("@work", "true");
  }
  const onChangeText = (payload) => setText(payload);
  const onChangeEditText = (payload) => setEditText(payload);
  const saveToDo = async (toSave) => {
    try {
      await AsnyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
      //saving error
    }
  };
  const loadToDos = async () => {
    setWorking(JSON.parse(await AsnyncStorage.getItem("@work")));
    const s = await AsnyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  }
  const addToDo = async () => {
    if (text === "") {
      return
    }
    // ES6
    const newToDos = { ...toDos, [Date.now()]: { text, working: working, finish: false, edit: false } };
    setToDos(newToDos);
    await saveToDo(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDo(newToDos);
        }
      }
    ]);
  }
  const editToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].edit = !newToDos[key].edit;
    setToDos(newToDos);
    await saveToDo(newToDos);
    setEditText(newToDos[key].text);
  }
  const editToDoDone = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].edit = false;
    newToDos[key].text = editText;
    setToDos(newToDos);
    await saveToDo(newToDos);
  }
  const finishToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].finish = !newToDos[key].finish;
    setToDos(newToDos);
    await saveToDo(newToDos);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.gery }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.gery }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType='done'
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        value={text}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              {toDos[key].edit ?
                <TextInput
                  onSubmitEditing={() => editToDoDone(key)}
                  onChangeText={onChangeEditText}
                  returnKeyType='done'
                  style={styles.input}
                  value={editText}
                /> :
                <Text style={toDos[key].finish ? styles.toDoTextFinish : styles.toDoText}>{toDos[key].text}</Text>
              }

              <View style={styles.iconView}>
                <TouchableOpacity style={styles.icon} onPress={() => finishToDo(key)}>
                  <AntDesign name="checkcircleo" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => editToDo(key)}>
                  <AntDesign name="edit" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>) : null
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 35,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingLeft: 40,
    paddingRight: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  toDoTextFinish: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: 'line-through'
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",

  },
  icon: {
    paddingHorizontal: 5
  }
});
