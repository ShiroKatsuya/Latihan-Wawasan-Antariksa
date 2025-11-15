import "../global.css"
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-slate-600">
      <Text className="text-xl font-bold text-blue-500 mb-8">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-bold text-black mb-8">
        Welcome to Nativewind!
      </Text>
      
      <TouchableOpacity 
        className="bg-blue-500 px-6 py-3 rounded-lg mb-4"
        onPress={() => navigation.navigate('Camera' as never)}
      >
        <Text className="text-white font-semibold text-lg">
          Buka Kamera
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-blue-500 px-6 py-3 rounded-lg"
        onPress={() => navigation.navigate('Latihan-Wawasan-Antariksa' as never)}
      >
        <Text className="text-white font-semibold text-lg">
          Buka Quiz APP
        </Text>
      </TouchableOpacity>
    </View>
  );
} 