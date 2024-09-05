import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

const Produtos = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.prodRow}>
        {[1, 2, 3, 4].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardPress}
            onPress={() => navigation.navigate('DetalheProduto')}
          >
            <View style={styles.prodBox}>
              <View style={styles.discountArea}>
                <Text style={styles.discountTxt}>-10%</Text>
              </View>
              <Image
                style={styles.prodImage}
                source={require('../assets/img/remedio.png')}
              />
              <View style={styles.infoProdArea}>
                <Text style={styles.productName}>Dipirona Monohidratada</Text>
                <Text style={styles.productDesc}>Remédio para dores</Text>
                <Text style={styles.productValue}>R$15.00</Text>
              </View>
              <View style={styles.btnProductArea}>
                <TouchableOpacity style={styles.btnProduct}>
                  <Text style={styles.btnProductTxt}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  prodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardPress: {
    width: (screenWidth / 2) - 25, // Subtract padding/margin
    marginVertical: 10,
  },
  prodBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    padding: 10,
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  discountArea: {
    width: "100%",
    alignItems: "flex-end",
  },
  discountTxt: {
    backgroundColor: "rgba(112, 149, 18, 0.2)",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    fontWeight: "bold",
    color: "#4D8811",
  },
  prodImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  infoProdArea: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  productDesc: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666",
    textAlign: "center",
  },
  productValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  btnProductArea: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  btnProduct: {
    width: "80%",
    backgroundColor: "#118E96",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
  },
  btnProductTxt: {
    fontSize: 14,
    color: "#F1F1F1",
    fontWeight: "bold",
  },
});

export default Produtos;
