import { useState } from 'react'
import './App.css'
import Cities from './components/cities/Cities'
import Stations from './components/stations/Stations'

function App() {
	const [cityLink, setCityLink] = useState<string>('')

	return (
		<div className='App'>
			<h1>Citybikes</h1>
			<main className='main'>
				<Cities cityLink={cityLink} setCityLink={setCityLink} />
				<Stations cityLink={cityLink} />
			</main>
		</div>
	)
}

export default App
