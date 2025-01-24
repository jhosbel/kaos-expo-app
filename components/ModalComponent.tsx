import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import BigButton from "./BigButton";

const ModalComponent = ({
  isVisible,
  setIsVisible,
  children,
  containerStyles,
  contentStyles,
  height,
}: any) => {
  return (
    <>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View
          style={[
            style.container,
            { flex: 1, justifyContent: "flex-end", alignItems: "center" },
          ]}
        >
          <View
            style={[style.modalStyle, style.containerModal, containerStyles]}
          >
            <ScrollView style={[contentStyles]}>{children}</ScrollView>
            <BigButton
              children={"Cancelar"}
              onPress={() => setIsVisible(!setIsVisible)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalComponent;

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
    height: 580,
    //padding: 32,
    paddingBottom: 32,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 16,
    backgroundColor: "#ffffff",
    //justifyContent: "center",
    alignItems: "center",
  },
});
