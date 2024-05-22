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
    console.log('Overweight I (At risk)')
  } else if (bmi >= 30) {
    console.log('Overweight II (Moderately obese)')
  } else if (bmi > 30) {
    console.log('Overweight III (Severely obese)')
  }
}

try {
  const bmi = bmiCalculator(74, 180)
  console.log('BMI:', bmi)
  getBmiCategory(bmi)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
