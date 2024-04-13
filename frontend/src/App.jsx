import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch('http://127.0.0.1:5000/contacts')
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
      setCurrentContact({})
    }
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact);
    setIsModalOpen(true);
  }

  const onUpdated = () => {
    closeModal();
    fetchContacts();
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdated}/>
      <button onClick={openCreateModal}>Create Contact</button>
      {
        isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <ContactForm  existingContact={currentContact} updateCallback={onUpdated}/>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App
