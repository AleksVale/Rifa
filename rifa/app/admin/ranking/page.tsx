import { Metadata } from 'next'
import FilterRanking from '@/components/FilterRanking'

export const metadata: Metadata = {
  title: 'Ranking page',
  description: 'This is ranking to see top buyers',
  // other metadata
}
const RankingPage = () => {
  return <FilterRanking />
}

export default RankingPage
