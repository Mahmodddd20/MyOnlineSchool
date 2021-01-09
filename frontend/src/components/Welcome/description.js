import {Button, Card} from "react-bootstrap";

export default function Description() {
    return (
<Card style={{ width: 'auto' }}>
    <Card.Img variant="top" style={{height:'200px'}} src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
    </Card.Body>
</Card>
    )
}
