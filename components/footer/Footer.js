import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Footer.style";
import { COLORS, icons } from "../../constants";

const Footer = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = favorites ? JSON.parse(favorites) : [];
            const isFav = data ? favoritesArray.some((item) => item.id === data.id) : false;
            setIsFavorite(isFav);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        }
    };

    const handleFavoriteToggle = async () => {
        try {
            let favorites = await AsyncStorage.getItem("favorites");
            favorites = favorites ? JSON.parse(favorites) : [];
            const updatedFavorites = isFavorite
                ? favorites.filter((item) => item.id !== data.id)
                : [...favorites, data];
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    }, [data]);

    if (!data) {
        return null; // Return null if data is not available
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn} onPress={handleFavoriteToggle}>
                <Image
                    source={isFavorite ? icons.heartFilled : icons.heartOutline}
                    resizeMode="contain"
                    style={[
                        styles.likeBtnImage,
                        { tintColor: isFavorite ? "red" : COLORS.primary},
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={handleFavoriteToggle}>
                <Text style={styles.applyBtnText}>
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;