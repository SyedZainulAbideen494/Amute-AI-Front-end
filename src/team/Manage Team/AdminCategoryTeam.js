import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../app-modules/api_routes';
import { useParams } from 'react-router-dom';

function AdminCategoryTeam({ teamId }) {
  const [categoryName, setCategoryName] = useState('');
  const params = useParams()
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const TeamId = params.id
  console.log(params.id)

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(API_ROUTES.addTeamCategory, {
        TeamId,
        categoryName
      });
      console.log(response.data);
      // Handle success - e.g., show a success message, update UI, etc.
    } catch (error) {
      console.error('Error adding category to team:', error);
      // Handle error - e.g., show an error message, etc.
    }
  };

  return (
    <div className='main_div_contaioner_add_team_catgry'>
      <h2>Add Category to Team</h2>
      <label>
        Category Name:
        <input type="text" value={categoryName} onChange={handleCategoryNameChange} />
      </label>
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}

export default AdminCategoryTeam;