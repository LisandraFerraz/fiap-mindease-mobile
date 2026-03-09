import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { UseDashboard } from "../../utils/hooks/api-calls/useDashboard";
import { useEffect, useMemo, useState } from "react";
import { IDashboardRes, IGraphData } from "../../utils/models/dashboard-model";
import { IKanbanTodo } from "../../utils/models/kanban-model";
import { StickyNote } from "../../utils/models/sticky-note-model";
import { ThemedText } from "../../components/ThemedText";
import { INavItems } from "../../utils/models/navitems-interface";
import { navItem } from "../../utils/data/navitems";
import { Icon } from "../../components/ui/Icon";
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { KanbanPrioTag } from "../../components/ui/KanbanPrioTag";
import { StickyNoteItem } from "../../components/StickyNotes/StickyNote";
import { Header } from "../../components/ui/Header";
import { PopulationPyramid } from "react-native-gifted-charts";
import { Asset } from "../../components/ui/Assets";

export function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { listDashboardItems } = UseDashboard();
  const isFocused = useIsFocused();
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [kanbanToExpire, setKanbanToExpire] = useState<IKanbanTodo[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<StickyNote[]>([]);

  const navItensList: INavItems[] = navItem;

  useEffect(() => {
    handleGetDashboardData();
  }, [isFocused]);

  const handleGetDashboardData = () => {
    listDashboardItems().then((res: IDashboardRes) => {
      if (res) setGraphData(res.graphData);
      setKanbanToExpire(res.kanbanToExpire);
      setFavoriteNotes(res.favoriteStickyNotes);
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header hasName />
        <View style={styles.dash_section}>
          <ThemedText style={styles.section_title}>Links rápidos</ThemedText>
          <FlatList
            data={navItensList}
            numColumns={2}
            contentContainerStyle={styles.styles_grid}
            columnWrapperStyle={{ gap: 12 }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.grid_item,
                  styles.nav_items,
                  {
                    backgroundColor: colors.input_bg_color_primary,
                  },
                ]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Icon style={{ height: 30, width: 30 }} name={item.icon} />
                <ThemedText>{item.name}</ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.dash_section}>
          <ThemedText style={styles.section_title}>
            Tarefas que expiram em breve
          </ThemedText>
          {kanbanToExpire.length > 0 ? (
            <FlatList
              data={kanbanToExpire}
              contentContainerStyle={{ gap: 12, padding: 5 }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.grid_item,
                    styles.nav_items,
                    styles.kanban_item,
                  ]}
                  onPress={() => navigation.navigate("Kanban")}
                >
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <KanbanPrioTag
                      prio={item.priority}
                      style={{ paddingHorizontal: 10 }}
                    />
                    <ThemedText> {item.title} </ThemedText>
                  </View>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <ThemedText>{item.dayCountMessage}</ThemedText>
                    <Icon name="arrow_long" />
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Asset
              style={{
                alignSelf: "center",
                width: 185,
                height: 55,
              }}
              name="empty_todo_list"
            />
          )}
        </View>

        <View style={styles.dash_section}>
          <ThemedText style={styles.section_title}>
            Post-its favoritos
          </ThemedText>
          {favoriteNotes.length > 0 ? (
            <FlatList
              data={favoriteNotes}
              numColumns={2}
              contentContainerStyle={styles.styles_grid}
              columnWrapperStyle={{ gap: 12 }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <StickyNoteItem noteData={item} style={{ flex: 1 }} />
              )}
            />
          ) : (
            <Asset
              style={{ height: 90, width: 85, alignSelf: "center" }}
              name="empty_notes_list"
            />
          )}
        </View>

        {/* right: done
            left: not done */}
        {graphData.length > 0 && (
          <View style={styles.dash_section}>
            <ThemedText style={styles.section_title}>
              Visão geral de tarefas
            </ThemedText>
            <View style={styles.graph_top}>
              <ThemedText type="defaultSemiBold">Concluído</ThemedText>
              <ThemedText type="defaultSemiBold">Pendente</ThemedText>
            </View>
            <View style={styles.graph}>
              <PopulationPyramid
                data={graphData}
                showMidAxis
                leftBarColor={colors.color_accent_green}
                rightBarColor={colors.color_accent_red}
                barLabelColor={colors.text_color_dark}
                xAxisLabelColor={colors.text_color_dark}
                midAxisLabelColor={colors.text_color_dark}
                midAxisLabelFontSize={18}
                stepHeight={60}
                width={380}
                showXAxisLabelTexts={false}
                showVerticalLines={false}
                showXAxisIndices={false}
                midAxisLabelFontFamily="Verdana"
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styleSheet = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 35,
    },
    section_title: {
      fontSize: 15,
      fontWeight: 600,
      textTransform: "uppercase",
      color: colors.text_color_dark,
    },
    dash_section: {
      gap: 25,
    },
    styles_grid: {
      flex: 1,
      gap: 12,
      padding: 5,
    },
    grid_item: {
      flex: 1,
      gap: 10,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    nav_items: {
      flex: 1,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",

      shadowColor: colors.text_color_light,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },
    kanban_item: {
      justifyContent: "space-between",
      gap: 10,
      backgroundColor: colors.bg_color_card,
    },
    graph_top: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 30,
    },
    graph: {
      left: -10,
    },
  });
