import Villager from "@/types/Villager";
import {View, Image, StyleSheet, Dimensions} from "react-native";
import ACText from "@/components/ACText";
import {primaryColors, textColors, uiColors} from "@/constants/colors";

interface VillagerCardProps {
    villager: Villager;
    widthPercent?: string;
}

const VillagerCard = (props: VillagerCardProps) => {
    const screenWidth = Dimensions.get('window').width;
    const width = props.widthPercent ? (screenWidth * parseFloat(props.widthPercent) / 100) : "auto";

    return (
        <View style={[styles.container, {width: width}]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: props.villager.image }}
                    style={styles.image}
                    resizeMode="center"
                />
            </View>
            <ACText style={styles.text}>{props.villager.nom}</ACText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: uiColors.card.border,
        borderRadius: 5,
        margin: 4,
        backgroundColor: uiColors.card.border,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.2)',
        elevation: 3,
    },
    image: {
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: uiColors.card.background,
    },
    text: {
        color: textColors.primary,
        overflow: 'hidden',
    }
});

export default VillagerCard;