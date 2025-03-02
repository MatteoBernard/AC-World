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