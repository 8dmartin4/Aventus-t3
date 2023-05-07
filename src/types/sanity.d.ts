export interface Post {
    body: Body[]
    _id: string
    title: string
    publishedAt: string
    categories: Category[]
    author: Author
}

export interface Body {
    style?: string
    _key: string
    markDefs?: any[]
    children?: Children[]
    _type: string
    listItem?: string
    level?: number
    asset?: Asset
}

export interface Children {
    marks: string[]
    text: string
    _key: string
    _type: string
}

export interface Asset {
    _ref: string
    _type: string
}

export interface Category {
    _rev: string
    _type: string
    _id: string
    title: string
    _updatedAt: string
    _createdAt: string
}

export interface Author {
    _rev: string
    _type: string
    name: string
    bio: Bio[]
    _id: string
    _updatedAt: string
    slug: Slug
    _createdAt: string
}


export interface Bio {
    markDefs: string[]
    children: BioChildren[]
    _type: string
    style: string
    _key: string 
}

export interface BioChildren {
    marks: string[]
    text: string
    _key: string
    _type: string
}
  
export interface Slug {
    current: string
    _type: string
}
