
import { StatusBar, Dimensions, SafeAreaView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, Fontisto, Ionicons, Octicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { data } from './src/data/mock-data';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {
  const videoRef = useRef<any>(null);
  const [status, setStatus] = useState({});
  const [isplay, setIsPlay] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height


  useEffect(() => {
    if (!videoRef.current) {
      videoRef.current?.seek()
    }
  }, [currIndex])

  const renderItem = ({ item, index }: any) => {
    return (
      <Pressable style={[styles.container, { height: height }]} onPress={() => { }}>
        <Video
          ref={videoRef}
          style={[styles.video, { width: width, height: '100%' }]}
          source={{
            uri: item.url,
          }}

          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          shouldPlay={currIndex === index}
        />

        <LinearGradient
          colors={['transparent', 'transparent', 'rgba(0,0,0,0.2)']}
          style={styles.bottomView}
        >

          <View style={styles.actionIcon}>
            <View>
              <Text style={[styles.textStyle, { fontSize: 14 }]}>{item.title}</Text>
              <View style={{ flexDirection: 'row', width: 250 }}>
                <Text style={styles.textStyleDescription} numberOfLines={2}>
                  {item.subtitle}
                </Text>
                <Pressable style={{ justifyContent: 'flex-end' }}>
                  <Text style={[styles.textStyleDescription, { fontSize: 11, color: '#e4e4e7' }]}>
                    ดูเพิ่มเติม
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{}}>
              <View style={styles.iconStyle}>
                <Octicons name="heart-fill" size={30} color="white" />
                <Text style={styles.numberText}>12</Text>
              </View>
              <View style={styles.iconStyle}>
                <AntDesign name="message1" size={30} color="white" />
                <Text style={styles.numberText}>12</Text>
              </View>
              <Ionicons name="ios-share-social-outline" size={30} color="white" style={styles.iconStyle} />
              <View style={[styles.iconStyle, { borderWidth: 2, borderColor: 'white', borderRadius: 8 }]}>
                <Image source={{
                  uri: 'https://scontent.cdninstagram.com/v/t51.2885-15/345751493_777962923712744_1285770883790747324_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=_pbgscBFnqkAX_BnA6N&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzA5NzQ0ODY4OTE3OTAzNjE3OQ%3D%3D.2-ccb7-5&oh=00_AfAcsDijpDygZV7Jxe94CFKzAExR2cSBMHopkM2B6UuWhQ&oe=649023AC&_nc_sid=df044f'
                }} style={{ width: 30, height: 30, borderRadius: 8 }} />
              </View>
            </View>
          </View>
        </LinearGradient>



      </Pressable>
    )
  }

  const onChangeIndex = ({ index }: any) => {
    setCurrIndex(index);
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }} >
      <StatusBar barStyle="light-content" />

      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />
      <View style={{ position: 'absolute', top: 10, left: 16 }}>
        <Text style={styles.textStyle}>Vi<Text style={{ color: '#f43f5e' }}>V</Text></Text>
      </View>
      <View style={{ position: 'absolute', top: 10, right: 16 }}>

        <Octicons name="search" size={26} color="white" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  flexHorzonntal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35,
    paddingHorizontal: 15,

  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  textStyleDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white'
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 50
  },
  actionIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

  },
  iconStyle: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberText: {
    fontSize: 11,
    color: 'white'
  }

});
