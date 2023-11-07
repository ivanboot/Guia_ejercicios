import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput, Text, Card, DataTable } from "react-native-paper";

export function ClinicaDatos({ route, navigation }) {

    const { nombre, apellido, genero, dui, nit, Direccion, fecha, edad, etapa, numeromovil, numerocasa, correo } = route.params;
    return (
        <Card style={styles.container}>
            <Card.Content>
                <DataTable.Row>
                    <DataTable.Cell> <Text style={styles.label}>Nombre:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{nombre}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Apellido:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{apellido}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Genero:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{genero}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>DUI:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{dui}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>NIT:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{nit}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Fecha nacimiento:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{fecha}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Edad:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{edad}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Etapa:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{etapa}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Número móvil:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{numeromovil}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Número casa:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{numerocasa}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Correo:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{correo}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Direccion:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{Direccion}</Text></DataTable.Cell>
                </DataTable.Row>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#FAF3F0',
        margin:15
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20
    },
    texto: {
        fontSize: 17,
        width: 'auto'
    },
});
