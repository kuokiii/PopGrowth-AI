import { NextResponse } from 'next/server'
import * as math from 'mathjs'

export async function POST(req: Request) {
  const { modelType, initialPopulation, growthRate, carryingCapacity, timeSpan } = await req.json()

  const data = []
  let population = initialPopulation

  for (let t = 0; t <= timeSpan; t++) {
    data.push({ time: t, population: Math.round(population) })

    if (modelType === 'exponential') {
      population *= Math.exp(growthRate)
    } else if (modelType === 'logistic') {
      population = (carryingCapacity * population * Math.exp(growthRate)) / (carryingCapacity + population * (Math.exp(growthRate) - 1))
    }
  }

  return NextResponse.json({ data })
}

