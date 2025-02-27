import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  StyleSheet,
} from "react-native";
import ExerciseTopDisplay from '../../components/ExerciseTopDisplay/ExerciseTopDisplay';
import { default as Tabs } from "../../components/tabs/Tabs";
import { default as About } from "../../components/about/About";
import { default as Footer } from "../../components/footer/Footer";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";


const tabs = ["About", "Instructions"];

const MeditationDetails = () => {
  const params = useGlobalSearchParams();
  const id = params.id;
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: id,
  });
  const meditationItem = useFetch().getItemById(parseInt(id, 10));
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this meditation: ${meditationItem.title} (${meditationItem.duration})`,
      });
      if (result.action === Share.dismissedAction) {
        // Share dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <About item={meditationItem} />;
      case "Instructions":
        return <Text>{meditationItem.instructions}</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeaderBtn detailPage={true} handleShare={onShare} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : !meditationItem || meditationItem.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <ExerciseTopDisplay
              meditationImage={meditationItem.image}
              meditationTitle={meditationItem.title}
              duration={meditationItem.duration}
              target={meditationItem.target}
            />
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <Footer data={meditationItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  specificsContainer: {
    padding: SIZES.medium,
  },
  specificsTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  pointsContainer: {
    marginTop: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small / 2,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.small,
  },
  pointText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default MeditationDetails;