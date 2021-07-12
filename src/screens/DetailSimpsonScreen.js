import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');

function DetailSimpsonScreen(props) {
  const detail = props.route.params.item;
  return (
    <ScrollView contentContainerStyle={styles.scrolView}>
      <View style={styles.imageView}>
        <Image
          source={{uri: detail.avatar}}
          style={{width: width * 0.9, height: 250, resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.textInput}>
        <Text style={{fontWeight: 'bold', fontSize: 28}}>{detail.name}</Text>
      </View>
      <View style={styles.textInput}>
        <Text style={{fontSize: 18, color: 'gray'}}>{detail.job}</Text>
      </View>
      <View style={styles.textInput}>
        <Text style={{fontSize: 16, color: 'gray'}}>{detail.about}</Text>
      </View>
      <Button
        onPress={() =>
          props.navigation.navigate('EditSimpson', {
            detail: detail,
            index: props.route.params.index,
          })
        }
        mode="contained"
        style={styles.buttonStyle}
        color="blue">
        Edit Character
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrolView: {
    flexGrow: 1,
  },
  imageView: {justifyContent: 'center', alignItems: 'center', marginTop: 30},
  textInput: {padding: 10, justifyContent: 'center', alignItems: 'center'},
});
const mapStateToProps = state => {
  return {
    simpsons: state.simpsons.simpsonsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailSimpsonScreen);
