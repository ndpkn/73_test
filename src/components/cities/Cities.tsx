import styles from './cities.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { City } from '../../types/types'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'

interface CitiesProps {
	cityLink: string
	setCityLink: React.Dispatch<React.SetStateAction<string>>
}

const Cities = ({ cityLink, setCityLink }: CitiesProps) => {
	const [citiesList, setCitiesList] = useState<City[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		axios
			.get<{ networks: City[] }>(
				'https://api.citybik.es/v2/networks?fields=href,location'
			)
			.then(res => {
				setCitiesList(res.data.networks)
				setCityLink(res.data.networks[0].href)
				setIsLoading(false)
			})
			.catch(err => console.error(err))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getCityLink = (link: string) => {
		setCityLink(link)
	}

	const networksListRender = citiesList.map((item: City, i: number) => {
		return (
			<ListItem
				className={styles.cities__item}
				key={i}
				onClick={() => getCityLink(item.href)}
			>
				<ListItemButton>
					<ListItemText primary={item.location.city} />
					<ListItemIcon>
						<ArrowForwardIosIcon sx={{ color: '#ffffffab' }} />
					</ListItemIcon>
				</ListItemButton>
			</ListItem>
		)
	})

	return (
		<div className={styles.cities}>
			{isLoading ? (
				<CircularProgress />
			) : (
				<List
					sx={{ width: '100%', maxWidth: 360 }}
					aria-label='stations'
				>
					{networksListRender}
				</List>
			)}
		</div>
	)
}

export default Cities
