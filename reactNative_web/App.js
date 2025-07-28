import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {WebView} from 'react-native-webview';

export default function App() {
    return (
        <SafeAreaProvider style={styles.container}>

        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <WebView
                source={{uri: 'https://fluffychat.im/web/#/home'}}
                startInLoadingState
                style={{ backgroundColor: '#F2F2F2' }}
                renderLoading={() => (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large"/>
                        <Text>Идет загрузка</Text>
                    </View>
                )}
            />
        </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});
