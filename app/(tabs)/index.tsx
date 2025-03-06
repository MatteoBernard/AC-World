import ACText from "@/components/ACText";
import ACView from "@/components/ACView";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {primaryColors, textColors} from "@/constants/colors";
import {formatDate, getVillagersByAnniversary} from "@/utils/db_util";
import {useEffect, useState} from "react";
import Villager from "@/types/Villager";
import {getDailyTip} from "@/utils/tips_util";
import { Linking } from 'react-native';

const Home = () => {
    const [anniversaries, setAnniversaries] = useState<Villager[]>([]);
    const [dailyTip, setDailyTip] = useState<string>('');

    const today = formatDate(new Date());

    useEffect(() => {
        getVillagersByAnniversary(today).then(setAnniversaries);
        getDailyTip(today).then(setDailyTip);
    }, [today]);

    return (
        <ACView>
            <ScrollView>
                <View style={styles.dashboardContainer}>
                    <ACText style={styles.dashboardTitle}>Bienvenue en ville !</ACText>

                    <ACText style={styles.dashboardLabel}>Annonces ({today})</ACText>
                    {anniversaries && anniversaries.length > 0 ? (
                        anniversaries.map((villager) => (
                            <ACText key={villager.id} style={styles.dashboardLine}>☆ C'est l'anniversaire de {villager.nom} !</ACText>
                        ))
                    ) : (
                        <ACText style={styles.dashboardLabel}>Pas d'annonces pour aujourd'hui.. ({today})</ACText>
                    )}
                    <ACText style={styles.dashboardLabel}>S'amuser en ville</ACText>
                    <ACText style={styles.dashboardLine}>☆ Consultez les informations sur les villageois et ajoutez les à vos favoris ♡</ACText>
                    <ACText style={styles.dashboardLine}>☆ Jouez aux jeux ACDle et Memo !</ACText>

                    <ACText style={styles.dashboardLabel}>Divers</ACText>
                    <ACText style={styles.dashboardLine}>☆ Une connexion Internet est requise pour afficher les images !</ACText>
                    <ACText style={[styles.dashboardLine, {textDecorationLine: "underline"}]} onPress={() => {Linking.openURL('https://github.com/MatteoBernard/AC-World')}}>☆ Voici le lien du projet, n'hésitez pas à aller faire un tour ♡</ACText>

                    <ACText style={styles.dashboardLabel}>Conseils du jour</ACText>
                    <ACText style={styles.dashboardLine}>☆ {dailyTip}</ACText>
                </View>

            </ScrollView>
        </ACView>
    );
}

const styles = StyleSheet.create({
    dashboardContainer: {
        borderColor: primaryColors.wood,
        borderRadius: 10,
        borderWidth: 15,
        backgroundColor: primaryColors.woodLight,
        padding: 10,
        gap: 5
    },
    dashboardTitle: {
        padding: 10,
        color: textColors.light,
        alignSelf: "center",
        fontSize: 24,
        borderBottomWidth: 2,
        borderBottomColor: textColors.light,
        paddingBottom: 5
    },
    dashboardLabel: {
        fontSize: 20,
        marginTop: 20,
        color: textColors.light
    },
    dashboardLine: {
        fontSize: 16,
        paddingLeft: 10,
        color: textColors.light
    },
});

export default Home;