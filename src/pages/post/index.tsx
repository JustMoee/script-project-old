const data =  fetch('/api/post',{
    headers: {},
    method: 'POST',
    body: null
});
    console.log('data test ==>', data)

 function PostPage() {

    return (<>
        <section>
            <h1>hellloe</h1>    
        </section> 
    
    </>)
}

export default PostPage;