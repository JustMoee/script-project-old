import { convertCodeToText } from "@/shared/coder";
import {useEffect, useState} from "react";


 function PostPage() {
    const text = ` var x = 10 ; \n
    var y = 11 ;
    let z = 11 ;
    let b = {{INPUT3}} ;
    var {{INPUT1}} = {{INPUT2}} ;`

    const [code, setCode] = useState<any>();
    useEffect(()=> {
        return setCode(convertCodeToText(text));
    }, [text])
    return (<>
        <section>
            <h1>hellloe</h1>   
            <>{code} </>
        </section> 
    
    </>)
}

export default PostPage;