
import {converter } from "@/shared/coder";
import {useEffect, useState} from "react";


 function CodeHighlight(prop: {text: string}) {
    const {text} = prop ||  ``

    const [code, setCode] = useState<any>();
    useEffect(()=> {
        return setCode(converter(text));
    }, [text])

    console.log('test --> ',text)
    return (<>
 
            <>{code} </>

    </>)
}

export default CodeHighlight;