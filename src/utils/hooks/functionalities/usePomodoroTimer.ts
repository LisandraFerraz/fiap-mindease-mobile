import { useEffect, useMemo, useRef, useState } from "react";

type Step = "FIRSTROUND" | "SHORTBREAK" | "SECONDROUND" | "LONGBREAK";

export function usePomodoroTimer() {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const [currentStep, setCurrentStep] = useState<Step>("FIRSTROUND");
  const [currentRound, setCurrentRound] = useState(1);

  const stepTimes: Record<Step, number> = {
    FIRSTROUND: 3,
    SHORTBREAK: 4,
    SECONDROUND: 15,
    LONGBREAK: 6,
  };

  const buttonOptions: { step: Step; label: string }[] = [
    { step: "FIRSTROUND", label: "Trabalho" },
    { step: "SHORTBREAK", label: "Pausa 5min" },
    { step: "LONGBREAK", label: "Pausa 15min" },
  ];

  useEffect(() => {
    setStepTime(currentStep);
  }, []);

  function setStep(step: Step) {
    setCurrentStep(step);
    setStepTime(step);
    stop();
  }

  function start() {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 1) {
          stop();

          setTimeout(() => {
            nextStep();
          }, 0);

          return time;
        }

        return time - 1;
      });
    }, 1000);
  }

  function stop() {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function reset() {
    stop();
    setCurrentRound(1);
    setStepTime(currentStep);
  }

  function setStepTime(step: Step) {
    const time = stepTimes[step];
    setTimeRemaining(time);
    setCurrentStep(step);
  }

  function nextStep() {
    if (currentStep === "LONGBREAK") {
      reset();
      return;
    }

    setCurrentRound((prev) => prev + 1);

    const order: Step[] = [
      "FIRSTROUND",
      "SHORTBREAK",
      "SECONDROUND",
      "LONGBREAK",
    ];

    const currentIndex = order.indexOf(currentStep);
    const next = order[currentIndex + 1];

    if (next) {
      setCurrentStep(next);
      setStepTime(next);
      start();
    }
  }

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeRemaining]);

  return {
    isRunning,
    currentStep,
    currentRound,
    buttonOptions,
    formattedTime,
    start,
    stop,
    reset,
    setStep,
  };
}
