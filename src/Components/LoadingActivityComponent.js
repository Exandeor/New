import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { COLORS } from "../Theme/theme";

function LoadingActivityComponent(props) {
  return (
    <Modal visible={props.visible} transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.shadow }}>
        <ActivityIndicator size={60} color={COLORS.dodgerBlue} />
      </View>
    </Modal>
  );
}

export default LoadingActivityComponent;
