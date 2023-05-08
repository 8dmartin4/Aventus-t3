import {createClient} from '@sanity/client'

export const sanityClient = createClient({
    projectId: '0my1v31a',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-11-11',
    token: process.env.SANITY_API_TOKEN || ""
})

export async function getPosts() {
    const posts = await sanityClient.fetch(`*[_type == "post"]{
        _id, title, publishedAt, categories[]->, author->, body, slug}`)

    return posts
}

export async function getOnePost(slug: string){
    const post = await sanityClient.fetch(`*[_type == "post"][slug.current == "${slug}"]`)

    return post
}


export default sanityClient