import AsyncStorage from '@react-native-async-storage/async-storage';
import Villager from "@/types/Villager";

const FAVORITES_KEY = 'favoriteVillagers';

export const getFavoriteVillagers = async (): Promise<Villager[]> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Failed to load favorite villagers', error);
        return [];
    }
};

export const addFavoriteVillager = async (villager: Villager): Promise<void> => {
    try {
        const favorites = await getFavoriteVillagers();
        if (!favorites.find(fav => fav.id === villager.id)) {
            favorites.push(villager);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    } catch (error) {
        console.error('Failed to add favorite villager', error);
    }
};

export const removeFavoriteVillager = async (villagerId: number): Promise<void> => {
    try {
        let favorites = await getFavoriteVillagers();
        favorites = favorites.filter(fav => fav.id !== villagerId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Failed to remove favorite villager', error);
    }
};

export const isFavoriteVillager = async (villagerId: number): Promise<boolean> => {
    try {
        const favorites = await getFavoriteVillagers();
        return favorites.some(fav => fav.id === villagerId);
    } catch (error) {
        console.error('Failed to check if villager is favorite', error);
        return false;
    }
};