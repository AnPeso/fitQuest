import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native"; // Use "react-native" instead if this is not web-based.
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";
import { useRouter } from "expo-router";

const ScreenHeaderBtn = ({ detailPage, handleShare }) => {
    console.log(detailPage);
    const router = useRouter();

    return (
        <View style={styles.btn}>
            <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/home")}>
                <Image source={icons.menu} style={styles.logo} />
            </TouchableOpacity>
            {detailPage ? (
                <TouchableOpacity style={styles.btnContainer} onPress={handleShare}>
                    <Image source={icons.share} style={styles.image} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Image source={icons.settings} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        position: 'absolute',
       // top: 1, // Lisää marginaalia ylhäältä
        //left: 2, // Lisää marginaalia vasemmalta
       //resizeMode: 'contain',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100vw',
    },
    image: {
        width: 35,
        height: 35,
        marginLeft: 2,
       resizeMode: 'contain',
    },
    btnContainer: {
        width: 105,
        height: 105,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 1,
    },
});

export default ScreenHeaderBtn;