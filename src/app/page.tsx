"use client"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom";
import { Book } from "./Types/booksType";
export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [editBookId, setEditBookId] = useState('')
  useEffect(() => {
    fetch('api/getAllBooksController')
      .then((res: any) => {
        if (res.ok) return res.json()
      })
      .then((data) => {
        setBooksData(data);
      })
  }, [updateData])


  function editBook(_id: any) {
    setEditBookId(_id);
    setShowModal(true);
  }
  function deleteBook(_id: string) {
    fetch('api/deleteBookController', { method: 'POST', body: JSON.stringify({ _id: _id }) })
      .then((res) => res.json())
      .then((data) => {
        setUpdateData(!updateData);
      })
  }
  return (
    <div className='flex flex-col justify-center p-10'>
      <div className="flex gap-8 justify-center border border-gray-400">
        <div className="p-2 w-1/5">Title</div>
        <div className="p-2 w-1/5">Author</div>
        <div className="p-2 w-1/5">Publisher</div>
        <div className="p-2 w-1/5">PublishDate</div>
        <div className="p-2 w-1/5">Actions</div>

      </div>
      {
        booksData && booksData.length > 0 && booksData.map((book: Book) => (
          <div key={book._id} className="flex gap-8 justify-center border border-gray-400">
            <div className="p-2 w-1/5">{book.Title}</div>
            <div className="p-2 w-1/5">{book.Author}</div>
            <div className="p-2 w-1/5">{book.Publisher}</div>
            <div className="p-2 w-1/5">{new Date(book.PublishDate).toLocaleDateString()}</div>
            <div className="flex gap-1 p-2 w-1/5">
              <button className="bg-blue-500 px-2 py-1 rounded-md text-white" onClick={() => editBook(book._id)}>Edit</button>
              <button className="bg-blue-500 px-2 py-1 rounded-md text-white" onClick={() => deleteBook(book._id)}>Delete</button>
            </div>
          </div>
        ))
      }
      <div className="flex justify-center p-2">
        <button className="bg-blue-500 px-2 py-1 rounded-md text-white" onClick={() => setShowModal(true)}>Add Book</button>
      </div>
      {showModal && <AddBookModal showmodal={showModal} booksData={booksData} editBookId={editBookId} setEditBookId={(val: any) => { setEditBookId(val)}} onClose={() => { setShowModal(false); setUpdateData(!updateData) }} />}
    </div>
  )
}

function AddBookModal(props: any) {
  const editBookObj = props.booksData.filter((item:any)=>item._id==props.editBookId)[0]
  const [bookObj, setBookObj] = useState<any>(editBookObj);
  function handleChange(e: any) {
    setBookObj({ ...bookObj, [e.target.name]: e.target.value })
  }
  function handleCancel() {
    setBookObj({ Title: '', Author: '', Publisher: '', PublishDate: '' });
    props.setEditBookId('');
    props.onClose();
  }
  function AddBook(e: any) {
    e.preventDefault()
    fetch('api/addBookController', { method: 'POST', body: JSON.stringify(bookObj) })
      .then((res) => res.json())
      .then((data) => {
        setBookObj({ Title: '', Author: '', Publisher: '', PublishDate: '' })
        props.setEditBookId('');
        props.onClose();
      })
  }
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-md min-w-[250px] p-4">
        <form onSubmit={AddBook}>
          <div className="flex flex-col p-4">
            <div className="text-center font-bold">Add Books Details</div>
            <div>Book Title:</div>
            <input name={'Title'} required type="text" className="border border-black" defaultValue={editBookObj?.Title} onChange={handleChange}></input>
            <div>Book Author:</div>
            <input name={'Author'} required type="text" className="border border-black" defaultValue={editBookObj?.Author} onChange={handleChange}></input>
            <div>Book Publisher:</div>
            <input name={'Publisher'} required type="text" className="border border-black" defaultValue={editBookObj?.Publisher} onChange={handleChange}></input>
            <div>Book Published Date:</div>
            <input name={'PublishDate'} required type="date" className="border border-black" defaultValue={editBookObj?.PublishDate ? new Date(editBookObj?.PublishDate).toISOString().slice(0, 10) : ''} onChange={handleChange}></input>
          </div>
          <div className="flex justify-center gap-2">
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded-md text-white">Update Book</button>
            <button type="button" className="bg-blue-500 px-2 py-1 rounded-md text-white" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>, document.querySelector('#modal') as any);
}