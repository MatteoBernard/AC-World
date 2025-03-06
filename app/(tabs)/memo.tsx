import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getRandomVillagers } from '@/utils/db_util';
import ACView from "@/components/ACView";
import ACText from "@/components/ACText";
import {textColors, uiColors} from "@/constants/colors";
import MemoCard, {CardType} from "@/components/MemoCard";

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const MemoGame = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [disabled, setDisabled] = useState(false);

    const start = async () => {
        const villagers = await getRandomVillagers(12);
        if (villagers) {
            const villagerImages = villagers.map(villager => villager.image);
            const images = [...villagerImages, ...villagerImages];
            const shuffledCards = shuffleArray(images.map((image, index) => ({ id: index, image, matched: false })));
            setCards(shuffledCards);
            setFlippedCards([]);
        }
    };

    useEffect(() => {
        start();
    }, []);

    const handleCardClick = (index: number) => {
        if (disabled) return;
        if (flippedCards.length === 0) {
            setFlippedCards([index]);
        } else if (flippedCards.length === 1) {
            const firstIndex = flippedCards[0];
            const secondIndex = index;
            if (cards[firstIndex].image === cards[secondIndex].image) {
                const newCards = cards.map((card, i) => {
                    if (i === firstIndex || i === secondIndex) {
                        return { ...card, matched: true };
                    }
                    return card;
                });
                setCards(newCards);
                setFlippedCards([]);
            } else {
                setFlippedCards([firstIndex, secondIndex]);
                setDisabled(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    const hasWon = cards.length > 0 && cards.every(card => card.matched);

    return (
        <ACView style={styles.container}>
            <View style={styles.cardsGrid}>
                {cards.map((card, index) => (
                    <MemoCard
                        key={index}
                        card={card}
                        onClick={() => handleCardClick(index)}
                        flipped={flippedCards.includes(index) || card.matched}
                    />
                ))}
            </View>
            {hasWon && (
                <View style={styles.restartContainer}>
                    <ACText style={styles.restartLabel}>Bien joué ! Vous avez trouvé tous les villageois !</ACText>
                    <TouchableOpacity onPress={start} style={styles.restartButton}>
                        <ACText style={styles.restartButtonText}>Relancer la partie</ACText>
                    </TouchableOpacity>
                </View>
            )}
        </ACView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: Dimensions.get('window').width - 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    restartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    restartLabel: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        color: textColors.primary
    },
    restartButton: {
        backgroundColor: textColors.light,
        padding: 10,
        borderRadius: 10,
        borderColor: uiColors.card.border,
        borderWidth: 5,
    },
    restartButtonText: {
        color: textColors.primary
    }
});

export default MemoGame;