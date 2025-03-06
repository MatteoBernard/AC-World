import { useState, useEffect } from "react";
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import ACText from "@/components/ACText";
import ACView from "@/components/ACView";
import { getRandomVillager, getVillagers } from "@/utils/db_util";
import Villager from "@/types/Villager";
import {functionalColors, textColors, uiColors} from "@/constants/colors";

const ACDle = () => {
    const [targetVillager, setTargetVillager] = useState<Villager | null>(null);
    const [guesses, setGuesses] = useState<Villager[]>([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [allVillagers, setAllVillagers] = useState<Villager[]>([]);
    const [filteredNames, setFilteredNames] = useState<{ nom: string; villager: Villager }[]>([]);

    useEffect(() => {
        getVillagers().then(setAllVillagers);
    }, []);

    const startGame = async () => {
        let villager;
        do {
            villager = await getRandomVillager();
        } while (villager != null && villager.personnalite.includes("("));
        console.log(villager?.nom);
        setTargetVillager(villager);
        setGuesses([]);
        setCurrentGuess("");
        setGameOver(false);
    };

    const handleAutocompleteSelect = (villager: Villager) => {
        if (guesses.some(guess => guess.nom === villager.nom)) {
            return;
        }
        setCurrentGuess(villager.nom);
        setGuesses([...guesses, villager]);
        if (villager.nom.toLowerCase() === targetVillager?.nom.toLowerCase()) {
            setGameOver(true);
        }
        setCurrentGuess("");
        setFilteredNames([]);
    };

    const renderGuess = ({ item }: { item: Villager }) => {
        if (!targetVillager) return null;

        const getColor = (field: keyof Villager) => {
            if (typeof item[field] === 'string' && typeof targetVillager[field] === 'string') {
                return item[field].includes(targetVillager[field]) ? functionalColors.success : functionalColors.error;
            }
            return item[field] === targetVillager[field] ? functionalColors.success : functionalColors.error;
        };

        return (
            <View style={styles.guessRowsContainer}>
                <View style={[styles.rowImageContainer, {backgroundColor: getColor("nom")}]}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.rowImage}
                    />
                </View>
                <View style={[styles.rowTextContainer, { backgroundColor: getColor("nom")}]}>
                    <ACText style={styles.rowText}>{item.nom}</ACText>
                </View>
                <View style={[styles.rowTextContainer, { backgroundColor: getColor("sexe")}]}>
                    <ACText style={styles.rowText}>{item.sexe}</ACText>
                </View>
                <View style={[styles.rowTextContainer, { backgroundColor: getColor("personnalite")}]}>
                    <ACText style={styles.rowText}>{item.personnalite}</ACText>
                </View>
                <View style={[styles.rowTextContainer, { backgroundColor: getColor("espece")}]}>
                    <ACText style={styles.rowText}>{item.espece}</ACText>
                </View>
            </View>
        );
    };

    const findVillager = (query: string) => {
        if (query === "") {
            setFilteredNames([]);
        } else {
            const regex = new RegExp(`${query.trim()}`, "i");
            setFilteredNames(allVillagers
                .filter(v => regex.test(v.nom))
                .map(v => ({ nom: v.nom, villager: v }))
            );
        }
        setCurrentGuess(query);
    };

    return (
        <ACView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={gameOver && targetVillager ? { uri: targetVillager.image } : require('@/assets/images/leaf2.png')}
                    style={styles.image}
                />
            </View>

            {targetVillager && !gameOver && (
                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        data={filteredNames}
                        defaultValue={currentGuess}
                        onChangeText={findVillager}
                        placeholder="Entrez un villageois"
                        flatListProps={{
                            keyExtractor: (_, idx) => idx.toString(),
                            renderItem: ({ item }) => (
                                <TouchableOpacity onPress={() => handleAutocompleteSelect(item.villager)}>
                                    <View style={styles.autocompleteRow}>
                                        <View style={styles.autoCompleteImageContainer}>
                                            <Image
                                                source={{ uri: item.villager.image } }
                                                style={styles.autoCompleteImage}
                                            />
                                        </View>
                                        <ACText>{item.nom}</ACText>
                                    </View>
                                </TouchableOpacity>
                            ),
                        }}
                        inputContainerStyle={styles.inputContainer}
                        listContainerStyle={styles.listContainer}
                        style={styles.input}
                        editable={true}
                    />
                </View>
            )}

            {!targetVillager ?(
                <View style={styles.startContainer}>
                    <ACText style={styles.guessLabel}>ACDle : Devinez le villageois !</ACText>
                    <TouchableOpacity onPress={startGame}>
                        <ACText style={styles.start}>Commencer la partie</ACText>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {guesses.map(villager =>
                            renderGuess({ item: villager })
                        )}
                    </ScrollView>
                </ScrollView>
            )}

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <ACText style={styles.finishLabel}>Bien joué ! Vous avez trouvé le villageois !</ACText>
                    <TouchableOpacity onPress={startGame} style={styles.restartButton}>
                        <ACText style={styles.restartButtonText}>Recommencer la partie</ACText>
                    </TouchableOpacity>
                </View>
            )}
        </ACView>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    imageContainer: {
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: uiColors.card.border,
        borderRadius: 10,
        backgroundColor: uiColors.card.background,
        padding: 10,
        resizeMode: 'contain'
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        padding: 10,
        resizeMode: "contain"
    },
    autocompleteContainer: {
        height: 100
    },
    autocompleteRow: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    autoCompleteImageContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: uiColors.card.border,
        backgroundColor: textColors.light,
        padding: 2
    },
    autoCompleteImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    inputContainer: {
        width: "85%",
        alignSelf: 'center',
        margin: 20,
        borderColor: uiColors.card.border,
        borderRadius: 10,
        borderWidth: 5,
    },
    listContainer: {
        width: "85%",
        alignSelf: "center",
        zIndex: 1000,
    },
    input: {
        fontFamily: 'FinkHeavy',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        width: "85%",
        alignSelf: "center"
    },
    guessRowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap: 5
    },
    rowImageContainer: {
        width: "20%",
        height: "auto",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    rowImage: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        alignSelf: "center"
    },
    rowTextContainer: {
        width: "20%",
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    rowText: {
        textAlign: "center",
        color: textColors.light,
        fontSize: 12
    },
    startContainer: {
        paddingVertical: 75,
        gap: 10
    },
    guessLabel: {
        fontSize: 22,
        alignSelf: 'center'
    },
    start: {
        alignSelf: 'center',
        fontSize: 18,
        backgroundColor: textColors.light,
        padding: 15,
        borderRadius: 10,
        borderColor: uiColors.card.border,
        borderWidth: 5
    },
    gameOverContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    finishLabel: {
        fontSize: 16,
        margin: 10
    },
    restartButton: {
        backgroundColor: textColors.light,
        padding: 10,
        borderRadius: 10,
        borderColor: uiColors.card.border,
        borderWidth: 5
    },
    restartButtonText: {
        fontSize: 14,
    }
});

export default ACDle;