import {Carousel} from "react-bootstrap";
import {useState} from "react";
import '../../index.css'

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} wrap={true} >
            <Carousel.Item style={{height: '600px'}}>
                <img
                    className="d-block w-100"
                    width={'auto'}
                    src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="First slide"
                />
                <Carousel.Caption bsPrefix={'carousel-caption'}>
                    <h1>School</h1>
                    <p>This is a new year. A new beginning. And things will change.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '600px'}}>
                <img
                    className="d-block w-100"
                    width={'auto'}
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1404&q=80"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h1>Class</h1>
                    <p>Self-praise is for losers. Be a winner. Stand for something. Always have class, and be humble.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '600px'}}>
                <img
                    className="d-block w-100"
                    width={'auto'}
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h1>Dreams</h1>
                    <p>
                        You are never too old to set another goal or to dream a new dream.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

