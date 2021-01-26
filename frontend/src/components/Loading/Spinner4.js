import React, {useEffect, useState} from "react";
import '../../index.css';


function Spinner4(props)  {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, props.delay);
    }, [props.delay]);

    return visible ?<div className="spinner-border text-primary loading" role="status">
                        <span className="sr-only">Loading...</span>
                    </div > : <div className='text-muted text-monospace text-capitalize loading'>There is no data yet</div>;
    };

export default Spinner4;
