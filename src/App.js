import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from './components/Calculator'
const App = () => (
  <div className="py-10">
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Base TPK APP TOTO
        </h1>
      </div>
    </header>
    <main>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <div className="">
            <Calculator />
          </div>
        </div>
      </div>
    </main>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
