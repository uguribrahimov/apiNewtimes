
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interseptor/axiosInstance';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import dayjs from 'dayjs';
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';

const Roles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState(''); 
  const { control, handleSubmit, reset } = useForm();

  const getRoles = async () => {
    try {
      const response = await axiosInstance.get('permission/roles');
      setData(response.data.roles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const addRoles = async (values) => {
    await axiosInstance.post(`permission/storeUpdate`, values);
    toggleModal();
    getRoles();
    reset({
      name: ""
    });
  };

  const deleteRoles = async (id) => {
    await axiosInstance.delete(`permission/role/delete/${id}`);
    getRoles();
  };

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          Add Roles
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={handleSubmit(addRoles)} id='form'>
            <div>
              <label htmlFor="name">Name</label>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <Input
                    id='name'
                    value={value}
                    onChange={onChange}
                  />
                )}
                name='name'
                control={control}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => { toggleModal() }}>Close</button>
          <button className="btn btn-primary" form='form'>Save</button>
        </ModalFooter>
      </Modal>
      <h2>Roles</h2>
      <ToastContainer />

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Table striped>
        <button className='btn btn-success mb-4 mt-4' onClick={toggleModal}>Add</button>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-danger' onClick={() => {
                  deleteRoles(item.id)
                }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Roles;
