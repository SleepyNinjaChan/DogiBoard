import axios from 'axios'
import store from '../redux/store/index'

const baseUrl = '/api/users'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data).catch((error) => {
		console.log(error.message)
	})
}

const getWithToken = (token) => {
	const request = axios.get(`${baseUrl}/token`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return request.then((response) => response.data).catch((error) => {
		console.log(error.message)
	})
}

const getOne = (id) => {
	const request = axios.get(`${baseUrl}/${id}`, {
		headers: {
			Authorization: `Bearer ${store.getState().user.token}`
		}
	})
	return request.then((response) => response).catch((error) => (error.response))
}

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject)
	return request.then((response) => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject, {
		headers: {
			Authorization: `Bearer ${store.getState().user.token}`
		}
	})
	return request.then((response) => response).catch((error) => {
		return error.response
	})
}

const getGravatar = (id) => {
	const request = axios.get(`${baseUrl}/${id}`, {
		headers: {
			Authorization: `Bearer ${store.getState().user.token}`
		}
	})
	request.then((response) => {
		if (response.data.gravatarEmail) {
			return response.data.gravatarEmail
		}
		return response.data.email
	}).catch((error) => (error.response))
}

const getClosestMatches = (query) => {
	const request = axios.get(`${baseUrl}/search/${query}`, {
		headers: {
			Authorization: `Bearer ${store.getState().user.token}`
		}
	})
	return request.then((response) => response).catch((error) => (error.response))
}

const updateGravatar = (id, gravatarEmail) => {
	console.log('gravatar update', gravatarEmail)
	const request = axios.put(`${baseUrl}/${id}/gravatar`, gravatarEmail, {
		headers: {
			Authorization: `Bearer ${store.getState().user.token}`
		}
	})
	return request.then((response) => response).catch((error) => {
		return error.response
	})
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then((response) => response.data)
}

export default {
	getAll,
	create,
	update,
	remove,
	getWithToken,
	getOne,
	updateGravatar,
	getGravatar,
	getClosestMatches
}
