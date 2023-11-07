import React from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card } from "react-native-paper";

//importando imagenes estaticas
const imageProfile1 = require('../../assets/Ivan-Garcia.jpg')
const imageProfile2 = require('../../assets/Victor-Rodriguez.jpg')

export function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>Integrantes</Text>
      </View>
      <View style={styles.contenedorPrincipal}>
        <Card>
          <View style={styles.cardContainer}>
            <View style={styles.contenedorImage}>
              <Image source={imageProfile1} style={styles.image} />
            </View>
            <View style={styles.contenedorInfo}>
              <Card.Title title='Ivan Alexander Martínez García' />
              <Card.Content>
                <Text variant="labelLarge">MG172002</Text>
                <Text variant="bodyMedium">Ingeniería en Ciencias de la Computación</Text>
              </Card.Content>
            </View>

          </View>
        </Card>
      </View>

      <View style={styles.contenedorPrincipal}>
        <Card>
          <View style={styles.cardContainer}>
            <View style={styles.contenedorImage}>
              <Image source={imageProfile2} style={styles.image} />
            </View>
            <View style={styles.contenedorInfo}>
              <Card.Title title='Víctor René Rodríguez Martínez' />
              <Card.Content style={styles.descripcion}>
                <Text variant="labelLarge">RM172024</Text>
                <Text variant="bodyMedium">Ingeniería en Ciencias de la Computación</Text>
              </Card.Content>
            </View>

          </View>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    marginTop: 10,
    marginBottom: 20,
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
    height: 140,
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
  contenedorTitulo: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titulo: {
    color: '#7743DB',
    fontSize: 20,
    fontWeight: 'bold'
  },
})