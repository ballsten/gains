// there should only every be one plan with an active status

export const plans = [
  {
    startDate: new Date("2021-06-17"),
    status: "complete",
    type: "cut",
    exercisePerWeek: 6,
    targetBodyFat: 0.15,
    comment: "I'm turning 40 soon. Probably should get in shape."
  },
  {
    startDate: new Date("2021-09-02"),
    status: "complete",
    type: "maintenance",
    exercisePerWeek: 6,
    targetBodyFat: 0.18,
    comment: "On pause until lockdown is over"
  },
  {
    startDate: new Date("2021-10-25"),
    status: "complete",
    type: "cut",
    exercisePerWeek: 6,
    targetBodyFat: 0.12,
    comment: "Back on it - run COVID gauntlet at the gym - FAILED"
  },
  {
    startDate: new Date("2021-11-15"),
    status: "complete",
    type: "cut",
    exercisePerWeek: 6,
    targetBodyFat: 0.12,
    comment: "restarting after failed attempt"
  },
  {
    startDate: new Date("2022-01-17"),
    status: "complete",
    type: "cut",
    exercisePerWeek: 6,
    targetBodyFat: 0.12,
    comment: "restarting after failed attempt"
  },
  {
    startDate: new Date("2022-01-17"),
    status: "active",
    type: "cut",
    exercisePerWeek: 6,
    targetBodyFat: 0.10,
    comment: "restarting after failed yet another attempt"
  },
]
  