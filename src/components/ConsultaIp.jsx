import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Text, TextInput, Card, Button } from "react-native-paper";

const imageProfile1 = require('../../assets/Ivan-Garcia.jpg')

export default function ConsultaIp() {
    const [inputValue, setInputValue] = useState('')
    const [Consultar, setConsultar] = useState(false)
    const [resultados, setResultados] = useState({})

    const apiURL = 'http://ipwho.is/'

    useEffect(() => {
        const consultarIP = async () => {
            try {
                const response = await fetch()
            } catch (error) {
                
            }
        }
    }, [])
    

    return (
        <>
            <Card style={styles.cardContent}>
                <Card.Content>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Ingresa una IP:</Text>
                        <TextInput mode="outlined" />
                    </View>
                    <View style={styles.contenedorBoton}>
                        <View style={styles.boton}>
                            <Button mode='outlined' onPress={() => console.log('Consultando IP...')}>Consultar</Button>
                        </View>
                        <View style={styles.boton}>
                            <Button mode='outlined' onPress={() => console.log('Eliminando Consulta...')}>Eliminar</Button>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            {/* Mostrando resultados */}
            <ScrollView>
                <View style={styles.contenedorPrincipal}>
                    <Card>
                        <View style={styles.cardContainer}>
                            <View style={styles.contenedorImage}>
                                <Image source={imageProfile1} style={styles.image} />
                            </View>
                            <View style={styles.contenedorInfo}>
                                <Card.Title title='Tipo IP' />
                                <Card.Content>
                                    <Text variant="labelLarge">Continente</Text>
                                    <Text variant="labelLarge">Pais</Text>
                                    <Text variant="labelLarge">Codigo Pais</Text>
                                    <Text variant="labelLarge">Region</Text>
                                    <Text variant="labelLarge">Ciudad</Text>
                                    <Text variant="labelLarge">Capital</Text>
                                    <Text variant="labelLarge">Hora actual</Text>
                                    <Text variant="labelLarge">Coneccion</Text>
                                </Card.Content>
                            </View>

                        </View>
                    </Card>
                </View>
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
        //alignItems: 'center',
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
        height: 210,
        padding: 3,
        marginRight: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 75
    },
    contenedorInfo: {
        flex: 3,
        marginLeft: 10,
    },
    descripcion: {
        textAlign: 'left',
        marginBottom: 5,
    },
})