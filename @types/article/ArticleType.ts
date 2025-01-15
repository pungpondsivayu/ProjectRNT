export interface IArticleCategory{
    id : number,
    name : string,
    isUsed : boolean
}

export interface IArticle{
    id : number,
    name : string,
    description : string,
    iamge : string,
    isUsed : boolean,
    category: number,
    categoryName: string,
}
