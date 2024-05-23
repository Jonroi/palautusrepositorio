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

// Command-line argument handling
try {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    throw new Error('Not enough arguments. Provide target and daily hours.')
  }

  const target = Number(args[0])
  const dailyHours = args.slice(1).map(Number)

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error('Invalid number in arguments.')
  }

  const result = ExerciseCalculator(dailyHours, target)
  console.log('Exercise result:', result)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
