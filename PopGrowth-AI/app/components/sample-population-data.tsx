'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const countries = ['Japan', 'South Korea', 'USA', 'Vietnam', 'Laos', 'Indonesia']

const sampleData = {
  Japan: [82199000, 93189000, 104345000, 116807000, 123537000, 126843000, 128070000, 125360000],
  'South Korea': [19211000, 25012000, 32241000, 38124000, 42869000, 47008000, 49554000, 51269000],
  USA: [157813000, 180671000, 205052000, 227225000, 248710000, 282162000, 309011000, 329484000],
  Vietnam: [24810000, 32671000, 43404000, 54281000, 66017000, 79910000, 87968000, 97338000],
  Laos: [1684000, 2120000, 2688000, 3205000, 4258000, 5329000, 6246000, 7275000],
  Indonesia: [69543000, 87792000, 114835000, 147490000, 181437000, 211513000, 242524000, 273524000]
}

const years = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]

function exponentialGrowth(P0: number, r: number, t: number) {
  return P0 * Math.exp(r * t)
}

function logisticGrowth(K: number, r: number, P0: number, t: number) {
  return K / (1 + (K / P0 - 1) * Math.exp(-r * t))
}

export default function SamplePopulationData() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  const generateChartData = (country: string) => {
    const populationData = sampleData[country]
    const P0 = populationData[0]
    const K = Math.max(...populationData) * 1.5 // Assuming carrying capacity is 1.5 times the maximum observed population
    
    // Estimate growth rates
    const r_exp = Math.log(populationData[populationData.length - 1] / P0) / (years[years.length - 1] - years[0])
    const r_log = r_exp // Using the same rate for simplicity

    return years.map((year, index) => ({
      year,
      actual: populationData[index],
      exponential: Math.round(exponentialGrowth(P0, r_exp, index * 10)),
      logistic: Math.round(logisticGrowth(K, r_log, P0, index * 10))
    }))
  }

  const chartData = generateChartData(selectedCountry)

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle>Sample Population Data Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={countries[0]} onValueChange={setSelectedCountry}>
          <TabsList>
            {countries.map(country => (
              <TabsTrigger key={country} value={country}>{country}</TabsTrigger>
            ))}
          </TabsList>
          {countries.map(country => (
            <TabsContent key={country} value={country}>
              <div className="space-y-4">
                <p>Original population in 1950: {sampleData[country][0].toLocaleString()}</p>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                    <Line type="monotone" dataKey="exponential" stroke="#82ca9d" name="Exponential" />
                    <Line type="monotone" dataKey="logistic" stroke="#ffc658" name="Logistic" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  <p><strong>Exponential Growth Formula:</strong> P(t) = P₀ * e^(rt)</p>
                  <p><strong>Logistic Growth Formula:</strong> P(t) = K / (1 + (K/P₀ - 1) * e^(-rt))</p>
                  <p>Where:</p>
                  <ul className="list-disc list-inside">
                    <li>P(t) is the population at time t</li>
                    <li>P₀ is the initial population</li>
                    <li>r is the growth rate</li>
                    <li>K is the carrying capacity (for logistic growth)</li>
                    <li>t is the time in years since the initial population</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

