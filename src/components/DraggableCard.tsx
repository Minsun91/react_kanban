import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({toDo, index}: IDraggableCardProps) {
    console.log(toDo, "has been rendered");
    return (
    <Draggable draggableId={toDo} index={index}>
        {(magic) => (
            <Card
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