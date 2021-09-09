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
    status: "active",
    type: "maintenance",
    exercisePerWeek: 6,
    targetBodyFat: 0.18,
    comment: "On pause until lockdown is over"
  },
]
  