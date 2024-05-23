const bmiCalculator = (weight: number, height: number): number => {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

const getBmiCategory = (bmi: number): void => {
  if (bmi < 18.5) {
    console.log('Underweight (Unhealthy)')
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log('Normal (healthy weight)')
  } else if (bmi >= 25 && bmi < 30) {
    console.log('Overweight  (At risk)')
  } else if (bmi >= 30 && bmi < 35) {
    console.log('Overweight I (Moderately obese)')
  } else if (bmi >= 35 && bmi < 40) {
    console.log('Overweight II (Severely obese)')
  } else if (bmi >= 40) {
    console.log('Overweight III (Very severely obese)')
  }
}

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

  const bmi = bmiCalculator(weight, height)
  console.log('BMI:', bmi)
  getBmiCategory(bmi)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
