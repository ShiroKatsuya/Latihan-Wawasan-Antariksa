
import { 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import StarsBackground from '../components/StarsBackground';



interface QuizCategory {
  id: string;
  title: string;
  imageSource: any;
  isLocked?: boolean;
}

const quizCategories: QuizCategory[] = [
  { id: '1', title: 'Scan', imageSource: require('../assets/camera.png') },
  { id: '2', title: 'Quiz Tata Surya', imageSource: require('../assets/solar-system.png') },
  { id: '3', title: 'Quiz Gerhana', imageSource: require('../assets/eclipse.png') },
];

export default function QuizApp() {
  const navigation = useNavigation();

  return (
    //Stars Background
    <SafeAreaView className="flex-1 ">
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      <StarsBackground/>
      {/* Header */}
      <View className="flex-row items-center justify-between ">

        
        <View className="flex-1 items-center justify-center pb-10 mt-10">
          <Image 
            source={require('../assets/logo.png')} 
            style={{ 
                
            }} 
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 mb-20 mx-4" showsVerticalScrollIndicator={false}>
        {/* Statistics Section */}

        {/* Quiz Categories */}
        <View className="space-y-3 ">
          {quizCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`bg-slate-700 rounded-lg p-4 flex-row items-center mb-9 ${
                category.isLocked ? 'opacity-60' : ''
              }`}
              disabled={category.isLocked}
              onPress={
                category.title === 'Quiz Tata Surya'
                  ? () => navigation.navigate('Quiz_TataSurya' as never)
                  : category.title === 'Quiz Gerhana'
                  ? () => navigation.navigate('Quiz_Gerhana' as never)
                  :category.title === 'Scan'
                  ? () => navigation.navigate('Scan' as never)
                  : undefined
              }
            >
              <View className="bg-orange-500 rounded-lg p-2 mr-4">
                <Image 
                  source={category.imageSource} 
                  style={{ width: 24, height: 24, tintColor: 'white' }}
                />
              </View>
              
              <Text className="text-white text-lg flex-1">
                {category.title}
              </Text>
              
              {category.isLocked && (
                <Image 
                  source={require('../assets/icon.png')} 
                  style={{ width: 20, height: 20, tintColor: 'white' }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer for bottom padding */}
        <View className="h-20" />
      </ScrollView>

      {/* Upgrade Button */}
      
    </SafeAreaView>
  );
} 