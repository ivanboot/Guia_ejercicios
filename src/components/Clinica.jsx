import { View } from "react-native";
import { StyleSheet,ScrollView,Alert } from "react-native";
import { TextInput, Text, Card,Button } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState} from "react";

export default function Clinica(props) {
    const {navigation}=props;
    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [genero,setGenero] = useState('');
    const [dui,setDui] = useState('');
    const [nit,setNit] = useState('');
    const [Direccion,setDireccion] = useState('');
    const [fecha, setFecha] = useState('');
    const [edad,setEdad]=useState(0);
    const [etapa,setEtapa] = useState('');
    const [numeromovil,setNumeromovil] = useState('');
    const [numerocasa,setNumerocasa] = useState('');
    const [correo,setCorreo] = useState('');
    

    const selectGenero = [
        { key: 'Masculino', value: 'Masculino' },
        { key: 'Femenino', value: 'Femenino' },
    ]

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const nuevaFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        nuevaEdad(date);
        setFecha(date.toLocaleDateString('es-ES', opciones));
        
        hideDatePicker();
    };

    const nuevaEdad =date=>{
        var edadTemp = (new Date()).getFullYear() - date.getFullYear();
        setEdad(edadTemp);

        var etapaTemp='Sin etapa';
        if(edadTemp>=0 && edadTemp<=5){etapaTemp='Primera infancia'}
        if(edadTemp>5 && edadTemp<=11){etapaTemp='infancia'}
        if(edadTemp>11 && edadTemp<=18){etapaTemp='Adolescencia'}
        if(edadTemp>18 && edadTemp<=26){etapaTemp='Juventud'}
        if(edadTemp>26 && edadTemp<=59){etapaTemp='Adultez'}
        if(edadTemp>59){etapaTemp='Persona mayor'}

        setEtapa(etapaTemp);
    }

    const limpiarCampos = () => {
        setNombre('');
        setApellido('');
        setCorreo('');
        setDireccion('');
        setDui('');
        setFecha('');
        setGenero('');
        setNit('');
        setNumerocasa('');
        setNumeromovil('');
    }

    const validacion =(ex,campo,mensaje)=>{
       
        if(!ex.test(campo)){
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

    const registrarPaciente =()=>{
        if (nombre == '' || apellido == '' ||
            genero == '' || dui == '' ||
            nit == '' || fecha == '' ||
            numerocasa == ''|| numeromovil == '' ||
            correo=='' || Direccion=='') {
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

        //Validando nombre y apellido
        //Comprobando si existen numeros en su contenido
        if(!validacion(/^\D*$/,nombre,'Los nombres no deben contener números')){return;}
        if(!validacion(/^\D*$/,apellido,'Los apellidos no deben contener números')){return;}
        if(!validacion(/^\d{8}-\d{1}$/,dui,'El formato del DUI (########-#) es incorrecto')){return;}
        if(!validacion(/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/,nit,'El formato del NIT (####-######-###-#) es incorrecto')){return;}
        if(!validacion(/^[7||6]{1}\d{3}-\d{4}$/,numeromovil,'El número de teléfono móvil puede empezar con dígito 7 o 6 y debe cumplir con el formato ####-####')){return;}
        if(!validacion(/^[2]{1}\d{3}-\d{4}$/,numerocasa,'El número de teléfono de casa solo puede empezar con 2 y debe cumplir con el formato ####-####')){return;}
        if(!validacion(/^[\w\.-]+@[\w\.-]+\.\w+$/,correo,'El formato del correo no es válido')){return;}


        

        navigation.navigate('Ejercicio1_datos',
        {nombre,apellido,genero,dui,nit,Direccion,fecha,edad,etapa,numeromovil,numerocasa,correo});
            
    }

    return (
            <Card style={styles.cardContent}>

                <Card.Content>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text variant="headlineSmall">Ingreso de paciente</Text>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Nombre del paciente:</Text>
                            <TextInput mode="outlined" onChangeText={(value) =>{setNombre(value)} } />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Apellido del paciente:</Text>
                            <TextInput mode="outlined" onChangeText={(value) => {setApellido(value)}} />
                        </View>
                        <View style={styles.formControl} >
                            <Text style={styles.label}>Género:</Text>
                            <SelectList
                                setSelected={(seleccion) => {setGenero(seleccion)}}
                                data={selectGenero}
                                save="value"
                            />
                        </View>
                        <View style={styles.formControl} >
                            <Text style={styles.label}>DUI:</Text>
                            <TextInput mode="outlined" keyboardType="number-pad" onChangeText={(value) => {setDui(value)}} />
                        </View>
                        <View style={styles.formControl} >
                            <Text style={styles.label}>NIT:</Text>
                            <TextInput mode="outlined" keyboardType="number-pad" onChangeText={(value) => {setNit(value)}} />
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Dirección:</Text>
                            <TextInput mode="outlined" multiline={true} onChangeText={(value) => {setDireccion(value)}} />
                        </View>

                        <View>
                            <Text style={styles.label}>Fecha de nacimiento:</Text>
                            <Button mode="outlined" onPress={showDatePicker}>Seleccionar Fecha</Button>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode='date'
                                onConfirm={nuevaFecha}
                                onCancel={hideDatePicker}
                                maximumDate={new Date()}
                                locale='es_ES'
                                headerTextIOS="Elige la fecha"
                                cancelTextIOS='Cancelar'
                                confirmTextIOS='Confirmar'
                            />
                            <Text>{fecha}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Número de Teléfono móvil:</Text>
                            <TextInput style={styles.input}
                            mode="outlined"
                                onChangeText={value => {setNumeromovil(value)}}
                                keyboardType='numeric' />
                        </View>
                        <View>
                            <Text style={styles.label}>Número de Teléfono de casa:</Text>
                            <TextInput style={styles.input}
                            mode="outlined"
                                onChangeText={value => {setNumerocasa(value)}}
                                keyboardType='numeric' />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Correo electrónico:</Text>
                            <TextInput mode="outlined" keyboardType="email-address" onChangeText={(value) => {setCorreo(value)}} />
                        </View>

                        <View style={styles.contenedorBoton}>
                            <Button mode='outlined' onPress={()=>registrarPaciente()}>Registrar</Button>
                        </View>

                    </ScrollView>
                </Card.Content>
            </Card>
    );

}

const styles = StyleSheet.create({
    cardContent: {
        width: '100%',
        backgroundColor: '#FAF3F0',
    },
    contenedorBoton: {
        alignItems: 'center'
    },
    formControl: {
        marginTop: 10
    },
    vistaModal: {
        flex: 1,
        width: 'auto',
        backgroundColor: '#000000aa',

    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    Modal: {

        backgroundColor: '#fff',
        margin: 10,
        padding: 20,
        borderRadius: 10,

    },
});