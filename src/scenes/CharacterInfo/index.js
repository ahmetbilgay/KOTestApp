import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {api} from '../../api';
import {width} from '../../utils/useDimentions';

const ThreeScreen = ({route}) => {
  const {url} = route.params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(url)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data !== null && !isLoading ? (
          <View style={styles.item}>
            <Text style={styles.text}>Id: {data.id}</Text>
            <Text style={styles.text}>İsim: {data.name}</Text>
            <Text style={styles.text}>Tür: {data.species}</Text>
            <Text style={styles.text}>Cinsiyet: {data.gender}</Text>
            <Text style={styles.text}>{url ? url : null}</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{uri: data.image}}
            />
          </View>
        ) : (
          <>
            <Text style={styles.text}>Yükleniyor ...</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ThreeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
  text: {
    color: '#222',
  },
});
