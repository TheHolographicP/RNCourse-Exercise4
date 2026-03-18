import { StyleSheet, View, Text } from 'react-native';

import Colors from 'constants/colors';



export default function App() { 
  return (
    <View style={styles.rootScreen}>
      <Text>
        App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  },
  screensContainer: {
    flex:1,
    backgroundColor: '#24180f',
  },
});
