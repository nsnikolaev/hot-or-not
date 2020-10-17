// API requests mocking

const images = [
  'http://localhost:4000/image/000.jpg',
  'http://localhost:4000/image/001.jpg',
  'http://localhost:4000/image/002.jpg',
  'http://localhost:4000/image/003.jpg',
  'http://localhost:4000/image/004.jpg',
  'http://localhost:4000/image/005.jpg',
  'http://localhost:4000/image/006.jpg',
  'http://localhost:4000/image/007.jpg',
  'http://localhost:4000/image/008.jpg',
  'http://localhost:4000/image/009.jpg',
]

const imageList = async (index, length) => {
  const list = [...images].slice(index, index + length)
  return list
}

export default {
  imageList,
}
