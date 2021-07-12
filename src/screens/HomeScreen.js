import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import _ from 'lodash';
import {getSimpsons, saveCharacter} from '../redux/actions/getAction';
import {connect} from 'react-redux';
import {icons} from '../theme/icons';

function HomeScreen(props) {
  const [yukleniyor, setYukleniyor] = useState(false);
  // eslint-disable-next-line no-undef
  useEffect(() => {
    if (_.isEmpty(props.simpsons)) {
      setYukleniyor(true);
      props.onGetSimpsons();
    }
    setYukleniyor(false);
  }, [props]);

  const deleteItem = item => {
    var list = _.cloneDeep(props.simpsons);
    var found = list.findIndex(function (element) {
      return element.id === item.id;
    });
    list.splice(found, 1);
    props.onDeleteCharacter(list);
  };

  const renderSimpsons = (item, index) => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('DetailSimpson', {item: item, index: index})
        }
        style={styles.renderButton}>
        <View style={styles.firstView}>
          <View style={styles.imageView}>
            <Image source={{uri: item.avatar}} style={styles.image} />
          </View>
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Warning',
              'Are you sure you want to delete the character?',
              [{text: 'No'}, {text: 'Yes', onPress: () => deleteItem(item)}],
            )
          }>
          <Image source={icons.trash} />
        </TouchableOpacity>
      </Pressable>
    );
  };
  console.log(props.simpsons);
  return (
    <View style={styles.container}>
      {yukleniyor === false ? (
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
            data={props.simpsons}
            renderItem={({item, index}) => renderSimpsons(item, index)}
          />
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => props.navigation.navigate('AddSimpson')}>
            <Image source={icons.plus} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <ActivityIndicator color={'red'} size={45} />
          <Text style={{color: 'green'}}>Yükleniyor </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderButton: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flex: 1,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {width: 60, height: 60, borderRadius: 10, marginRight: 10},
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'contain',
  },
  plusButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 50,
    borderRadius: 25,
    right: 160,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {fontSize: 18},
});
const mapStateToProps = state => {
  return {
    simpsons: state.simpsons.simpsonsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetSimpsons: () => dispatch(getSimpsons()),
    onDeleteCharacter: data => dispatch(saveCharacter(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
