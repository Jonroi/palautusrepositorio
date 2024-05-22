interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ExerciseCalculator = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hours) => hours > 0).length
  const totalHours = dailyHours.reduce((acc, cur) => acc + cur, 0)
  const average = totalHours / periodLength

  let rating = 0
  let ratingDescription = ''

  if (average >= target) {
    rating = 3
    ratingDescription = 'Great job!'
  } else if (average >= target / 2) {
    rating = 2
    ratingDescription = 'Not bad, but could be better!'
  } else {
    rating = 1
    ratingDescription = 'You need to work harder!'
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const result = ExerciseCalculator([3, 0, 2, 4.5, 0], 3)
  console.log('Exercise result:', result)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
