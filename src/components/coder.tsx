
import {converter } from "@/shared/coder";
import {useEffect, useState} from "react";


 function CodeHighlight(prop: {text: string, eKey:string}) {
    const {text, eKey} = prop ||  ``

    const [code, setCode] = useState<any>();
    useEffect(()=> {
        return setCode(converter(text, eKey));
    }, [text])

    console.log('test --> ',text)
    return (<>
 
            <>{code} </>

    </>)
}

export default CodeHighlight;