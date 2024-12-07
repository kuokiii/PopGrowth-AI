'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function InteractiveDemo() {
  const [initialPopulation, setInitialPopulation] = useState(1000)
  const [growthRate, setGrowthRate] = useState(0.05)
  const [carryingCapacity, setCarryingCapacity] = useState(10000)
  const [timeSpan, setTimeSpan] = useState(100)
  const [data, setData] = useState([])

  const runSimulation = () => {
    const newData = []
    let population = initialPopulation

    for (let t = 0; t <= timeSpan; t++) {
      newData.push({ time: t, population: Math.round(population) })
      population = population * (1 + growthRate * (1 - population / carryingCapacity))
    }

    setData(newData)
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Interactive Population Growth Demo</h1>
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Adjust Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Population: {initialPopulation}</label>
              <Slider
                min={100}
                max={10000}
                step={100}
                value={[initialPopulation]}
                onValueChange={(value) => setInitialPopulation(value[0])}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate: {growthRate.toFixed(2)}</label>
              <Slider
                min={0}
                max={0.5}
                step={0.01}
                value={[growthRate]}
                onValueChange={(value) => setGrowthRate(value[0])}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carrying Capacity: {carryingCapacity}</label>
              <Slider
                min={1000}
                max={100000}
                step={1000}
                value={[carryingCapacity]}
                onValueChange={(value) => setCarryingCapacity(value[0])}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Span: {timeSpan} years</label>
              <Slider
                min={10}
                max={500}
                step={10}
                value={[timeSpan]}
                onValueChange={(value) => setTimeSpan(value[0])}
              />
            </div>
            <Button onClick={runSimulation} className="w-full">Run Simulation</Button>
          </CardContent>
        </Card>

        {data.length > 0 && (
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Population Growth Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </Layout>
  )
}

