import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {primaryColors, textColors, uiColors} from "@/constants/colors";
import MultiSelect from "react-native-multiple-select";

interface FilterComponentProps {
    onFilterChange: (species: string[], query: string) => void;
}

const speciesValues = [
    { key: "Aigle", values: ["Aigle"] },
    { key: "Autruche", values: ["Autruche"] },
    { key: "Canard", values: ["Canard"] },
    { key: "Cerf / Biche", values: ["Cerf", "Biche"] },
    { key: "Chat", values: ["Chat"] },
    { key: "Cheval", values: ["Cheval"] },
    { key: "Chèvre", values: ["Chèvre"] },
    { key: "Chien / Chienne", values: ["Chien", "Chienne"] },
    { key: "Cochon", values: ["Cochon"] },
    { key: "Coq / Poule", values: ["Coq", "Poule"] },
    { key: "Crocodile", values: ["Crocodile"] },
    { key: "Écureuil", values: ["Écureuil"] },
    { key: "Éléphant", values: ["Éléphant"] },
    { key: "Fourmilier / Fourmilière", values: ["Fourmilier", "Fourmilière"] },
    { key: "Gorille", values: ["Gorille"] },
    { key: "Grenouille", values: ["Grenouille"] },
    { key: "Hamster", values: ["Hamster"] },
    { key: "Hippopotame", values: ["Hippopotame"] },
    { key: "Kangourou", values: ["Kangourou"] },
    { key: "Koala", values: ["Koala"] },
    { key: "Lapin / Lapine", values: ["Lapin", "Lapine"] },
    { key: "Lion", values: ["Lion"] },
    { key: "Loup / Louve", values: ["Loup", "Louve"] },
    { key: "Mouton / Brebis", values: ["Mouton", "Brebis"] },
    { key: "Oiseau", values: ["Oiseau"] },
    { key: "Ours", values: ["Ours"] },
    { key: "Ourson", values: ["Ourson"] },
    { key: "Pieuvre", values: ["Pieuvre"] },
    { key: "Pingouin", values: ["Pingouin"] },
    { key: "Rhinocéros", values: ["Rhinocéros"] },
    { key: "Singe", values: ["Singe"] },
    { key: "Souris", values: ["Souris"] },
    { key: "Taureau / Vache", values: ["Taureau", "Vache"] },
    { key: "Tigre", values: ["Tigre"] },
];

const FilterComponent = ({ onFilterChange }: FilterComponentProps) => {
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        onFilterChange(selectedSpecies, searchQuery);
    }, [selectedSpecies, searchQuery]);

    const handleSpeciesChange = (selectedItems: string[]) => {
        setSelectedSpecies(selectedItems);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <View style={styles.filterContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Chercher par nom..."
                placeholderTextColor={textColors.primary}
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
            <MultiSelect
                items={speciesValues.map(species => ({ id: species.values, name: species.key }))}
                uniqueKey="id"
                displayKey="name"
                onSelectedItemsChange={handleSpeciesChange}
                fixedHeight={true}
                styleSelectorContainer={{
                    overflow: 'hidden',
                    position: 'relative',
                    borderWidth: 3,
                    borderColor: primaryColors.teal,
                    borderRadius: 10,
                    zIndex: 1000,
                }}
                selectedItems={selectedSpecies}
                selectedItemTextColor={textColors.primary}
                selectedItemIconColor={primaryColors.tealDark}
                selectedItemFontFamily={'FinkHeavy'}
                selectedText={'✓'}
                itemTextColor={textColors.primary}
                itemFontFamily={'FinkHeavy'}
                selectText="Sélectionner les espèces"
                styleTextDropdownSelected={{
                    color: textColors.primary,
                    fontFamily: 'FinkHeavy',
                    fontSize: 14,
                    marginLeft: 12,
                }}
                searchInputPlaceholderText="Rechercher une espèce..."
                searchInputStyle={{
                    color: textColors.primary,
                    fontFamily: 'FinkHeavy',
                    fontSize: 16,
                }}
                styleDropdownMenuSubsection={{
                    borderColor: primaryColors.teal,
                    height: 50,
                    borderWidth: 3,
                    borderBottomWidth: 3,
                    borderRadius: 10,
                    backgroundColor: uiColors.header.text,
                }}
                styleTextDropdown={{
                    color: textColors.primary,
                    fontFamily: 'FinkHeavy',
                    fontSize: 16,
                    marginLeft: 12,
                }}
                textInputProps={{ editable: false }}
                hideTags={true}
                hideDropdown={true}
                searchIcon={false}
                hideSubmitButton={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: primaryColors.teal,
        backgroundColor: primaryColors.tealLight,
        padding: 10,
    },
    searchInput: {
        height: 50,
        borderColor: primaryColors.teal,
        borderWidth: 3,
        fontFamily: 'FinkHeavy',
        fontSize: 16,
        color: textColors.primary,
        backgroundColor: uiColors.header.text,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
});

export default FilterComponent;