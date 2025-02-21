'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"

interface PopulationModelingToolProps {
  initialModelType?: 'exponential' | 'logistic'
}

export default function PopulationModelingTool({ initialModelType = 'exponential' }: PopulationModelingToolProps) {
  const [modelType, setModelType] = useState(initialModelType)
  const [initialPopulation, setInitialPopulation] = useState(1000)
  const [growthRate, setGrowthRate] = useState(0.05)
  const [carryingCapacity, setCarryingCapacity] = useState(10000)
  const [timeSpan, setTimeSpan] = useState(100)
  const [data, setData] = useState([])

  const runSimulation = async () => {
    const response = await fetch('/api/simulate-population', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelType,
        initialPopulation,
        growthRate,
        carryingCapacity,
        timeSpan,
      }),
    })
    const result = await response.json()
    setData(result.data)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Population Growth Model Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={modelType}
                onValueChange={(value: 'exponential' | 'logistic') => setModelType(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exponential">Exponential Growth</SelectItem>
                  <SelectItem value="logistic">Logistic Growth</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid gap-2">
                <Label htmlFor="initial-population">Initial Population</Label>
                <Input
                  id="initial-population"
                  type="number"
                  value={initialPopulation}
                  onChange={(e) => setInitialPopulation(Number(e.target.value))}
                  placeholder="Enter starting population (e.g. 1000)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="growth-rate">Growth Rate</Label>
                <Input
                  id="growth-rate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  placeholder="Enter growth rate (e.g. 0.05 for 5%)"
                  step="0.01"
                />
              </div>
              {modelType === 'logistic' && (
                <div className="grid gap-2">
                  <Label htmlFor="carrying-capacity">Carrying Capacity</Label>
                  <Input
                    id="carrying-capacity"
                    type="number"
                    value={carryingCapacity}
                    onChange={(e) => setCarryingCapacity(Number(e.target.value))}
                    placeholder="Enter maximum sustainable population"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="time-span">Time Span (years)</Label>
                <Input
                  id="time-span"
                  type="number"
                  value={timeSpan}
                  onChange={(e) => setTimeSpan(Number(e.target.value))}
                  placeholder="Enter simulation duration in years"
                />
              </div>
            </div>
            <Button onClick={runSimulation} className="mt-4 w-full">Run Simulation</Button>
          </CardContent>
        </Card>
      </motion.div>

      {data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
      )}
    </div>
  )
}



