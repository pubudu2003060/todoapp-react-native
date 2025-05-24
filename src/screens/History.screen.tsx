import React, { useEffect } from 'react'; // Removed createContext, useState
import { View, StyleSheet, ScrollView, StatusBar, BackHandler } from 'react-native'; // Removed TextInput, TouchableOpacity, Image
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import NoTasks from '../components/NoTasks.component';
import { useTasksStore } from '../store/Store'; // Removed useTaskStore

function History({ navigation }: any) {

    const { taskList } = useTasksStore(state => state);

    useEffect(() => {
        const onBackPress = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, [navigation]); // Added navigation to dependency array

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                backgroundColor="#1B1A17"
                barStyle="light-content"
                animated={true}
                showHideTransition="fade"
                hidden={false}
            />
            <View style={styles.mainContainer}>
                {taskList.length > 0 ? (
                    <ScrollView>
                        {taskList
                            .filter(item => item.completed)
                            .map(item => (
                                <ListItem key={item.id} item={item} />
                            ))}
                    </ScrollView>
                ) : (
                    <NoTasks />
                )}
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B1A17',
        minHeight: '100%',
        padding: 16,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#1B1A17',
    },
});

export default History;
