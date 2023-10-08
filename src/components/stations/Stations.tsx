import axios from 'axios'
import styles from './stations.module.scss'
import { useEffect, useState } from 'react'
import { Network, Station } from '../../types/types'
import {
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch } from 'react-redux'
import {
	addToFavorites,
	removeFromFavorites,
} from '../../store/favorite/favoriteSlice'

interface StationsProps {
	cityLink: string
}

const Stations = ({ cityLink }: StationsProps): JSX.Element => {
	const [stations, setStations] = useState<Network>()
	const [likedStations, setLikedStations] = useState<Station[]>([])
	const [isLoading, setIsLoading] = useState(true)
	// const favoritesList = useSelector((state: RootState) => state.favorite)
	const dispatch = useDispatch()

	useEffect(() => {
		axios
			.get<{ network: Network }>(`https://api.citybik.es${cityLink}`)
			.then(res => {
				setStations(res.data.network)
				setIsLoading(false)
			})
			.catch(err => console.error(err))
	}, [cityLink])

	useEffect(() => {
		const savedStations = localStorage.getItem('stations')
		if (savedStations) {
			setLikedStations(JSON.parse(savedStations))
		}
	}, [])

	const saveLikedStations = (likedStations: Station[]) => {
		localStorage.setItem('stations', JSON.stringify(likedStations))
	}

	const addFavorite = ({ id, name }: Station) => {
		const newLikedStations = [...likedStations, { id, name }]
		setLikedStations(newLikedStations)
		saveLikedStations(newLikedStations)
		dispatch(addToFavorites({ id, name }))
	}

	const removeFavorite = ({ id, name }: Station) => {
		const newLikedStations = likedStations.filter(s => s.id !== id)
		setLikedStations(newLikedStations)
		saveLikedStations(newLikedStations)
		dispatch(removeFromFavorites({ id, name }))
	}

	const stationsRender = () => {
		const stationsArr: Station[] | undefined = stations?.stations
		return stationsArr?.map(item => {
			return (
				<ListItem disablePadding key={item.id}>
					<ListItemButton>
						<ListItemIcon>
							{likedStations.find(s => s.id === item.id) ? (
								<FavoriteIcon
									sx={{
										color: ' hsla(0, 80.3921568627451%, 40%, 0.707)',
									}}
									onClick={() => removeFavorite(item)}
								/>
							) : (
								<FavoriteBorderIcon
									sx={{
										color: '#5c5c5c',
									}}
									onClick={() => addFavorite(item)}
								/>
							)}
						</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItemButton>
				</ListItem>
			)
		})
	}

	return (
		<div className={styles.stations}>
			{isLoading ? (
				<>
					<CircularProgress />
				</>
			) : (
				<>
					<h2>Network name: {stations?.name}</h2>
					<h3>{`Total stations: ${stations?.stations.length}`}</h3>
					<List
						sx={{ width: '100%', maxWidth: 360 }}
						aria-label='stations'
					>
						{stationsRender()}
					</List>
				</>
			)}
		</div>
	)
}

export default Stations
