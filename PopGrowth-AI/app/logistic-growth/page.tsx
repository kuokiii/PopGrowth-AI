import Layout from '../components/layout'
import PopulationModelingTool from '../components/population-modeling-tool'

export default function LogisticGrowth() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Logistic Growth Model</h1>
        <p className="text-center text-lg mb-8">
          Explore the logistic growth model, which accounts for limited resources and carrying capacity.
        </p>
        <PopulationModelingTool initialModelType="logistic" />
      </div>
    </Layout>
  )
}

