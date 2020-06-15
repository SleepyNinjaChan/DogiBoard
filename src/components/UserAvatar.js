import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import styled, { css } from 'styled-components'

const Avatar = styled.img`
	border-radius: 50%;
	${(props) => props.noBorder || css`
		border: 2px solid white;`
}	
`

const UserAvatar = ({
	user, title = true, noBorder, size = '100'
}) => {
	const GetUserEmailHash = () => {
		if (user.gravatarEmail) {
			return (md5(user.gravatarEmail))
		}
		if (user.email) {
			return (md5(user.email))
		}
	}

	return (
		<Avatar src={`https://www.gravatar.com/avatar/${GetUserEmailHash()}?s=${size}`} title={title ? user.username : null} alt={`User ${user.username}'s avatar`} noBorder={noBorder} />
	)
}

export default UserAvatar