import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, FlatList, } from "react-native";
import { Text, TextInput, Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConsultaIp() {
    const [inputValue, setInputValue] = useState('')
    const [consultaIp, setConsultaIp] = useState('')
    const [resultados, setResultados] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //Agregar aqui funcion a cargar datos
        cargarDataIP()
    }, [resultados])

    //Función de consulta a la API
    const fetchConsulta = async () => {
        if (inputValue === '') {
            Alert.alert(
                'ERROR',
                'El campo es obligatorio',
                [{
                    text: 'Ok'
                }]
            )
            return
        }
        if (!validacion(/^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/, inputValue, 'Formato es incorrecto: (8.8.4.4)')) { return; }
        try {
            setLoading(true)
            const response = await fetch(`http://ipwho.is/${inputValue}`)
            const data = await response.json()
            console.log(data);
            //Almacenando data de la IP
            setConsultaIp(data)
            guardarDatosIP(data)
            setInputValue('')
        } catch (error) {
            console.log('Error al obetener datos', error);
        }
    }

    //Funcion para guardar la consulta de la IP ingresada
    const guardarDatosIP = async (consultaIp) => {
        try {
            setLoading(false)
            const historialActual = await AsyncStorage.getItem('resultados')
            const datos = historialActual ? JSON.parse(historialActual) : []

            //Agregando la nueva busqueda al historial
            const actualizandoHistorial = [...datos, consultaIp]
            //Almacenando el historial actualizado en AsyncStorage
            await AsyncStorage.setItem('resultados', JSON.stringify(actualizandoHistorial))
            setResultados(actualizandoHistorial)
        } catch (error) {
            console.log('Error al almacenar información de la IP: ', error);
        }
    }

    //Funcion para cargar la data de la IP almacenada
    const cargarDataIP = async () => {
        try {
            //Cargando el historial
            const historialAlmacenado = await AsyncStorage.getItem('resultados')
            const dataAlmacenada = historialAlmacenado ? JSON.parse(historialAlmacenado) : []

            //Actualizando el historial cargado
            setResultados(dataAlmacenada)
        } catch (error) {
            console.log('Error al cargar la información: ', error);
        }
    }

    //Funcion para eliminar la data del AsyncStorage
    const eliminarDataIP = async () => {
        try {
            await AsyncStorage.removeItem('resultados')
            Alert.alert('Información eliminada correctamente')
        } catch (error) {
            console.log('No se pudo eliminar el contenido:', error);
            Alert.alert('Error al eliminar la información')
        }
    }

    //Validacion
    const validacion = (ex, campo, mensaje) => {
        if (!ex.test(campo)) {
            Alert.alert(
                'Error',
                mensaje,
                [{
                    text: 'OK'
                }]
            )
            return false;
        }
        return true;
    }


    return (
        <>
            <Card style={styles.cardContent}>
                <Card.Content>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Ingresa una IP:</Text>
                        <TextInput mode="outlined" value={inputValue} onChangeText={(text) => setInputValue(text)} />
                    </View>
                    <View style={styles.contenedorBoton}>
                        <View style={styles.boton}>
                            <Button mode='outlined' onPress={fetchConsulta}>Consultar</Button>
                        </View>
                        <View style={styles.boton}>
                            <Button mode='outlined' onPress={eliminarDataIP}>Eliminar</Button>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            {
                loading && <ActivityIndicator size="large" color='#7743DB' style={styles.loading} />
            }
            {/* Mostrando resultados */}
            <ScrollView>
                {resultados.length > 0 && (
                    <>
                        {(resultados.reverse()).map((item, index) => (
                            <View style={styles.contenedorPrincipal} key={index}>
                                <Card>
                                    <View style={styles.cardContainer}>
                                        <View style={styles.contenedorImage}>
                                            <Text variant="labelLarge" style={{ color: 'white' }}>{item.country}</Text>
                                            <Text variant="labelLarge" style={{ color: 'white' }}>{item.ip}</Text>
                                        </View>
                                        <View style={styles.contenedorInfo}>
                                            <Card.Content>
                                                <Text variant="bodyLarge">Tipo: <Text variant="labelLarge">{item.type}</Text> </Text>
                                                <Text variant="bodyLarge">Continente: <Text variant="labelLarge">{item.continent}</Text> </Text>
                                                <Text variant="bodyLarge">Código País: <Text variant="labelLarge">{item.country_code}</Text> </Text>
                                                <Text variant="bodyLarge">Región: <Text variant="labelLarge">{item.region}</Text> </Text>
                                                <Text variant="bodyLarge">Ciudad: <Text variant="labelLarge">{item.city}</Text> </Text>
                                                <Text variant="bodyLarge">Capital: <Text variant="labelLarge">{item.capital}</Text> </Text>
                                            </Card.Content>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </>
    );

}

const styles = StyleSheet.create({
    cardContent: {
        width: '100%',
        //backgroundColor: '#FAF3F0',
        borderRadius: 0
    },
    formControl: {
        marginTop: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    contenedorBoton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginVertical: 10
    },
    boton: {
        flex: 1, // Hace que los botones ocupen un espacio igual
        padding: 10,
        margin: 5,
        //borderRadius: 5,
    },
    contenedorPrincipal: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
    cardContainer: {
        flexDirection: 'row',
    },
    contenedorImage: {
        backgroundColor: '#7743DB',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        padding: 3,
        marginRight: 5,
    },
    contenedorInfo: {
        flex: 3,
        marginLeft: 10,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    loading: {
        marginTop: 5
    }
})