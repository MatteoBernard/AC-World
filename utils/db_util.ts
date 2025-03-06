import * as SQLite from 'expo-sqlite';
import Villager from "@/types/Villager";
import {SQLiteDatabase} from "expo-sqlite";

const getConnection = async (): Promise<SQLiteDatabase> => {
    return SQLite.openDatabaseSync('ac-wiki.db');
}

const closeConnection = async (db: SQLiteDatabase) => {
    await db.closeAsync();
}

const mapRowsToVillagers = (rows: any[]): Villager[] => {
    return rows.map((row: any) => ({
        id: row.id,
        nom: row.nom,
        espece: row.espece,
        personnalite: row.personnalite,
        anniversaire: row.anniversaire,
        phrases: row.phrases,
        image: row.image,
        sexe: row.sexe,
        apparitions: row.apparitions,
        dateMaj: row.date_maj,
        signeAstro: row.signeAstro,
    }));
}

export const getVillagers = async (): Promise<Villager[]> => {
    console.log("getVillagers");
    try {
        const db = await getConnection();
        const result = await db.getAllAsync('SELECT * FROM villagers_fr');
        const villagers: Villager[] = mapRowsToVillagers(result);
        return villagers;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getVillagersByEspeces = async (especes: string[]): Promise<Villager[]> => {
    console.log("getVillagersByEspeces");
    try {
        const db = await getConnection();
        const placeholders = especes.map(() => '?').join(',');
        const query = `SELECT * FROM villagers_fr WHERE espece IN (${placeholders})`;
        const result = await db.getAllAsync(query, especes);
        const villagers: Villager[] = mapRowsToVillagers(result);
        return villagers;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getRandomVillager = async (): Promise<Villager | null> => {
    console.log("getRandomVillager");
    try {
        const db = await getConnection();
        let villager: Villager | null = null;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const result = await db.getAllAsync('SELECT * FROM villagers_fr ORDER BY RANDOM() LIMIT 1');
            const villagers: Villager[] = mapRowsToVillagers(result);
            if (villagers.length > 0 && areFieldsNotEmpty(villagers[0])) {
                villager = villagers[0];
                break;
            }
            attempts++;
        }

        return villager;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getRandomVillagers = async (n: number): Promise<Villager[] | null> => {
    console.log("getRandomVillagers");
    try {
        const db = await getConnection();
        const result = await db.getAllAsync(`SELECT * FROM villagers_fr ORDER BY RANDOM() LIMIT ${n}`);
        const villagers: Villager[] = mapRowsToVillagers(result);
        return villagers;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const areFieldsNotEmpty = (villager: Villager): boolean => {
    return Object.values(villager).every(value => value !== "");
};

export const getAllNames = async (): Promise<string[]> => {
    console.log("getAllNames");
    try {
        const db = await getConnection();
        const result = await db.getAllAsync('SELECT nom FROM villagers_fr');
        return result.map((row: any) => row.nom);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });
};

export const getVillagersByAnniversary = async (date: string): Promise<Villager[]> => {
    console.log("getVillagersByAnniversary");
    try {
        const db = await getConnection();
        const query = 'SELECT * FROM villagers_fr WHERE anniversaire = ?';
        const result = await db.getAllAsync(query, [date]);
        const villagers: Villager[] = mapRowsToVillagers(result);
        return villagers;
    } catch (error) {
        console.log(error);
        return [];
    }
}