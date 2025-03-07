import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import {primaryColors} from "@/constants/colors";

interface ACViewProps {
    children: React.ReactNode;
    style?: any;
}

const ACView = (props: ACViewProps) => {
  return (
      <KeyboardAvoidingView style={[styles.background, props.style]}>
          {props.children}
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: primaryColors.background,
        flex: 1,
        padding: 20,
    }
});

export default ACView;