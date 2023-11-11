import * as React from "react";
import { View, StyleSheet, ScrollView, Alert, FlatList, TouchableOpacity } from "react-native";
import { TextInput, Text, Card, Button } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createStackNavigator, NavigationEvents } from '@react-navigation/stack';
import { createAppContainer, NavigationContainer, useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

//ip para utilizar el servicio el api y bdd
const servidor = '192.168.1.5';
const Stack = createStackNavigator();

//Clase por defecto que se exporta
export default class Api extends React.Component {

    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name='Inicio' component={PantallaInicio} options={{
                    title: 'Gestión de equipos',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF'
                }} />
                <Stack.Screen name='NuevoEquipo' component={NuevoEquipo} options={{
                    title: 'Nuevo equipo',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF'
                }} />
                <Stack.Screen name='ListaIntegrantes' component={ListaIntegrantes} options={{
                    title: 'Lista de integrantes',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF'
                }} />
                <Stack.Screen name='NuevoIntegrante' component={NuevoIntegrante} options={{
                    title: 'Nuevo integrante',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF'
                }} />
                <Stack.Screen name='DetalleIntegrante' component={DetalleIntegrante} options={{
                    title: 'Información de integrante',
                    headerStyle: { backgroundColor: '#7743DB' },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF'
                }} />
            </Stack.Navigator>

        )
    };
}

//Clase pantalla inicial, primera pantalla al cargar este componente
class PantallaInicio extends React.Component {
    state = {
        equipos: [],
    }

    cargarEquipos() {
        fetch('http://' + servidor + '/api_guia.php?comando=listarEquipos', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const listado = responseJson.teams;
                this.setState({
                    equipos: listado,
                    total: listado.length
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {

        this.focusInicio = this.props.navigation.addListener(
            'focus',
            () => {
                this.cargarEquipos();
            }
        );
        // Update the document title using the browser API

    }
    componentWillUnmount() {
        this.focusInicio();
    }

    render() {
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contenedorPrincipal}>
                        {this.state.equipos.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => this.props.navigation.navigate('ListaIntegrantes', item)}>
                                <Card style={{ marginTop: 10 }}>
                                    <View style={styles.cardContainer}>
                                        <View style={styles.contenedorImage}>
                                            <Text style={{ color: '#FFFFFF', textAlignVertical: 'auto' }}>
                                                {item.id}  Equipo: {item.nombreEquipo}
                                            </Text>
                                        </View>
                                        <View style={styles.contenedorInfo}>
                                            <Card.Content>
                                                <Text variant="labelLarge">Facultad: {item.facultad}</Text>
                                                <Text variant="labelLarge">Año: {item.anio}</Text>
                                                <Text variant="labelLarge">Ciclo: {item.ciclo}</Text>
                                                <Text variant="labelLarge">Torneo: {item.torneo}</Text>
                                            </Card.Content>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>
                <View style={styles.contenedorPrincipal}>
                    <TouchableOpacity
                        style={styles.contenedorAgregar}
                        onPress={() => this.props.navigation.navigate('NuevoEquipo')}
                    >
                        <Icon name="plus" size={30} color='#FFFFFF' />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

//Pantalla de ingreso de nuevos Equipos
class NuevoEquipo extends React.Component {
    state = {
        nombreEquipo: '',
        facultad: '',
        anio: '',
        ciclo: '',
        torneo: '',
    }

    registrarEquipo() {
        fetch('http://' + servidor + '/api_guia.php?comando=agregarEquipo&nombreEquipo=' +
            this.state.nombreEquipo
            + '&facultad=' + this.state.facultad
            + '&anio=' + this.state.anio
            + '&ciclo=' + this.state.ciclo
            + '&torneo=' + this.state.torneo, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const mensaje = responseJson.mensaje;
                console.log(mensaje);
                if (!mensaje)
                    alert("Error al agregar!");
                else {
                    alert(mensaje);
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error de Internet!!");
            });
    }

    render() {
        const selectTorneo = [
            { key: 'Masculino', value: 'Masculino' },
            { key: 'Femenino', value: 'Femenino' },
        ];

        const selectCiclo = [
            { key: 'Ciclo I', value: 'Ciclo I' },
            { key: 'Ciclo II', value: 'Ciclo II' },
        ];
        return (
            <>
                <Card style={styles.cardContent}>
                    <Card.Content>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Nombre del equipo:</Text>
                            <TextInput mode="outlined" onChangeText={(value) => { this.setState({ nombreEquipo: value }) }} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Facultad:</Text>
                            <TextInput mode="outlined" onChangeText={(value) => { this.setState({ facultad: value }) }} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Año de inscripción:</Text>
                            <TextInput mode="outlined" keyboardType='numeric' onChangeText={(value) => { this.setState({ anio: value }) }} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Ciclo de inscripción:</Text>
                            <SelectList
                                setSelected={(seleccion) => { this.setState({ torneo: seleccion }) }}
                                data={selectCiclo}
                                save="value"
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Tipo de torneo:</Text>
                            <SelectList
                                setSelected={(seleccion) => { this.setState({ ciclo: seleccion }) }}
                                data={selectTorneo}
                                save="value"
                            />
                        </View>
                        <View style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto', }}>
                            <Button mode='outlined' onPress={() => this.registrarEquipo()}>Registrar</Button>
                        </View>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

//Pantalla que lista integrantes segun el equipo seleccionado
class ListaIntegrantes extends React.Component {

    state = {
        integrantes: [],
        equipo: '',
        idEquipo: 0,
        total: 0,
    }

    cargarListaIntegrantes(id) {
        fetch('http://' + servidor + '/api_guia.php?comando=listarIntegrantes&idEquipo=' + id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log("Id de equipo seleccionado: " + this.state.idEquipo);
                const listado = responseJson.members;
                this.setState({
                    integrantes: listado,
                    total: listado.length
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        const { route, navigation } = this.props;
        this.focusIntegrantes = this.props.navigation.addListener(
            'focus',
            () => {

                this.setState({
                    equipo: route.params.nombreEquipo,
                    idEquipo: route.params.id,
                });

                this.cargarListaIntegrantes(route.params.id);
            }
        );
    }
    componentWillUnmount() {
        this.focusIntegrantes();
    }

    render() {
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.total == 0 ? (
                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}
                        >No hay Integrantes en el equipo {this.state.equipo}
                        </Text>
                    ) : (
                        <>
                            <View style={styles.contenedorPrincipal}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                    Mostrando {this.state.total} jugadores del equipo: {this.state.equipo}</Text>
                                {this.state.total == 10 ?
                                    (
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'red' }}>
                                            El equipo se encuentra completo</Text>
                                    ) :
                                    (
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                                            Aún puede agregar {10 - (this.state.total)} jugadores más</Text>
                                    )}
                                {this.state.integrantes.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        //onPress = {() => this.alertItemName(item)}
                                        onPress={() => this.props.navigation.navigate('DetalleIntegrante', item)}>
                                        <Card style={{ marginTop: 10 }}>
                                            <View style={styles.cardContainer}>
                                                <View style={styles.contenedorImage}>
                                                    <Text style={{ color: 'white', textAlignVertical: 'auto' }}>
                                                        Camisa: {item.numCamisa}
                                                    </Text>
                                                </View>
                                                <View style={styles.contenedorIntegrantes}>
                                                    <Card.Content>
                                                        <Text variant="labelLarge">Carnet: {item.carnet}</Text>
                                                        <Text variant="labelLarge">Nombre: {item.nombre}</Text>
                                                        <Text variant="labelLarge">Apellido: {item.apellido}</Text>
                                                        <Text variant="labelLarge">Fecha de Nac.: {item.fechaNac}</Text>
                                                        <Text variant="labelLarge">Genero: {item.genero}</Text>
                                                        <Text variant="labelLarge">Posición: {item.posicion}</Text>
                                                    </Card.Content>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )
                    }

                </ScrollView>
                {this.state.total == 10 ? (
                    <></>
                ) : (
                    <View style={styles.contenedorPrincipal}>
                        <TouchableOpacity
                            style={styles.contenedorAgregar}
                            onPress={() => (this.props.navigation.navigate('NuevoIntegrante', this.state.idEquipo))}>

                            <Icon name="plus" size={30} color='#FFFFFF' />
                        </TouchableOpacity>
                    </View>
                )}

            </>
        );
    }
}

//Pantalla que ingresa un nuevo integrante, accesible desde pantalla ListaIntegrantes
class NuevoIntegrante extends React.Component {
    state = {
        carnet: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        genero: '',
        posicion: '',
        numCamisa: 0,
        idEquipo: 0,
        dtpVisibility: false,
    }

    validacion(ex, campo, mensaje) {
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

    registrarIntegrante() {
        console.log("datos ingresados: " + this.state.carnet + ", " + this.state.nombre + ", " + this.state.apellido + ", " + this.state.fechaNac + ", " + this.state.genero + ", " + this.state.posicion + ", " + this.state.numCamisa + ", " + this.state.idEquipo);

        if (this.state.carnet == '' || this.state.nombre == '' ||
            this.state.apellido == '' || this.state.fechaNac == '' ||
            this.state.genero == '' || this.state.posicion == '') {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                [{
                    text: 'OK'
                }]
            )

            return;
        }

        //Validaciones
        if (!this.validacion(/^[A-Z]{2}[0-9]{6}$/, this.state.carnet, 'Formato de carnet incorrecto')) { return; }
        if (!this.validacion(/^\D*$/, this.state.nombre, 'Los nombres no deben contener números')) { return; }
        if (!this.validacion(/^\D*$/, this.state.apellido, 'Los nombres no deben contener números')) { return; }


        fetch('http://' + servidor + '/api_guia.php?comando=agregarIntegrante&carnet=' +
            this.state.carnet
            + '&nombre=' + this.state.nombre
            + '&apellido=' + this.state.apellido
            + '&fechaNac=' + this.state.fechaNac
            + '&genero=' + this.state.genero
            + '&posicion=' + this.state.posicion
            + '&numCamisa=' + this.state.numCamisa
            + '&idEquipo=' + this.state.idEquipo, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const mensaje = responseJson.mensaje;
                console.log(mensaje);
                if (!mensaje)
                    alert("Error al agregar!");
                else {
                    alert(mensaje);
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error de Internet!!");
            });
    }

    componentDidMount() {
        const { route, navigation } = this.props;
        this.focusNuevoIntegrante = this.props.navigation.addListener(
            'focus',
            () => {
                console.log("Id de equipo seleccionado: " + route.params[0]);
                this.setState({
                    idEquipo: route.params[0],
                });

            }
        );
    }
    componentWillUnmount() {
        this.focusNuevoIntegrante();
    }

    render() {
        const selectGenero = [
            { key: 'Masculino', value: 'Masculino' },
            { key: 'Femenino', value: 'Femenino' },
        ];
        const selectPosicion = [
            { key: 'Delantero', value: 'Delantero' },
            { key: 'Delantero Lateral', value: 'Delantero Lateral' },
            { key: 'Medio Campista', value: 'Medio Campista' },
            { key: 'Defensa', value: 'Defensa' },
            { key: 'Defensa Lateral', value: 'Defensa Lateral' },
            { key: 'Portero', value: 'Portero' },
        ];

        const showDatePicker = () => {
            this.setState({ dtpVisibility: true });
        };

        const hideDatePicker = () => {
            this.setState({ dtpVisibility: false });
        };

        const nuevaFecha = date => {
            console.log("Id de equipo seleccionado: " + this.state.idEquipo);

            this.setState({ fechaNac: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() });
            console.log("La fecha seleccionada es :" + this.state.fechaNac);
            hideDatePicker();
        };
        return (
            <>
                <Card style={styles.cardContent}>
                    <Card.Content>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Carnet:</Text>
                                <TextInput mode="outlined" placeholder="GG123456" placeholderTextColor={'gray'}
                                    onChangeText={(value) => { this.setState({ carnet: value }) }} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Nombre:</Text>
                                <TextInput mode="outlined" onChangeText={(value) => { this.setState({ nombre: value }) }} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Apellido:</Text>
                                <TextInput mode="outlined" onChangeText={(value) => { this.setState({ apellido: value }) }} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Fecha de nacimiento:</Text>
                                <Button mode="outlined" onPress={showDatePicker}>Seleccionar Fecha</Button>
                                <DateTimePickerModal
                                    isVisible={this.state.dtpVisibility}
                                    mode='date'
                                    onConfirm={nuevaFecha}
                                    onCancel={hideDatePicker}
                                    maximumDate={new Date()}
                                    locale='es_ES'
                                    headerTextIOS="Elige la fecha"
                                    cancelTextIOS='Cancelar'
                                    confirmTextIOS='Confirmar'
                                />
                                <Text>{this.state.fechaNac}</Text>
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Genero:</Text>
                                <SelectList
                                    setSelected={(seleccion) => { this.setState({ genero: seleccion }) }}
                                    data={selectGenero}
                                    save="value"
                                />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Número de camisa:</Text>
                                <TextInput mode="outlined" keyboardType='numeric' onChangeText={(value) => { this.setState({ numCamisa: value }) }} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Posición de juego:</Text>
                                <SelectList
                                    setSelected={(seleccion) => { this.setState({ posicion: seleccion }) }}
                                    data={selectPosicion}
                                    save="value"
                                />
                            </View>
                            <View style={styles.contenedorBoton}>
                                <Button mode='outlined' onPress={() => this.registrarIntegrante()}>Registrar</Button>
                            </View>
                        </ScrollView>
                    </Card.Content>
                </Card>
            </>
        )
    }
}

//Pantalla que permite modificar o eliminar un integrante seleccionado en pantalla ListaIntegrantes
class DetalleIntegrante extends React.Component {

    state = {
        id: 0,
        carnet: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        genero: '',
        posicion: '',
        numCamisa: 0,
        idEquipo: 0,
        dtpVisibility: false,
    }

    validacion(ex, campo, mensaje) {
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

    actualizarIntegrante() {
        console.log("datos ingresados: " + this.state.carnet + ", " + this.state.nombre + ", " + this.state.apellido + ", " + this.state.fechaNac + ", " + this.state.genero + ", " + this.state.posicion + ", " + this.state.numCamisa + ", " + this.state.idEquipo);

        if (this.state.carnet == '' || this.state.nombre == '' ||
            this.state.apellido == '' || this.state.fechaNac == '' ||
            this.state.genero == '' || this.state.posicion == '') {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                [{
                    text: 'OK'
                }]
            )

            return;
        }

        //Validaciones
        if (!this.validacion(/^[A-Z]{2}[0-9]{6}$/, this.state.carnet, 'Formato de carnet incorrecto')) { return; }
        if (!this.validacion(/^\D*$/, this.state.nombre, 'Los nombres no deben contener números')) { return; }
        if (!this.validacion(/^\D*$/, this.state.apellido, 'Los nombres no deben contener números')) { return; }


        fetch('http://' + servidor + '/api_guia.php?comando=actualizarIntegrante&id=' + this.state.id
            + '&carnet=' + this.state.carnet
            + '&nombre=' + this.state.nombre
            + '&apellido=' + this.state.apellido
            + '&fechaNac=' + this.state.fechaNac
            + '&genero=' + this.state.genero
            + '&posicion=' + this.state.posicion
            + '&numCamisa=' + this.state.numCamisa
            + '&idEquipo=' + this.state.idEquipo, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const mensaje = responseJson.mensaje;
                console.log(mensaje);
                if (!mensaje)
                    alert("Error al actualizar!");
                else {
                    alert(mensaje);
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error de Internet!!");
            });
    }

    eliminarIntegrante() {

        fetch('http://' + servidor + '/api_guia.php?comando=eliminarIntegrante&id=' + this.state.id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const mensaje = responseJson.mensaje;
                console.log(mensaje);
                if (!mensaje)
                    alert("Error al eliminar!");
                else {
                    alert(mensaje);
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error de Internet!!");
            });
    }

    componentDidMount() {
        const { route, navigation } = this.props;
        this.focusDetalles = this.props.navigation.addListener(
            'focus',
            () => {

                this.setState({
                    id: route.params.id,
                    carnet: route.params.carnet,
                    nombre: route.params.nombre,
                    apellido: route.params.apellido,
                    fechaNac: route.params.fechaNac,
                    genero: route.params.genero,
                    posicion: route.params.posicion,
                    numCamisa: route.params.numCamisa,
                    idEquipo: route.params.idEquipo,
                });
            }
        );
    }
    componentWillUnmount() {
        this.focusDetalles();
    }

    render() {
        const selectGenero = [
            { key: 'Masculino', value: 'Masculino' },
            { key: 'Femenino', value: 'Femenino' },
        ];
        const selectPosicion = [
            { key: 'Delantero', value: 'Delantero' },
            { key: 'Delantero Lateral', value: 'Delantero Lateral' },
            { key: 'Medio Campista', value: 'Medio Campista' },
            { key: 'Defensa', value: 'Defensa' },
            { key: 'Defensa Lateral', value: 'Defensa Lateral' },
            { key: 'Portero', value: 'Portero' },
        ];

        const showDatePicker = () => {
            this.setState({ dtpVisibility: true });
        };

        const hideDatePicker = () => {
            this.setState({ dtpVisibility: false });
        };

        const nuevaFecha = date => {
            console.log("Id de equipo seleccionado: " + this.state.idEquipo);
            this.setState({ fechaNac: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() });
            console.log("La fecha seleccionada es :" + this.state.fechaNac);
            hideDatePicker();
        };
        return (
            <Card style={styles.cardContent}>
                <Card.Content>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Carnet:</Text>
                            <TextInput mode="outlined" placeholder="GG123456" placeholderTextColor={'gray'}
                                onChangeText={(value) => { this.setState({ carnet: value }) }} value={this.state.carnet} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Nombre:</Text>
                            <TextInput mode="outlined" onChangeText={(value) => { this.setState({ nombre: value }) }} value={this.state.nombre} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Apellido:</Text>
                            <TextInput mode="outlined" onChangeText={(value) => { this.setState({ apellido: value }) }} value={this.state.apellido} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Fecha de nacimiento:</Text>
                            <Button mode="outlined" onPress={showDatePicker}>Seleccionar Fecha</Button>
                            <DateTimePickerModal
                                date={new Date(this.state.fechaNac)}
                                isVisible={this.state.dtpVisibility}
                                mode='date'
                                onConfirm={nuevaFecha}
                                onCancel={hideDatePicker}
                                maximumDate={new Date()}
                                locale='es_ES'
                                headerTextIOS="Elige la fecha"
                                cancelTextIOS='Cancelar'
                                confirmTextIOS='Confirmar'
                            />
                            <Text>{this.state.fechaNac}</Text>
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Genero:</Text>
                            <SelectList
                                setSelected={(seleccion) => { this.setState({ genero: seleccion }) }}
                                data={selectGenero}
                                save="value"
                                defaultOption={
                                    this.state.genero == 'Masculino' ? { key: 'Masculino', value: 'Masculino' } :
                                        { key: 'Femenino', value: 'Femenino' }
                                }
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Número de camisa:</Text>
                            <TextInput mode="outlined" keyboardType='numeric' value={(this.state.numCamisa).toString()}
                                onChangeText={(value) => { this.setState({ numCamisa: value }) }} />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Posición de juego:</Text>
                            <SelectList
                                setSelected={(seleccion) => { this.setState({ posicion: seleccion }) }}
                                data={selectPosicion}
                                save="value"
                            />
                        </View>
                        <View style={styles.contenedorBoton}>
                            <Button mode='outlined' onPress={() => this.actualizarIntegrante()}>Actualizar</Button>
                            <Button mode='outlined' onPress={() => this.eliminarIntegrante()}>Eliminar jugador</Button>
                        </View>
                    </ScrollView>
                </Card.Content>
            </Card>
        )
    }
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
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
        flexDirection: 'column'
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
    contenedorAgregar: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        position: 'abolute',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#7743DB',
        borderRadius: 100,
    },
    contenedorInfo: {
        flex: 3,
        marginTop: '10%'
    },
    contenedorIntegrantes: {
        flex: 3,
        marginTop: '4%'
    },
})