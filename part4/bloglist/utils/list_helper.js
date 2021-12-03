const dummy = (blogs) => {
    return 1
}
 
const totalLikes = (blogs) =>{
    return blogs.reduce((sum , blogs )=>{
        return sum + blogs.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, curr) => {
      return prev.likes > curr.likes ? prev : curr;
    }, 0);
  };

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}