import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeMode } from "../../../theme/ThemeContext";

import { Button } from "../../../components/ui/Button";
import { ThemedText } from "../../../components/ThemedText";
import { Icon } from "../../../components/ui/Icon";
import { Asset } from "../../../components/ui/Assets";

type Step = "FIRSTROUND" | "SHORTBREAK" | "SECONDROUND" | "LONGBREAK";

export function PomodoroTimer() {
  const { mode } = useThemeMode();

  const intervalRef = useRef<number | null>(null);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("FIRSTROUND");
  const [currentRound, setCurrentRound] = useState(1);

  const stepTimes: Record<Step, number> = {
    // == PARA TESTE: ==
    // FIRSTROUND: 3,
    // SHORTBREAK: 4,
    // SECONDROUND: 15,
    // LONGBREAK: 6,
    FIRSTROUND: 1500,
    SHORTBREAK: 300,
    SECONDROUND: 1500,
    LONGBREAK: 900,
  };

  const buttonOptions: { step: Step; label: string }[] = [
    { step: "FIRSTROUND", label: "Trabalho" },
    { step: "SHORTBREAK", label: "Pausa 5min" },
    { step: "LONGBREAK", label: "Pausa 15min" },
  ];

  const order: Step[] = [
    "FIRSTROUND",
    "SHORTBREAK",
    "SECONDROUND",
    "LONGBREAK",
  ];

  useEffect(() => {
    setStepTime("FIRSTROUND");
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) return;

    if (!isRunning) return;

    stop();

    const currentIndex = order.indexOf(currentStep);

    if (currentIndex === order.length - 1) {
      resetToFirstRound();
      return;
    }

    const next = order[currentIndex + 1];

    setCurrentRound((prev) => prev + 1);
    setCurrentStep(next);
    setTimeRemaining(stepTimes[next]);

    setTimeout(() => {
      start();
    }, 0);
  }, [timeRemaining]);

  function setStep(step: Step) {
    stop();
    setCurrentRound(1);
    setStepTime(step);
  }

  function start() {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);
  }

  function stop() {
    setIsRunning(false);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resetToFirstRound() {
    stop();
    setCurrentRound(1);
    setCurrentStep("FIRSTROUND");
    setTimeRemaining(stepTimes["FIRSTROUND"]);
  }

  function reset() {
    stop();
    setCurrentRound(1);
    setStepTime(currentStep);
  }

  function setStepTime(step: Step) {
    setCurrentStep(step);
    setTimeRemaining(stepTimes[step]);
  }

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeRemaining]);

  // component //
  return (
    <View>
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
        <Asset name="pomodoro_bg" style={styles.timer_bg} />
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
        <ThemedText>{currentRound}/4</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "30%",
  },
  timer_count: {
    fontSize: 100,
    fontWeight: 700,
    top: 15,
  },
  timer_buttons: {
    flexDirection: "row",
    marginTop: 25,
  },

  btn_timer_actions: {
    height: 45,
    width: 45,
  },
  timer_bg: {
    position: "absolute",
    alignSelf: "center",
    zIndex: -1,
    // bottom: -35,
    width: 480,
    height: 420,
  },
});
