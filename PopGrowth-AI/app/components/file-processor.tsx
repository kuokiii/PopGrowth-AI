'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function FileProcessor() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<{
    exponential: any;
    logistic: any;
  } | null>(null);
  const [processing, setProcessing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setProcessing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/process-file', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error processing file:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Upload and Process Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" onChange={handleFileChange} accept=".csv,.xlsx,.mat" />
          <Button type="submit" disabled={!file || processing}>
            {processing ? 'Processing...' : 'Process File'}
          </Button>
        </form>
        {result && (
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Exponential Growth Model</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={result.exponential.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-4">
                Predicted population after {result.exponential.prediction_years} years: {result.exponential.prediction.toFixed(2)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Logistic Growth Model</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={result.logistic.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-4">
                Predicted population after {result.logistic.prediction_years} years: {result.logistic.prediction.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

