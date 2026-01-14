import React, { useState, useCallback, useMemo } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
    Bell,
    MoveLeft,
    RefreshCcw,
    ShieldCheck,
    TrendingUp,
    Zap,
} from 'lucide-react-native';
import { 
    VictoryArea, 
    VictoryAxis, 
    VictoryChart, 
    VictoryVoronoiContainer 
} from 'victory-native';

const { width } = Dimensions.get('window');

interface GoldDataPoint {
    day: string;
    price: number;
}

// 2. Data Map with Index Signature
const CHART_DATA_MAP: { [key: string]: GoldDataPoint[] } = {
    "1W": [
        { day: '3rd', price: 13800 }, { day: '4th', price: 13950 },
        { day: '5th', price: 13900 }, { day: '6th', price: 14111 },
        { day: '7th', price: 14020 }, { day: '8th', price: 13980 },
        { day: '9th', price: 14048 },
    ],
    "1M": [
        { day: '1st', price: 12500 }, 
        { day: '15th', price: 13500 }, 
        { day: '30th', price: 14048 }
    ],
    "6M": [{ day: 'Aug', price: 11000 }, { day: 'Oct', price: 12800 }, { day: 'Jan', price: 14048 }],
    "1Y": [{ day: 'Q1', price: 10500 }, { day: 'Q2', price: 11500 }, { day: 'Q4', price: 14048 }],
    "3Y": [{ day: '2023', price: 8500 }, { day: '2024', price: 11000 }, { day: '2026', price: 14048 }],
    "5Y": [{ day: '2021', price: 6500 }, { day: '2023', price: 9200 }, { day: '2026', price: 14048 }],
};

export default function GoldPricePage() {
    const router = useRouter();
    const [activeTimeframe, setActiveTimeframe] = useState("1W");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // useMemo helps performance during chart re-renders
    const currentData = useMemo(() => 
        CHART_DATA_MAP[activeTimeframe] || CHART_DATA_MAP["1W"], 
    [activeTimeframe]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Custom Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <MoveLeft color="#d1d5db" size={24} />
                    </TouchableOpacity>
                    <View style={styles.titleStack}>
                        <Text style={styles.headerTitle}>Gold Price</Text>
                        <Text style={styles.headerSubtitle}>LIVE 24K MARKET RATES</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.alertButton}>
                    <Bell color="#a855f7" size={18} />
                    <Text style={styles.alertText}>SET ALERT</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Main Chart Card */}
                <View style={styles.chartCard}>
                    <View style={styles.priceRow}>
                        <View>
                            <Text style={styles.labelText}>LIVE GOLD PRICE</Text>
                            <Text style={styles.priceText}>₹14,048.2/g</Text>
                            <View style={styles.changeRow}>
                                <TrendingUp color="#4ade80" size={16} />
                                <Text style={styles.changeText}>{activeTimeframe} Change 1.8%</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleRefresh}>
                            <RefreshCcw 
                                color="#9ca3af" 
                                size={24} 
                                style={isRefreshing ? { transform: [{ rotate: '45deg' }] } : {}} 
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Chart Section */}
                    <View style={styles.chartContainer}>
                        <VictoryChart
                            width={width - 60}
                            height={250}
                            containerComponent={<VictoryVoronoiContainer />}
                        >
                            <VictoryArea
                                data={currentData}
                                x="day"
                                y="price"
                                style={{
                                    data: { 
                                        fill: "rgba(212, 175, 55, 0.2)", 
                                        stroke: "#d4af37", 
                                        strokeWidth: 3 
                                    }
                                }}
                                animate={{ duration: 500 }}
                            />
                            <VictoryAxis 
                                style={{ 
                                    axis: { stroke: "transparent" }, 
                                    tickLabels: { fill: "#6b7280", fontSize: 10 } 
                                }} 
                            />
                        </VictoryChart>
                    </View>

                    {/* Timeframe Selectors */}
                    <View style={styles.timeframeContainer}>
                        {['1W', '1M', '6M', '1Y', '3Y', '5Y'].map((time) => (
                            <TouchableOpacity
                                key={time}
                                onPress={() => setActiveTimeframe(time)}
                                style={[styles.timeButton, activeTimeframe === time && styles.timeButtonActive]}
                            >
                                <Text style={[styles.timeButtonText, activeTimeframe === time && styles.timeButtonTextActive]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Savings Journey Card */}
                <View style={styles.savingsCard}>
                    <View style={styles.goldBarContainer}>
                        <View style={styles.goldBar}>
                            <Text style={styles.goldBarText}>24K</Text>
                        </View>
                    </View>
                    <Text style={styles.savingsTitle}>Start your{"\n"}savings journey</Text>
                    <Text style={styles.savingsSub}>Prices are trending upwards. Lock in your rate today.</Text>
                    <TouchableOpacity style={styles.saveButton}>
                        <Zap color="#1a003d" size={20} fill="#1a003d" />
                        <Text style={styles.saveButtonText}>SAVE NOW</Text>
                    </TouchableOpacity>
                </View>

                {/* Badges */}
                <View style={styles.badgeGrid}>
                    {[
                        { icon: ShieldCheck, color: "#4ade80", text: "100% SAFE & SECURE" },
                        { icon: TrendingUp, color: "#a855f7", text: "24K GOLD SAVINGS" },
                        { icon: RefreshCcw, color: "#60a5fa", text: "WITHDRAW ANYTIME" }
                    ].map((badge, idx) => (
                        <View key={idx} style={styles.badge}>
                            <badge.icon color={badge.color} size={20} />
                            <Text style={styles.badgeText}>{badge.text}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a003d' },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)'
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    iconButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
    titleStack: { marginLeft: 12 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: '900' },
    headerSubtitle: { color: '#a855f7', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    alertButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        paddingHorizontal: 12, 
        paddingVertical: 8, 
        borderRadius: 12 
    },
    alertText: { color: 'white', fontSize: 10, fontWeight: 'bold', marginLeft: 6 },
    scrollContent: { padding: 20 },
    chartCard: { 
        backgroundColor: '#240056', 
        borderRadius: 32, 
        padding: 24, 
        borderWidth: 1, 
        borderColor: 'rgba(255,255,255,0.1)' 
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    labelText: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    priceText: { color: 'white', fontSize: 32, fontWeight: '900', fontStyle: 'italic', marginVertical: 4 },
    changeRow: { flexDirection: 'row', alignItems: 'center' },
    changeText: { color: '#4ade80', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
    chartContainer: { height: 220, alignItems: 'center', justifyContent: 'center' },
    timeframeContainer: { 
        flexDirection: 'row', 
        backgroundColor: '#1a003d', 
        borderRadius: 16, 
        padding: 4, 
        marginTop: 20 
    },
    timeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
    timeButtonActive: { backgroundColor: '#9333ea' },
    timeButtonText: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
    timeButtonTextActive: { color: 'white' },
    savingsCard: { 
        backgroundColor: '#4c1d95', 
        borderRadius: 32, 
        padding: 30, 
        marginTop: 20,
        overflow: 'hidden'
    },
    goldBarContainer: {
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    goldBar: { 
        width: 80, 
        height: 45, 
        backgroundColor: '#eab308', 
        borderRadius: 8, 
        transform: [{ rotate: '-15deg' }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    goldBarText: { color: '#1a003d', fontSize: 20, fontWeight: '900' },
    savingsTitle: { color: 'white', fontSize: 24, fontWeight: '900', lineHeight: 28 },
    savingsSub: { color: 'rgba(233, 213, 255, 0.7)', fontSize: 14, marginVertical: 12 },
    saveButton: { 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 16, 
        borderRadius: 16, 
        marginTop: 10 
    },
    saveButtonText: { color: '#1a003d', fontWeight: '900', marginLeft: 8 },
    badgeGrid: { marginTop: 20 },
    badge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        padding: 16, 
        borderRadius: 16, 
        marginBottom: 10 
    },
    badgeText: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', marginLeft: 12 }
});