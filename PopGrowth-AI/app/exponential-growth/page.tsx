import Layout from '../components/layout'
import PopulationModelingTool from '../components/population-modeling-tool'

export default function ExponentialGrowth() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Exponential Growth Model</h1>
        <p className="text-center text-lg mb-8">
          Explore the exponential growth model, which assumes unlimited resources and constant growth rate.
        </p>
        <PopulationModelingTool initialModelType="exponential" />
      </div>
    </Layout>
  )
}

