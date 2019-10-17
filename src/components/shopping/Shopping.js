import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';


const ShoppingBlock = styled.div`
  /* position: fixed; */
  /* display: flex; */
  display: block;
  width: 95%;
  /* height: 100%; */
  background-color: lightgray;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BookmarksZone = styled.div`
  float: left;
  width: 48%;
  height: auto;
  min-height: 15rem;
  margin-right: 0.3rem;
  background-color: whitesmoke;
`;
const ShoppingCartZone = styled.div`
  float: right;
  width: 48%;
  min-height: 15rem;
  margin-left: 0.3rem;
  background-color: whitesmoke;
`;

const CalculateBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
  height: 2.125rem;
  width: 30%;
  margin: 1rem 1rem 1rem 1rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const CalculatedResultBox = styled.textarea`
  margin: 1rem 1rem 1rem 1rem;
  clear: both;
  align-self: center;
  width: 95%;
  min-height: 15rem;
`;

const Item = styled.div`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #90C3E5;
  margin: 0.2rem;
`;

const DescHeader = styled.div`
  border-radius: 4px;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  margin: 0.2rem;
`;

class Shopping extends Component {

  state = {
    bookmarkedNotes: [
      { noteTitle: "bookmark item 1 title", noteId: "1", zone: "bookmarkedZone" },
      { noteTitle: "bookmark item 2 title", noteId: "2", zone: "bookmarkedZone" },
      { noteTitle: "shoppingCart item 3 title", noteId: "3", zone: "shoppingCartZone" }
    ]
  }

  onDragStart = (ev, noteId) => {
    console.log('onDragStart: ', noteId);
    // ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("noteId", noteId);
    return true;
  }

  onDragOver = ev => {
    ev.preventDefault();
    console.log('onDragOver: ');
  }

  onDrop = (ev, cat) => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log('onDrop: ');
    let noteId = ev.dataTransfer.getData("noteId");
    console.log('noteId: ', noteId);
    let nextBookmarkedNotes = this.state.bookmarkedNotes.filter((note) => {
      if (note.noteId === noteId) {
        note.zone = cat;
      }
      return note;
    });

    this.setState({
      ...this.state,
      nextBookmarkedNotes
    });
    return false;
  }

  render() {
    let notes = {
      bookmarkedZone: [],
      shoppingCartZone: []
    };

    this.state.bookmarkedNotes.forEach((note) => {
      notes[note.zone].push(
        <Item
          draggable={true}
          noteId={note.noteId}
          onDragStart={(e) => this.onDragStart(e, note.noteId)}>
          {note.noteTitle}
        </Item>
      );
    })

    return (
      <>
        <ShoppingBlock>
          <BookmarksZone>
            <DescHeader> bookmarked notes: drag to shopping cart </DescHeader>
            {notes.bookmarkedZone}
          </BookmarksZone>
          <ShoppingCartZone
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, "shoppingCartZone")} >
            <DescHeader> shopping cart: drop here </DescHeader>
            {notes.shoppingCartZone}
          </ShoppingCartZone>
        </ShoppingBlock>
        <CalculateBlock>
          <CalculatedResultBox />
          <StyledButton>
            Calculate
          </StyledButton>
        </CalculateBlock>
      </>
    );
  }
}

export default Shopping;
