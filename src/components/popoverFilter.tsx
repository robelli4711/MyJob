import { useState } from "react";
import { Popover, ListGroup, Button, Container, Col } from "react-bootstrap";
import { statusEntries } from "../data/Status";
import '../styles/popoverJobDetail.css';

export const PopoverFilter = () => {

    const [show, setShow] = useState(true);

    const handleItemClick = (e: any) => {
        localStorage.setItem('filter', e);
    }

    return (
        <Popover id="popover-basic" show={show} onClick={() => setShow(false)} >
            <Popover.Header>
                Apply Status Filter
            </Popover.Header>
            <Popover.Body>
                <ListGroup defaultActiveKey="#link1" style={{minWidth: '15rem'}}>
                    {statusEntries.map((entry: any, index: any) => (
                        <ListGroup.Item id={entry.item} href={index.toString()} onClick={(e: any) => handleItemClick(e.target.id)}>
                            {entry.item}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <br />
            </Popover.Body>
        </Popover >
    )
};
