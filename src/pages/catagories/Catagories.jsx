
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interseptor/axiosInstance';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import dayjs from 'dayjs';
import { FaTrash } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import { types } from '../../data/data';

const Categories = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState(""); 
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      type: 1
    }
  });

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get('dashboard/categories/index');
      setData(response.data.categories);
      setFilteredData(response.data.categories);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    await axiosInstance.delete(`dashboard/categories/delete/${id}`);
    getCategories();
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  const addCategories = async (values) => {
    await axiosInstance.post(`dashboard/categories/store`, values);
    toggleModal();
    getCategories();
    reset({
      name: "",
      type: null
    });
  };

  return (
    <div className="container mt-5">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>
          Add Categories
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(addCategories)} id='form'>
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
            <div>
              <label htmlFor="type">Type</label>
              <Controller
                name='type'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <select className='form-control' id='type' name='type' value={value} onChange={onChange}>
                    {types.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={toggleModal}>Close</button>
          <button className="btn btn-primary" type="submit" form='form'>Save</button>
        </ModalFooter>
      </Modal>
      <h2>Categories</h2>
      <ToastContainer />

      <div className="mb-4">
        <label htmlFor="filter">Filter</label>
        <Input
          id="filter"
          type="text"
          placeholder="filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Table striped>
        <button className='btn btn-success mb-4 mt-4' onClick={toggleModal}>Add</button>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Type</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.type === 1 ? "main" : "ChatGpt"}</td>
              <td>{item.image && <img src={item.image} width={50} height={50} alt={item.name} />}</td>
              <td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteCategory(item.id)}>
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

export default Categories;








