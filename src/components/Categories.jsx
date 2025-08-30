import { useEffect, useState } from 'react';
import authService from '../services/authService';
import categoryService from '../services/categoryService';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryUrlHandle, setNewCategoryUrlHandle] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryUrlHandle, setEditCategoryUrlHandle] = useState('');
    const [error, setError] = useState(null);
    const user = authService.getCurrentUser();
    const roles = user?.roles || [];
   

    const fetchCategories = () => {
        categoryService.getCategories().then(response => {
            setCategories(response.data);
        })
            .catch(err => {
                setError('Error fetching categories');
                console.error(err);
            });
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    //Create new category
    const handleCreate = (e) => {
        e.preventDefault();
        categoryService.createCategories(newCategoryName, newCategoryUrlHandle)
            .then((res) => {
                if (res.status === 201|| res.status === 200) {
                    setNewCategoryName('');
                    setNewCategoryUrlHandle('');
                    fetchCategories();
                }
            }).catch(err => { setError('Error creating category'); console.error(err); });
    };
    // Delete a category
    const handleDelete = (id) => {
        categoryService.deleteCategory(id)
            .then(() => {
                fetchCategories(); // Refresh the list
            })
            .catch(err => { setError('Error creating category'); console.error(err); });
    };

    // Update a category
    const handleUpdate = (e) => {
        e.preventDefault();
        categoryService.updateCategory(editCategoryId, editCategoryName, editCategoryUrlHandle)
            .then(() => {
                setEditCategoryId(null); // Exit editing mode
                setEditCategoryName('');
                setEditCategoryUrlHandle('');
                fetchCategories(); // Refresh the list
            })
            .catch(err => { setError('Error creating category'); console.error(err); });
    };
    return (
        

        <div>
            <h2>Categories</h2>
            {error && <div className="error">{error}</div>}
            {/* Create form */}
            {roles.includes("Writer") && (
                <form onSubmit={handleCreate} className="row g-2 mb-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="New Category URL Handle"
              value={newCategoryUrlHandle}
              onChange={(e) => setNewCategoryUrlHandle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              Add Category
            </button>
          </div>
        </form>
            ) }
            <br />
            {/* List of categories */}
            <div className="container mt-3">
      <h3 className="mb-3">Category Management</h3>
      <table className="table table-striped table-bordered table-hover align-middle shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "35%" }}>Name</th>
            <th style={{ width: "35%" }}>URL Handle</th>
            <th style={{ width: "30%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              {editCategoryId === category.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editCategoryUrlHandle}
                      onChange={(e) => setEditCategoryUrlHandle(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <form onSubmit={handleUpdate} className="d-flex gap-2">
                      <button type="submit" className="btn btn-success btn-sm">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditCategoryId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  </td>
                </>
              ) : (
                <>
                  <td>{category.name}</td>
                  <td>{category.urlHandle}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          setEditCategoryId(category.id);
                          setEditCategoryName(category.name);
                          setEditCategoryUrlHandle(category.urlHandle);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default Categories;