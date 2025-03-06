import AsyncStorage from '@react-native-async-storage/async-storage';

export const tips_util = [
    "N'oubliez pas de parler à vos villageois tous les jours pour maintenir de bonnes relations !",
    "Plantez des arbres et des fleurs pour embellir votre ville et attirer de nouveaux villageois.",
    "Ramassez les mauvaises herbes pour garder votre ville propre.",
    "Visitez les îles mystères pour trouver de nouveaux villageois et des ressources rares.",
    "Participez aux événements saisonniers pour obtenir des objets exclusifs.",
    "Utilisez des outils en or pour une durabilité accrue.",
    "Personnalisez votre maison avec des meubles et des décorations uniques.",
    "Échangez des objets avec vos amis pour compléter votre collection.",
    "Pêchez et attrapez des insectes pour remplir votre musée.",
    "Utilisez des motifs personnalisés pour créer des vêtements et des décorations uniques."
];

const TIP_DATE_KEY = 'tipDate';
const DAILY_TIP_KEY = 'dailyTip';

export const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips_util.length);
    return tips_util[randomIndex];
};

export const getDailyTip = async (today: string) => {
    try {
        const storedDate = await AsyncStorage.getItem(TIP_DATE_KEY);
        const storedTip = await AsyncStorage.getItem(DAILY_TIP_KEY);

        if (storedDate === today && storedTip) {
            return storedTip;
        } else {
            const newTip = getRandomTip();
            await AsyncStorage.setItem(TIP_DATE_KEY, today);
            await AsyncStorage.setItem(DAILY_TIP_KEY, newTip);
            return newTip;
        }
    } catch (error) {
        console.error('Failed to get daily tip', error);
        return getRandomTip();
    }
};