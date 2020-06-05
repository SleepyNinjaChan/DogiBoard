import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Button from './Button'
import { setBoard, logout } from '../redux/actions/index'
import { device } from '../devices'

const TopBarContainer = styled.div`
	height: 45px;
	background-color: #1d6cba;
	padding: 5px;
	display:flex;
	flex-wrap: wrap;
`

const TopButton = styled(Button)`
`

const BoardsButton = styled(TopButton)`
`
const LogoutButton = styled(TopButton)`
	/* position: absolute;
	top: 0;
	right: 0;  */
	float: right;
`

const LinkStyle = styled(Link)`
	flex: 0 0 20%;
	max-width: 20%;
	@media ${(props) => props.theme.device.mobileL} {	
		flex: 0 0 15%;
		max-width: 15%;
	}
	@media ${(props) => props.theme.device.laptop} { 
		flex: 0 0 10%;
		max-width: 10%;
	}
	margin-left: 5px;
`

const LogoutStyle = styled(LinkStyle)`
	/* position: absolute; */
	/* top: 0; */
	/* right: 10px; */
	margin-left: auto !important;
	margin-right: 5px;
`

const TopBar = ({ dispatch }) => {
	const user = useSelector((state) => state.user)
	const BoardsButtonPressed = () => {
		dispatch(setBoard({ board: null }))
	}

	const LogoutButtonPressed = () => {
		if (user.loggedIn) {
			dispatch(logout())
			Cookies.remove('token')
		}
	}

	return (
		<TopBarContainer className="flex-row">
			<LinkStyle to="/boards">
				<BoardsButton type="button" onClick={BoardsButtonPressed}>Boards</BoardsButton>
			</LinkStyle>
			<LogoutStyle className="float-right" to="/login">
				<LogoutButton onClick={LogoutButtonPressed}>Logout</LogoutButton>
			</LogoutStyle>
		</TopBarContainer>
	)
}

export default connect(null, null)(TopBar)
