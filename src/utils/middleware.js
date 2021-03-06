const boardRouter = require('express').Router()
const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	// response.status(404).send({ error: 'unknown endpoint' })
	// if (request.path.includes('/board/')) {
	// 	const boardId = request.path.split('/board/')[1]
	// 	response.redirect(`/api/boards/${boardId}`)
	// } else {
	console.log('redirect to root')
	response.redirect('/')
	// }
}

const errorHandler = (error, request, response, next) => {
	logger.error('ErrorHandlerHit:', error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	}
	if (error.name === 'CastError') {
		if (error.message.includes('ObjectId')) {
			return response.status(400).json({ error: 'invalid id' })
		}
		return response.status(401).json({ error: 'invalid parameter' })
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}
