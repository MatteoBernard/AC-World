import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { textColors, uiColors } from "@/constants/colors";

export type CardType = {
    id: number;
    image: string;
    matched: boolean;
};

const MemoCard: React.FC<{ card: CardType, onClick: () => void, flipped: boolean }> = ({ card, onClick, flipped }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onClick}
            disabled={!imageLoaded || card.matched}
        >
            <View style={styles.cardContainer}>
                <Image
                    style={styles.image}
                    source={flipped || card.matched ? { uri: card.image } : require('@/assets/images/leaf2.png')}
                    onLoad={() => setImageLoaded(true)}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 5 - 10,
        height: Dimensions.get('window').width / 5 - 10,
        margin: 5,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: uiColors.card.border,
        backgroundColor: uiColors.card.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardContainer: {
        flex: 1,
        padding: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default MemoCard;