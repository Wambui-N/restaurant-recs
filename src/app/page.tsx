import { SearchForm } from '@/components/forms/search-form'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Find Your Perfect Restaurant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover restaurants that match your exact preferences
        </p>
        <SearchForm />
      </div>
    </main>
  )
}