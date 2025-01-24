import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import BigButton from "./BigButton";

const SmallModalComponent = ({
  isVisible,
  setIsVisible,
  children,
  containerStyles,
  contentStyles,
}: any) => {
  return (
    <>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View
          style={[style.container, {flex: 1, justifyContent: "flex-end", alignItems: "center"}]}
        >
          <View
            style={[style.modalStyle, style.containerModal, containerStyles]}
          >
            <ScrollView keyboardShouldPersistTaps="always" style={[contentStyles]}>{children}</ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SmallModalComponent;

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerModal: {
    width: 390,
    height: 500,
    paddingBottom: 32,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});
