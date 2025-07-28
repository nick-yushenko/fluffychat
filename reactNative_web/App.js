import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {WebView} from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

    useEffect(() => {
        // Запрашиваем разрешение на уведомления
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                console.log('Разрешение на уведомления получено');
            }
        };

        requestPermissions();
    }, []);

    // Отправляем уведомление через 1 секунду после загрузки WebView
    useEffect(() => {
        if (isWebViewLoaded) {
            const timer = setTimeout(async () => {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Я родилась!",
                        body: "Я Лиза и скоро буду умной!!",
                    },
                    trigger: null, // Отправляем немедленно
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isWebViewLoaded]);

    const handleWebViewLoad = () => {
        setIsWebViewLoaded(true);
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" />
                <WebView
                    source={{uri: 'https://fluffy-liza.netlify.app'}}
                    startInLoadingState
                    style={{ backgroundColor: '#F2F2F2' }}
                    onLoad={handleWebViewLoad}
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
