import ACView from "@/components/ACView";
import { useEffect, useState } from "react";
import Villager from "@/types/Villager";
import { getFavoriteVillagers } from "@/utils/favorites_util";
import { FlatList, Modal, StyleSheet, TouchableOpacity } from "react-native";
import VillagerCard from "@/components/VillagerCard";
import ACModalView from "@/components/ACModalView";
import { uiColors } from "@/constants/colors";
import FilterComponent from "@/components/FilterComponent";

const Favorites = () => {
    const [villagers, setVillagers] = useState<Villager[]>([]);
    const [filteredVillagers, setFilteredVillagers] = useState<Villager[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVillager, setSelectedVillager] = useState<Villager | null>(null);

    useEffect(() => {
        const loadFavoriteVillagers = async () => {
            const favorites = await getFavoriteVillagers();
            setVillagers(favorites);
            setFilteredVillagers(favorites);
        };
        loadFavoriteVillagers();
    }, [villagers]);

    const handleCardPress = (villager: Villager) => {
        setSelectedVillager(villager);
        setModalVisible(true);
    };

    const handleFilterChange = (species: string[], query: string) => {
        let filtered = villagers;

        if (species.length > 0) {
            filtered = filtered.filter(villager =>
                species.some(speciesValue => speciesValue.includes(villager.espece))
            );
        }

        if (query) {
            filtered = filtered.filter(villager => villager.nom.toLowerCase().includes(query.toLowerCase()));
        }

        setFilteredVillagers(filtered);
    };

    return (
        <ACView>
            <FilterComponent onFilterChange={handleFilterChange} />
            <FlatList
                data={filteredVillagers}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCardPress(item)}>
                        <VillagerCard villager={item} widthPercent={"20%"} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
            />
            {selectedVillager && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ACView style={styles.modalView}>
                        <ACModalView villager={selectedVillager} closeModal={() => setModalVisible(false)} />
                    </ACView>
                </Modal>
            )}
        </ACView>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: uiColors.card.background,
        borderWidth: 5,
        borderColor: uiColors.card.border,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 10,
    },
});

export default Favorites;