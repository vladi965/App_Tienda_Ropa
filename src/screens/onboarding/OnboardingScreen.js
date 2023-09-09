import React from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {STYLES} from '../../constants/GeneralStyle';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#1F122E', white: '#fff', greenLight: '#80C5B0'};

const slides = [
  {
    id: '1',
    image: require('../../assets/images/image1.png'),
    title: 'Facil de Comprar',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../../assets/images/image2.png'),
    title: 'Entrega Rapida',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../../assets/images/image3.png'),
    title: 'Pago Seguro',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center', width}}>
      <Image
        source={item.image}
        style={{
          height: '70%',
          width: '100%',
          resizeMode: 'contain',
          marginTop: 10,
        }}
      />
      <View>
        <Text style={STYLES.title}>{item?.title}</Text>
        <Text style={STYLES.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToBackSlide = () => {
    const prevSlideIndex = currentSlideIndex - 1;
    if (prevSlideIndex != slides.length) {
      const offset = prevSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Header = () => {
    return (
      <View>
        {currentSlideIndex == slides.length - 1 ? (
          <View
            style={{alignItems: 'flex-end', marginRight: 15, marginTop: 20}}>
            <TouchableOpacity activeOpacity={0.8} onPress={skip}>
              <Text></Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{alignItems: 'flex-end', marginRight: 15, marginTop: 20}}>
            <TouchableOpacity activeOpacity={0.8} onPress={skip}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#1D1D1D',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                STYLES.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.greenLight,
                  width: 12,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={STYLES.btn}
                onPress={() => navigation.replace('LoginScreen')}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
                  INGRESAR
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <TouchableOpacity activeOpacity={0.8} onPress={goToBackSlide}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#1D1D1D',
                  }}>
                  Prev
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#1D1D1D',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Header />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.7}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => (
          <Slide style={{alignItems: 'center'}} item={item} />
        )}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
