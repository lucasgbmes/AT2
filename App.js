import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setMilliseconds(prev => prev + 10);
      }, 10);
    }
  };

  const pause = () => {
    setRunning(false);
    clearInterval(timerRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(timerRef.current);
    setMilliseconds(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.time}>{formatTime(milliseconds)}</Text>
      <View style={styles.buttons}>
        <Button title="Iniciar" onPress={start} disabled={running} />
        <Button title="Pausar" onPress={pause} disabled={!running} />
        <Button title="Reiniciar" onPress={reset} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 40,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  }
});

export default App;

