import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

const Card = styled.div<{isDragging : boolean}>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
    box-shadow: ${(props) => props.isDragging ? "0px 2px 15px rgba(0, 0, 0, 0.05)" : "none"};
`;

function DraggableCard({toDo, index}: IDraggableCardProps) {
    // console.log(toDo, "has been rendered");
    return (
    <Draggable draggableId={toDo} index={index}>
        {(magic, snapshot) => (
            <Card
            isDragging = {snapshot.isDragging}
                ref={magic.innerRef}
                {...magic.draggableProps}
                {...magic.dragHandleProps}>
                {toDo}
            </Card>
        )}
    </Draggable>
    );
}

export default React.memo(DraggableCard) //props이 변하지 않으면 DraggableCard를 렌더하지 마세요