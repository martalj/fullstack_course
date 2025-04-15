const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if (blogs.length === 1){
        return blogs[0].likes
    }
    else {
        const likeSum = blogs.reduce((n,{likes}) => n+likes, 0)
        return likeSum
    }

}

const favouriteBlog = (blogs) => {
    if (blogs.length === 1){
        return blogs[0]
    }
    if (blogs.length === 0){
        return 0
    }
    else {
        const highestLikes = blogs.reduce((n, {likes}) => Math.max(n,likes), 0)
        const idHighestLikes = blogs.find(blog => blog.likes == highestLikes)
        if (idHighestLikes.length > 1) {
            return idHighestLikes[0]
        }
        return (idHighestLikes)
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return 0
    }

    if (blogs.length === 1){
        return (
            "author: " + blogs[0].author + "\n" + "blogs: " + 1
        )
    }

    else {
        const authors = _.countBy(blogs, 'author')
        const maxBlogs = _.max(_.values(authors))
        const maxAuthor = _.pickBy(authors, o => o == maxBlogs)
        return (
            "author: " + Object.keys(maxAuthor)[0] + "\n" + "blogs: " + authors[Object.keys(maxAuthor)[0]]
        )
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    if (blogs.length === 1){
        return (
            "author: " + blogs[0].author + "\n" + "likes: " + blogs[0].likes
        )
    }

    else {
        const authors = _(blogs)
        .groupBy('author')
        .map((author, name) => ({
            author: name,
            likes: _.sumBy(author, 'likes')
        })).value()
        const maxAuthor = _.pickBy(authors, o => o == _.maxBy(authors, 'likes'))
        console.log(Object.values(maxAuthor)[0])
        return (
            Object.values(maxAuthor)[0]
        )
    }

}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
  }