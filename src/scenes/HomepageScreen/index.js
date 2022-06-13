import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {api} from '../../api';

const HomepageScreen = ({navigation}) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/episode')
      .then(res => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log('Homepage Data Reload !');
  }, [data]);

  const navigationFunction = url => {
    navigation.navigate('EpisodeInfoScreen', {url: url});
  };
  return (
    <ScrollView style={styles.container}>
      {data !== null && !isLoading
        ? data.map(e => (
            <TouchableOpacity
              onPress={() => navigationFunction(e.url)}
              key={e.name}>
              <View style={styles.item}>
                <Text>Bölüm Adı: {e.name}</Text>
                <Text>Tarih: {e.air_date}</Text>
                <Text>Bölüm: {e.episode}</Text>
              </View>
            </TouchableOpacity>
          ))
        : null}
    </ScrollView>
  );
};

export default HomepageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.3,
  },
});
