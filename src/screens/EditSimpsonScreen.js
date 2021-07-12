import _ from 'lodash';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {saveCharacter} from '../redux/actions/getAction';

const {width, height} = Dimensions.get('window');

function EditSimpsonScreen(props) {
  const [name, setName] = useState(props.route.params.detail.name);
  const [title, setTitle] = useState(props.route.params.detail.job);
  const [about, setAbout] = useState(props.route.params.detail.about);
  const [image, setImage] = useState('');
  const [id, setId] = useState(props.route.params.detail.id);

  const editCharacter = () => {
    try {
      if (name === '') {
        throw new Error('You must enter a name and surname');
      }
      if (title === '') {
        throw new Error('You must enter a job title');
      }
      if (about === '') {
        throw new Error('You must enter the About section');
      }
      if (image === '') {
        throw new Error('You must enter a image');
      }

      const list = _.cloneDeep(props.simpsons);
      list[props.route.params.index].name = name;
      list[props.route.params.index].job = title;
      list[props.route.params.index].about = about;
      list[props.route.params.index].avatar = image;

      props.onSaveCharacter(list);
      props.navigation.popToTop();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: 'rgb(128,128,128,0.8)', flex: 1}}
      contentContainerStyle={styles.scrolView}>
      <TextInput
        value={name}
        theme={theme}
        style={styles.inputStyle}
        label="Name Surname"
        onChangeText={text => setName(text)}></TextInput>
      <TextInput
        value={title}
        theme={theme}
        style={styles.inputStyle}
        label="Job Title"
        onChangeText={text => setTitle(text)}></TextInput>
      <TextInput
        multiline={true}
        value={about}
        theme={theme}
        style={[styles.inputStyle, {height: 200}]}
        label="About Him/Her"
        onChangeText={text => setAbout(text)}></TextInput>
      <TextInput
        value={image}
        theme={theme}
        style={styles.inputStyle}
        label="İmage Link"
        onChangeText={text => setImage(text)}></TextInput>

      <Button
        onPress={() => editCharacter()}
        mode="contained"
        style={styles.buttonStyle}
        color="blue">
        Edit
      </Button>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  scrolView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputStyle: {
    marginVertical: 10,
    width: width * 0.95,
  },
  buttonStyle: {
    marginTop: 10,
    width: width * 0.95,
    height: 50,
    justifyContent: 'center',
  },
});

const theme = {
  colors: {
    primary: 'gray',
    accent: 'white',
  },
};

const mapStateToProps = state => {
  return {
    simpsons: state.simpsons.simpsonsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveCharacter: data => dispatch(saveCharacter(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSimpsonScreen);
