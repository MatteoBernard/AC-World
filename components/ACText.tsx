import { Text, StyleSheet } from "react-native";

interface ACTextProps {
    children: React.ReactNode;
    style?: object;
}

const ACText = (props: ACTextProps) => {
    return (
        <Text style={[styles.customFont, props.style]}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    customFont: {
        fontFamily: 'FinkHeavy',
    },
});

export default ACText;