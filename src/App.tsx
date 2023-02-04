// 컴포넌트 정의하는 프로그램으로 실제로 화면에 표시되는 내용은 여기서 정의된다.
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { createGlobalStyle } from "styled-components";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { darktheme } from "./theme";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box; 
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color: inherit;
}
`;
const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;
const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    backgroud-color: ${(props) => props.theme.cardColor};
`;

function App() {
    const onDragEnd = () => {};
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board
                                ref={magic.innerRef}
                                {...magic.droppableProps}>
                                <Draggable draggableId="first" index={0}>
                                    {(magic) => (
                                        <Card
                                            ref={magic.innerRef}
                                            {...magic.draggableProps}>
                                            <span {...magic.dragHandleProps}>
                                                ❤️‍🔥
                                            </span>
                                            One
                                        </Card>
                                    )}
                                </Draggable>
                                <Draggable draggableId="second" index={1}>
                                    {(magic) => (
                                        <Card
                                            ref={magic.innerRef}
                                            {...magic.draggableProps}>
                                            <span {...magic.dragHandleProps}>
                                                ❤️‍🔥
                                            </span>
                                            Two
                                        </Card>
                                    )}
                                </Draggable>
                            </Board>
                        )}
                    </Droppable>
                </Wrapper>
                {/* <GlobalStyle />
                <TodoList /> */}
            </DragDropContext>
        </>
    );
}

export default App;
