import ACView from "@/components/ACView";
import {getVillagers} from "@/utils/db_util";
import {useEffect, useState} from "react";
import Villager from "@/types/Villager";
import VillagerCard from "@/components/VillagerCard";
import {FlatList, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import ACText from "@/components/ACText";
import ACModalView from "@/components/ACModalView";
import {uiColors} from "@/constants/colors";

const Wiki = () => {

    const [villagers, setVillagers] = useState<Villager[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVillager, setSelectedVillager] = useState<Villager | null>(null);


    useEffect(() => {
        getVillagers().then((villagers) => {
            setVillagers(villagers.slice(0, 30));
        });
    }, []);

    const handleCardPress = (villager: Villager) => {
        setSelectedVillager(villager);
        setModalVisible(true);
    };

    return (
        <ACView>
            <FlatList
                data={villagers}
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
    )
}

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

export default Wiki;