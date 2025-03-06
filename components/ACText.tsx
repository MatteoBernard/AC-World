import { Text, StyleSheet } from "react-native";

interface ACTextProps {
    children: React.ReactNode;
    style?: object;
    onPress?: () => void;
}

const ACText = (props: ACTextProps) => {
    return (
        <Text style={[styles.customFont, props.style]} onPress={props.onPress}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'FinkHeavy',
    },
});

export default ACText;