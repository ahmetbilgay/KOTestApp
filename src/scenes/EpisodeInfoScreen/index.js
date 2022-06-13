import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {api} from '../../api';
import axios from 'axios';

const EpisodeInfoScreen = ({navigation, route}) => {
  const {url} = route.params;
  const [data, setData] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(url)
      .then(res => {
        setData(res.data);
        setCharacters(res.data.characters);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    characters !== null
      ? characters.map(e => {
          axios.all([axios.get(e)]).then(
            axios.spread((...responses) => {
              responses.map(res => {
                setArr(oldArray => [...oldArray, res.data]);
                setIsLoading(false);
              });
            }),
          );
        })
      : null;
  }, [characters]);

  useEffect(() => {
    console.log('EpisodeInfo Data Reload !');
  }, [arr]);

  const navigationFunction = url => {
    navigation.navigate('CharacterInfo', {url: url});
  };

  return (
    <ScrollView style={styles.container}>
      {data ? (
        <View key={data.name} style={styles.item}>
          <Text style={styles.text}>Id: {data.id}</Text>
          <Text style={styles.text}>Bölüm Adı: {data.name}</Text>
          <Text style={styles.text}>Tarih: {data.air_date}</Text>
          <Text style={styles.text}>Bölüm: {data.episode}</Text>
          <Text style={styles.text}>{url ? url : null}</Text>
        </View>
      ) : null}
      {arr.length > 0 && !isLoading ? (
        arr.map((e, key) => (
          <TouchableOpacity key={key} onPress={() => navigationFunction(e.url)}>
            <View style={styles.item}>
              <Text style={styles.text}>{e.id}</Text>
              <Text style={styles.text}>{e.name}</Text>
              <Image resizeMode='contain' style={styles.images} source={{uri: e.image}} />
              <Text style={styles.text}>{e.url}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View>
          <Text style={styles.text}>Yükleniyor ...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default EpisodeInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#222',
  },
});
