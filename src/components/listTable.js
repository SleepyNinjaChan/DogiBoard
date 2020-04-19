import React, { useState, useEffect, useRef, createRef } from 'react'
import Button from 'react-bootstrap/Button'
import AddItem from './addItem'
import CardListContainer from './cardList.js'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const ListTable = ({ addList }) => {
	const [cardLists, setCardLists] = useState([{
		text: 'a',
		cards: [{ text: 'kkk', id: 8998 }],
		id: 8778
	}, {
		text: 'b',
		cards: [{ text: 'lll', id: 9987 }],
		id: 8645
	}
	])

	const [showingAddAnother, setShowingAddAnother] = useState(true)
	const [dragging, setDragging] = useState(false)

	const changeShowAddAnother = (show) => {
		setShowingAddAnother(show)
	}

	const createList = (newList) => {
		setCardLists(cardLists.concat(newList))
		changeShowAddAnother(true)
	}

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result

		if (dragging) {
			setDragging(false)
		}

		if (!destination) {
			return
		}

		if (destination.droppableId === source.droppableId &&
			destination.index === source.index) {
			return
		}
		if (type === "list") {
			if (source.droppableId === 'main' && destination.droppableId === 'main') {

				const list = cardLists[source.index]
				const newLists = Array.from(cardLists);

				newLists.splice(source.index, 1)
				newLists.splice(destination.index, 0, list)
				setCardLists(newLists)
				return
			}
		} else {

			if (source.droppableId === destination.droppableId) {
				const list = cardLists[source.droppableId]
				const newCards = Array.from(list.cards);
				newCards.splice(source.index, 1)
				newCards.splice(destination.index, 0, list.cards[source.index])

				const newList = {
					...list,
					cards: newCards
				}

				const newLists = Array.from(cardLists);
				newLists.splice(source.droppableId, 1)
				newLists.splice(source.droppableId, 0, newList)

				setCardLists(newLists)
			} else {
				const sourceList = cardLists[source.droppableId]
				const destinationList = cardLists[destination.droppableId]
				const newSourceCards = Array.from(sourceList.cards);
				const newDestinationCards = Array.from(destinationList.cards);
				newSourceCards.splice(source.index, 1)
				newDestinationCards.splice(destination.index, 0, sourceList.cards[source.index])

				const newSourceList = {
					...sourceList,
					cards: newSourceCards
				}

				const newDestinationList = {
					...destinationList,
					cards: newDestinationCards
				}

				const newLists = Array.from(cardLists);
				newLists.splice(source.droppableId, 1)
				newLists.splice(source.droppableId, 0, newSourceList)
				newLists.splice(destination.droppableId, 1)
				newLists.splice(destination.droppableId, 0, newDestinationList)

				setCardLists(newLists)
			}
		}
	}

	const updatecards = (cards, index) => {
		const newList = {
			...cardLists[index],
			cards: cards
		}

		const newLists = Array.from(cardLists);
		newLists.splice(index, 1)
		newLists.splice(index, 0, newList)

		setCardLists(newLists)
	}

	const onDragStart = () => {
		if (!dragging) {
			setDragging(true)
			cardLists.map((list, i) => {
				document.getElementById('listTitle' + list.id.toString()).blur()
			})
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			<Droppable droppableId={'main'} direction="horizontal" type="list">
				{provided => (
					<tr
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{
							cardLists.map((list, i) =>
								<CardListContainer key={list.id}
									listTitle={list.text}
									cards={list.cards}
									index={i}
									id={list.id}
									setCards={(newcards) => updatecards(newcards, i)} />
							)
						}

						{provided.placeholder}
						<td>
							{showingAddAnother
								? <Button vertical-align={'baseline'} top='0' className='btn-add-another-list' variant='link' onClick={() => changeShowAddAnother(false)}>
									<font size='4'>＋</font>Add another list
				 			</Button>
								: <AddItem
									addItem={createList}
									buttonText='Add list'
									defaultText='Enter a title for this list'
									classType='list'
									changeShowAddAnother={changeShowAddAnother} />
							}
						</td>

					</tr>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default ListTable