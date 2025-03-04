import { useState, useEffect } from "react";
import { getFavoriteVillagers, addFavoriteVillager, removeFavoriteVillager, isFavoriteVillager } from "@/utils/favorites_util";
import Villager from "@/types/Villager";
import ACView from "@/components/ACView";
import ACText from "@/components/ACText";
import { Image, StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { textColors, uiColors } from "@/constants/colors";

interface ACModalViewProps {
    villager: Villager;
    closeModal: () => void;
}

const ACModalView = (props: ACModalViewProps) => {
    const screenHeight = Dimensions.get('window').height;
    const imageHeight = screenHeight / 4;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const favoriteStatus = await isFavoriteVillager(props.villager.id);
            setIsFavorite(favoriteStatus);
        };
        checkFavoriteStatus();
    }, [props.villager.id]);

    const handleFavoritePress = async () => {
        if (isFavorite) {
            await removeFavoriteVillager(props.villager.id);
        } else {
            await addFavoriteVillager(props.villager);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <ACView>
            <ACText style={styles.title}>{props.villager.nom}</ACText>
            <Image
                source={{ uri: props.villager.image }}
                style={[styles.image, { height: imageHeight }]}
                resizeMode="contain"
            />
            <View style={styles.detailsContainer}>
                <ACText style={styles.detailRow}>
                    {props.villager.espece} - {props.villager.sexe}
                </ACText>
                <ACText style={styles.detailRow}>
                    Personnalité : {props.villager.personnalite}
                </ACText>
                <ACText style={styles.detailRow}>
                    {props.villager.sexe === 'Mâle' ? 'Né le' : 'Née le'} {props.villager.anniversaire} - {props.villager.signeAstro}
                </ACText>
                <ACText style={styles.detailRow}>
                    {props.villager.phrases.includes(",") ? 'Phrases :' : 'Phrase :'} {props.villager.phrases}
                </ACText>
                <ACText style={styles.detailRow}>
                    {props.villager.apparitions.includes(",") ? 'Apparitions : ' : 'Apparition'} <Text style={{ fontSize: 12 }}>{props.villager.apparitions}</Text>
                </ACText>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={props.closeModal} style={styles.button}>
                    <Image
                        style={styles.buttonImage}
                        resizeMode="contain"
                        source={require('@/assets/images/back.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoritePress} style={styles.button}>
                    <Image
                        style={styles.buttonImage}
                        resizeMode="contain"
                        source={isFavorite ? require('@/assets/images/cross.png') : require('@/assets/images/heart.png')}
                    />
                </TouchableOpacity>
            </View>
        </ACView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: textColors.light,
        padding: 10,
        color: textColors.primary,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: uiColors.card.border,
    },
    image: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: textColors.light,
        padding: 15,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: uiColors.card.border,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: textColors.primary,
        fontSize: 16,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: textColors.light,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: uiColors.card.border,
    },
    buttonImage: {
        width: 30,
        height: 30,
    }
});

export default ACModalView;