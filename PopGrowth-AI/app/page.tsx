import Layout from './components/layout'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SamplePopulationData from './components/sample-population-data'

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12 py-12">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Modeling Population Growth with Differential Equations
        </h1>
        
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <span>Welcome to PopGrowth AI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-lg text-center">
              Dive into the fascinating world of population dynamics through the lens of differential equations. 
              Our interactive tools allow you to model and visualize both exponential and logistic growth patterns, 
              providing insights into real-world population trends.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/exponential-growth">Explore Exponential Growth</Link>
              </Button>
              <Button asChild>
                <Link href="/logistic-growth">Discover Logistic Growth</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Exponential Growth Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                The exponential growth model assumes unlimited resources and constant growth rate. 
                It's ideal for modeling populations in early stages or in resource-rich environments.
              </p>
              <Button asChild className="w-full">
                <Link href="/exponential-growth">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Logistic Growth Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                The logistic growth model accounts for limited resources and carrying capacity. 
                It provides a more realistic long-term projection for population dynamics.
              </p>
              <Button asChild className="w-full">
                <Link href="/logistic-growth">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <span>Interactive Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center">
              Engage with our interactive tools to deepen your understanding of population growth models. 
              Experiment with different parameters and see how they affect population dynamics in real-time.
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/interactive-demo">Try Interactive Demo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <SamplePopulationData />
      </div>
    </Layout>
  )
}

