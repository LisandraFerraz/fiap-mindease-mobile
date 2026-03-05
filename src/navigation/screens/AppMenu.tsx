import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";

import me_icon from "./../../assets/me-icon.png";
import { navItem } from "./utils/data/navitems";
import { INavItems } from "./utils/interfaces/navitems-interface";
import { ThemedText } from "../../components/ThemedText";
import { Icon } from "../../components/ui/Icon/Icon";
import { Divider } from "react-native-elements";

// type Props = StaticScreenProps<{
//   user: string;
// }>;

export function AppMenu() {
  const navigation = useNavigation();
  const { colors } = useTheme() as CustomTheme;

  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const navItensList: INavItems[] = navItem;

  const navigateTo = (route: string) => {
    return navigation.navigate(`${route}`);
  };

  return (
    <View style={styles.container}>
      <Image source={me_icon} style={styles.icon} />
      <View style={styles.items_list}>
        <FlatList
          data={navItensList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.route)}
              style={styles.menu_item}
            >
              <Icon style={styles.menu_item_icon} name={item.icon} />
              <ThemedText style={styles.menu_item_txt}>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
        />
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menu_item}>
          <Icon style={styles.menu_item_icon} name="settings" />
          <ThemedText style={styles.menu_item_txt}>Preferências</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu_item}>
          <Icon style={styles.menu_item_icon} name="logout" />
          <ThemedText style={styles.menu_item_txt}>Encerrar sessão</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      gap: 10,
      marginTop: "10%",
    },
    icon: {
      height: 200,
      width: 200,
      alignSelf: "center",
    },
    items_list: {
      paddingHorizontal: "10%",
    },
    menu_item: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
    },
    menu_item_icon: {
      marginRight: 15,
      height: 30,
      width: 30,
    },
    menu_item_txt: {
      fontSize: 20,
    },
    divider: {
      width: "100%",
      height: 1,
      marginBottom: 15,
      backgroundColor: color.border_color,
    },
  });
