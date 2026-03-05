import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { usePomodoroTimer } from "../../utils/hooks/functionalities/usePomodoroTimer";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon/Icon";

export function Pomodoro() {
  const {
    isRunning,
    currentStep,
    currentRound,
    buttonOptions,
    formattedTime,
    start,
    stop,
    reset,
    setStep,
  } = usePomodoroTimer();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.time_options}>
        {buttonOptions.map((btn, index) => (
          <>
            <Button
              key={index}
              customStyle={styles.timers_btn}
              color={currentStep === btn.step ? "primary" : "secondary"}
              name={btn.label}
              onClick={() => setStep(btn.step)}
            />
          </>
        ))}
      </View>

      <View style={styles.timer_wrapper}>
        <ThemedText style={styles.timer_count}>{formattedTime}</ThemedText>
        <View style={styles.timer_buttons}>
          <TouchableOpacity onPress={() => (isRunning ? stop() : start())}>
            <Icon
              style={styles.btn_timer_actions}
              name={isRunning ? "pause" : "play_arrow"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => reset()}>
            <Icon style={styles.btn_timer_actions} name="restart" />
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.current_round}>{currentRound}/4</ThemedText>
      </View>

      <View style={styles.to_do_list}></View>
    </ScrollView>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      // flex:1
      marginVertical: 25,
    },
    time_options: {
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
    },
    timers_btn: {
      paddingHorizontal: 15,
      textTransform: "capitalize",
    },
    timer_wrapper: {
      marginTop: "25%",
      justifyContent: "center",
      alignItems: "center",
    },
    timer_count: {
      fontSize: 100,
      fontWeight: 700,
    },
    timer_buttons: {
      flexDirection: "row",
      marginTop: 25,
    },

    btn_timer_actions: {
      height: 45,
      width: 45,
    },
    to_do_list: {},
    current_round: {
      marginVertical: 15,
    },
  });
