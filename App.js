import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAi8kPcmU8cI8h6zxMrvJtbBjTa11sxdVo",
  authDomain: "mylibrary2k26.firebaseapp.com",
  projectId: "mylibrary2k26",
  storageBucket: "mylibrary2k26.firebasestorage.app",
  messagingSenderId: "210341086639",
  appId: "1:210341086639:web:4a8fcf26b03434e33ddb5a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [page, setPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    if (!email || !password) { setErrorMsg('Email आणि Password दोन्ही टाका'); return; }
    setErrorMsg('');
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => { setLoading(false); setPage('home'); })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => { setLoading(false); setPage('home'); })
            .catch((err2) => { setLoading(false); setErrorMsg(err2.message); });
        } else {
          setLoading(false); setErrorMsg(err.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {page === 'login' && (
        <View style={styles.center}>
          <Text style={styles.title}>माझं ग्रंथालय</Text>
          <Text style={styles.subtitle}>तुमचं वैयक्तिक पुस्तक कपाट</Text>
          <TextInput
            style={styles.input}
            placeholder="Email टाका"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password टाका"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>आत जा</Text>}
          </TouchableOpacity>
        </View>
      )}

      {page === 'home' && (
        <View style={styles.center}>
          <Text style={styles.title}>Homepage 🎉</Text>
          <Text style={styles.subtitle}>Login यशस्वी झालं!</Text>
          <TouchableOpacity style={styles.button} onPress={() => { auth.signOut(); setPage('login'); }}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#efe3c8' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#3a2f22', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#6b5c46', marginBottom: 24 },
  input: {
    width: '100%', backgroundColor: '#f7efdc', padding: 14, borderRadius: 12,
    marginBottom: 14, borderWidth: 1, borderColor: '#c9b489', textAlign: 'center',
  },
  error: { color: '#bd6448', marginBottom: 10, fontSize: 12.5 },
  button: { backgroundColor: '#7c9473', paddingVertical: 13, paddingHorizontal: 40, borderRadius: 16 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

