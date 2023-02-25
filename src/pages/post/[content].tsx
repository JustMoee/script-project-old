import { useRouter } from 'next/router'


const ContentPage = () => {
    const router = useRouter();
    const { content } = router.query
    return (<>
        <h1>{content}</h1>
        
    </>)
}

export default ContentPage