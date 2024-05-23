// bmiCalculator.ts
const calculateBmi = (weight: number, height: number): number => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers')
  }

  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

const getBmiCategory = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Underweight (Unhealthy)'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight (At risk)'
  } else if (bmi >= 30 && bmi < 35) {
    return 'Overweight I (Moderately obese)'
  } else if (bmi >= 35 && bmi < 40) {
    return 'Overweight II (Severely obese)'
  } else {
    return 'Overweight III (Very severely obese)'
  }
}

export { calculateBmi, getBmiCategory }

// Command-line argument handling
try {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    throw new Error('Please provide exactly two arguments: weight and height.')
  }

  const weight = Number(args[0])
  const height = Number(args[1])

  if (isNaN(weight) || isNaN(height)) {
    throw new Error('Invalid number in arguments.')
  }

  const bmi = calculateBmi(weight, height)
  console.log('BMI:', bmi)
  console.log('BMI Category:', getBmiCategory(bmi)) // Logging BMI category
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
