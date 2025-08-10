import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    Image
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

// Import quiz data from JSON file
import quizData from '../assets/soal/soal_gerhana.json';

const { width, height } = Dimensions.get('window');

// TypeScript interfaces
interface QuizItem {
    no: number;
    soal: string;
    pilihan: string[];
    jawaban: string;
}

interface Answer {
    letter: string;
    text: string;
    correct: boolean;
}

interface QuizQuestion {
    id: number;
    question: string;
    answers: Answer[];
}

// Transform JSON data to match the expected quiz format
const quizQuestions: QuizQuestion[] = quizData.map((item: QuizItem) => ({
    id: item.no,
    question: item.soal,
    answers: item.pilihan.map((pilihan: string, index: number) => ({
        letter: String.fromCharCode(65 + index), // A, B, C, D
        text: pilihan,
        correct: String.fromCharCode(65 + index) === item.jawaban
    }))
}));

export default function Quiz_Gerhana() {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(900); // 5 minutes in seconds (60 seconds per question)
    const [score, setScore] = useState(0);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

    // Removed all Reanimated values

    // Timer animation
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // When timer expires, show score modal immediately
                    showScoreModalAnimation();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    // Removed Reanimated mount effects

    // Removed Reanimated question change effects

    // Removed all Reanimated animated styles

    const handleAnswerSelect = (index: number) => {
        if (isAnswerSubmitted) return;
        
        setSelectedAnswer(index);
        // Button press effect removed (Reanimated)
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        
        setIsAnswerSubmitted(true);
        // Button submit effect removed (Reanimated)

        // Check if answer is correct
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const selectedAnswerData = currentQuestion.answers[selectedAnswer];
        
        if (selectedAnswerData.correct) {
            setScore(prev => prev + 1);
        }

        // Mark question as answered
        setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));

        // Wait a moment then move to next question or show results
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
            } else {
                // Show score modal
                showScoreModalAnimation();
            }
        }, 1500);
    };

    const showScoreModalAnimation = () => {
        // If timer expired and there are unanswered questions, mark them as incorrect
        if (timeLeft === 0 && answeredQuestions.size < quizQuestions.length) {
            // Mark all unanswered questions as answered (incorrect)
            const unansweredQuestions = new Set<number>();
            for (let i = 0; i < quizQuestions.length; i++) {
                if (!answeredQuestions.has(i)) {
                    unansweredQuestions.add(i);
                }
            }
            setAnsweredQuestions(prev => new Set([...prev, ...unansweredQuestions]));
        }
        
        setShowScoreModal(true);
    };

    const hideScoreModal = () => {
        setShowScoreModal(false);
        navigation.navigate('Quiz_APP' as never);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle="light-content" backgroundColor="#1A263A" />
            
            {/* Background Gradient */}
            <LinearGradient
                colors={['#1A263A', '#2D3748', '#1A263A']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Header */}
                <View className='flex-row items-center justify-between p-6 mt-10'>
                    <View className='flex-row items-center'>
                        <LinearGradient
                            colors={['#FF6B35', '#FF8E53']}
                            className='w-12 h-12 rounded-full items-center justify-center mr-3'
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                        <Image
                                source={require('../assets/solar-system.png')}
                                style={{ width: 32, height: 32, tintColor: 'white' }}
                            />
                        </LinearGradient>
                        <Text className='text-white text-2xl font-bold'>Quiz Tata Surya</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className=' bg-white/10 rounded-full items-center justify-center '
                    >
                        <Text className='text-white text-xl font-bold p-2'>❌</Text>
                    </TouchableOpacity>
                </View>

                {/* Quiz Info with Timer Progress */}
                <View className='mx-6 mt-4'>
                    <View className='flex-row justify-between items-center mb-3'>
                        <Text className='text-white/80 text-lg font-semibold'>Quiz : {totalQuestions}</Text>
                        <Text className='text-white/80 text-lg font-semibold'>{formatTime(timeLeft)}</Text>
                    </View>
                    
                    {/* Timer Progress Bar (manual, no animation) */}
                    <View className='h-2 bg-white/20 rounded-full overflow-hidden'>
                        <View 
                            style={{
                                height: '100%',
                                backgroundColor: '#FF6B35',
                                borderRadius: 8,
                                width: `${(timeLeft / 900) * 100}%`
                            }}
                        />
                    </View>
                    
                    {/* Question Counter */}
                    <View className='mt-3'>
                        <Text className='text-white/80 text-base text-center'>
                            Working on question {currentQuestionIndex + 1} of {totalQuestions} questions
                        </Text>
                    </View>
                </View>

                {/* Question */}
                <ScrollView className='flex-1 px-6 mt-6' showsVerticalScrollIndicator={false}>
                    <View className='mb-8'>
                        <View className='bg-white/10 rounded-2xl p-6 shadow-lg'>
                            <Text className='text-white text-xl font-semibold leading-7'>
                                {currentQuestion.id}. {currentQuestion.question}
                            </Text>
                        </View>
                    </View>

                    {/* Answer Options */}
                    {currentQuestion.answers.map((answer: Answer, index: number) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = answer.correct;
                        const showResult = isAnswerSubmitted;
                        
                        let backgroundColor = 'bg-white/10';
                        let borderColor = 'border-transparent';
                        let textColor = 'text-white';
                        let letterBg = 'bg-orange-500';
                        let letterTextColor = 'text-white';

                        if (isSelected && showResult) {
                            if (isCorrect) {
                                backgroundColor = 'bg-green-500/20';
                                borderColor = 'border-green-400';
                                letterBg = 'bg-green-500';
                            } else {
                                backgroundColor = 'bg-red-500/20';
                                borderColor = 'border-red-400';
                                letterBg = 'bg-red-500';
                            }
                        } else if (isSelected) {
                            backgroundColor = 'bg-orange-500/20';
                            borderColor = 'border-orange-400';
                            letterBg = 'bg-orange-500';
                        }

                        return (
                            <View 
                                key={index}
                                className={`mb-4 rounded-2xl border-2 ${backgroundColor} ${borderColor} shadow-lg`}
                            >
                                <TouchableOpacity 
                                    onPress={() => handleAnswerSelect(index)}
                                    className='p-5 flex-row items-center'
                                    disabled={isAnswerSubmitted}
                                >
                                    <LinearGradient
                                        colors={letterBg === 'bg-orange-500' ? ['#FF6B35', '#FF8E53'] : 
                                               letterBg === 'bg-green-500' ? ['#10B981', '#34D399'] :
                                               ['#EF4444', '#F87171']}
                                        className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${letterBg}`}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text className={`font-bold text-lg ${letterTextColor}`}>
                                            {answer.letter}
                                        </Text>
                                    </LinearGradient>
                                    
                                    <Text className={`text-lg font-medium flex-1 ${textColor}`}>
                                        {answer.text}
                                    </Text>

                                    {showResult && isSelected && (
                                        <View className={`w-8 h-8 rounded-full items-center justify-center ${
                                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                            <Text className='text-white font-bold text-lg'>
                                                {isCorrect ? '✓' : '✗'}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Submit Button */}
                <View className='p-6'>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        disabled={selectedAnswer === null || isAnswerSubmitted}
                        className={`rounded-2xl shadow-lg ${
                            selectedAnswer === null || isAnswerSubmitted 
                                ? 'bg-gray-500' 
                                : 'bg-gradient-to-r from-orange-400 to-orange-500'
                        }`}
                    >
                        <LinearGradient
                            colors={selectedAnswer === null || isAnswerSubmitted 
                                ? ['#6B7280', '#9CA3AF'] 
                                : ['#FF6B35', '#FF8E53']}
                            className='p-5 rounded-2xl'
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text className='text-white text-xl font-bold text-center'>
                                {isAnswerSubmitted ? 'ANSWERED' : 'SUBMIT'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Score Modal */}
            <Modal
                visible={showScoreModal}
                transparent={true}
                animationType="none"
                onRequestClose={hideScoreModal}
            >
                <View className='flex-1 bg-black/50 justify-center items-center'>
                    <View 
                        className='bg-gray-100 rounded-3xl mx-6 p-8 shadow-2xl'
                    >
                        {/* Trophy Icon with Confetti */}
                        <View className='items-center mb-6'>
                            <View className='relative'>
                                {/* Confetti */}
                                <View className='absolute -top-2 -left-2 w-6 h-6 bg-blue-400 rounded-full opacity-60' />
                                <View className='absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-60' />
                                <View className='absolute -bottom-1 -left-1 w-5 h-5 bg-pink-400 rounded-full opacity-60' />
                                <View className='absolute -bottom-2 -right-2 w-3 h-3 bg-green-400 rounded-full opacity-60' />
                                
                                {/* Trophy */}
                                <View className='w-20 h-20 bg-yellow-400 rounded-full items-center justify-center'>
                                    <Text className='text-4xl'>🏆</Text>
                                </View>
                            </View>
                        </View>

                        {/* Congrats Text */}
                        <Text className='text-black text-2xl font-bold text-center mb-2'>
                            Congrats!
                        </Text>

                        {/* Score */}
                        <Text className='text-green-500 text-4xl font-bold text-center mb-2'>
                            {percentage}% Score
                        </Text>

                        {/* Success Message */}
                        <Text className='text-black text-lg text-center mb-4'>
                            Quiz completed successfully.
                        </Text>

                        {/* Score Breakdown */}
                        <Text className='text-black text-base text-center mb-6 leading-6'>
                            You attempt <Text className='text-blue-600 font-bold'>{totalQuestions} questions</Text> and from that <Text className='text-blue-600 font-bold'>{score} answer</Text> is correct.
                        </Text>

                        {/* Share Section */}
                        {/*
                        <View className='flex-row items-center justify-between'>
                            <Text className='text-black text-base'>
                                Share with us:
                            </Text>
                            <View className='flex-row space-x-4'>
                       
                                <TouchableOpacity className='w-8 h-8 bg-gray-300 rounded-full items-center justify-center'>
                                    <Text className='text-gray-600 text-sm'>📷</Text>
                                </TouchableOpacity>
                                
             
                                <TouchableOpacity className='w-8 h-8 bg-gray-300 rounded-full items-center justify-center'>
                                    <Text className='text-gray-600 text-sm font-bold'>f</Text>
                                </TouchableOpacity>
                                
    
                                <TouchableOpacity className='w-8 h-8 bg-gray-300 rounded-full items-center justify-center'>
                                    <Text className='text-gray-600 text-sm'>💬</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        */}

                        {/* Close Button */}
                        <TouchableOpacity 
                            onPress={hideScoreModal}
                            className='absolute top-4 right-4 w-8 h-8 items-center justify-center'
                        >
                            <Text className='text-gray-500 text-xl font-bold'>×</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}